from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware

from sqlalchemy.orm import Session

from app.database import (
    engine,
    SessionLocal
)

from app.models import (
    Technology,
    Vote,
    TimelineEvent,
    AIEvaluation,
    CommunitySignal,
    VoteRequest,
    TechnologyRequest,
    CommunitySignalRequest,
    Base
)

from app.crud import (
    create_technology,
    create_vote, 
    create_ai_evaluation
)

# =========================
# DATABASE SETUP
# =========================

Base.metadata.create_all(bind=engine)

# =========================
# FASTAPI SETUP
# =========================

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================
# DATABASE SESSION
# =========================

def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()

# =========================
# ROOT
# =========================

@app.get("/")
def root():

    return {
        "message": "Calgary Compass API Running"
    }

# =========================
# CREATE TECHNOLOGY
# =========================

@app.post("/technology")
def create_new_technology(
    data: TechnologyRequest,
    db: Session = Depends(get_db)
):

    technology = create_technology(
        db,
        name=data.name,
        description=data.description,
        current_status=data.current_status
    )

    return technology

# =========================
# GET TECHNOLOGIES
# =========================

@app.get("/technologies")
def get_technologies(
    db: Session = Depends(get_db)
):

    return db.query(Technology).all()

from app.ai_service import evaluate_technology

@app.post("/technology/{technology_id}/ai-evaluate")
def ai_evaluate_technology(
    technology_id: int,
    db: Session = Depends(get_db)
):

    technology = db.query(Technology).filter(
        Technology.id == technology_id
    ).first()

    if not technology:

        return {
            "error": "Technology not found"
        }

    ai_result = evaluate_technology(
        technology.name,
        technology.description
    )

    evaluation = create_ai_evaluation(

        db,

        technology_id=technology.id,

        financial_sustainability=ai_result["financial_sustainability"],

        operational_excellence=ai_result["operational_excellence"],

        people_culture=ai_result["people_culture"],

        trusted_governance=ai_result["trusted_governance"],

        innovation_agility=ai_result["innovation_agility"],

        summary=ai_result.get(
            "summary",
            "AI evaluation completed."
        )
    )

    return evaluation

# =========================
# CREATE VOTE
# =========================

@app.post("/vote")
def submit_vote(
    data: VoteRequest,
    db: Session = Depends(get_db)
):

    vote = create_vote(
        db,
        technology_id=data.technology_id,
        stakeholder=data.stakeholder,
        financial_sustainability=data.financial_sustainability,
        operational_excellence=data.operational_excellence,
        people_culture=data.people_culture,
        trusted_governance=data.trusted_governance,
        innovation_agility=data.innovation_agility
    )

    return vote

@app.get("/technology/{technology_id}/weighted-scores")
def weighted_scores(
    technology_id: int,
    db: Session = Depends(get_db)
):

    # =========================
    # GET AI EVALUATION
    # =========================

    ai_eval = db.query(AIEvaluation).filter(
        AIEvaluation.technology_id == technology_id
    ).first()

    if not ai_eval:

        return {
            "error": "No AI evaluation found"
        }

    # =========================
    # GET HUMAN VOTES
    # =========================

    votes = db.query(Vote).filter(
        Vote.technology_id == technology_id
    ).all()

    if not votes:

        return {
            "error": "No votes found"
        }

    # =========================
    # CALCULATE HUMAN AVERAGES
    # =========================

    financial_avg = sum(
        v.financial_sustainability
        for v in votes
    ) / len(votes)

    operational_avg = sum(
        v.operational_excellence
        for v in votes
    ) / len(votes)

    people_avg = sum(
        v.people_culture
        for v in votes
    ) / len(votes)

    governance_avg = sum(
        v.trusted_governance
        for v in votes
    ) / len(votes)

    innovation_avg = sum(
        v.innovation_agility
        for v in votes
    ) / len(votes)

    # =========================
    # WEIGHTED SCORES
    # =========================
    # 50% Human
    # 50% AI
    # =========================

    return {

        "financial_sustainability": round(
            (financial_avg * 0.5) +
            (ai_eval.financial_sustainability * 0.5),
            2
        ),

        "operational_excellence": round(
            (operational_avg * 0.5) +
            (ai_eval.operational_excellence * 0.5),
            2
        ),

        "people_culture": round(
            (people_avg * 0.5) +
            (ai_eval.people_culture * 0.5),
            2
        ),

        "trusted_governance": round(
            (governance_avg * 0.5) +
            (ai_eval.trusted_governance * 0.5),
            2
        ),

        "innovation_agility": round(
            (innovation_avg * 0.5) +
            (ai_eval.innovation_agility * 0.5),
            2
        )
    }

@app.get("/technology/{technology_id}/comparison")
def technology_comparison(
    technology_id: int,
    db: Session = Depends(get_db)
):

    # =========================
    # AI EVALUATION
    # =========================

    ai_eval = db.query(AIEvaluation).filter(
        AIEvaluation.technology_id == technology_id
    ).first()

    if not ai_eval:

        return {
            "error": "No AI evaluation found"
        }

    # =========================
    # HUMAN VOTES
    # =========================

    votes = db.query(Vote).filter(
        Vote.technology_id == technology_id
    ).all()

    if not votes:

        return {
            "error": "No votes found"
        }

    # =========================
    # HUMAN AVERAGES
    # =========================

    human_scores = {

        "financial_sustainability":
            sum(v.financial_sustainability for v in votes)
            / len(votes),

        "operational_excellence":
            sum(v.operational_excellence for v in votes)
            / len(votes),

        "people_culture":
            sum(v.people_culture for v in votes)
            / len(votes),

        "trusted_governance":
            sum(v.trusted_governance for v in votes)
            / len(votes),

        "innovation_agility":
            sum(v.innovation_agility for v in votes)
            / len(votes)
    }

    # =========================
    # AI SCORES
    # =========================

    ai_scores = {

        "financial_sustainability":
            ai_eval.financial_sustainability,

        "operational_excellence":
            ai_eval.operational_excellence,

        "people_culture":
            ai_eval.people_culture,

        "trusted_governance":
            ai_eval.trusted_governance,

        "innovation_agility":
            ai_eval.innovation_agility
    }

    return {

        "human": human_scores,

        "ai": ai_scores
    }

@app.delete("/technology/{technology_id}")
def delete_technology(
    technology_id: int,
    db: Session = Depends(get_db)
):

    technology = db.query(Technology).filter(
        Technology.id == technology_id
    ).first()

    if not technology:

        return {
            "error": "Technology not found"
        }

    db.delete(technology)

    db.commit()

    return {
        "message": "Technology deleted"
    }

@app.put("/technology/{technology_id}")
def update_technology(
    technology_id: int,
    technology_data: TechnologyRequest,
    db: Session = Depends(get_db)
):

    technology = db.query(
        Technology
    ).filter(
        Technology.id == technology_id
    ).first()

    if not technology:

        return {
            "error": "Technology not found"
        }

    technology.name = (
        technology_data.name
    )

    technology.description = (
        technology_data.description
    )

    technology.current_status = (
        technology_data.current_status
    )

    db.commit()

    db.refresh(technology)

    return technology

@app.get("/technology/{technology_id}")
def get_technology(
    technology_id: int,
    db: Session = Depends(get_db)
):

    technology = db.query(
        Technology
    ).filter(
        Technology.id == technology_id
    ).first()

    if not technology:
        return {
            "error": "Technology not found"
        }

    return technology

@app.get("/technology/{technology_id}/ai-evaluation")
def get_ai_evaluation(
    technology_id: int,
    db: Session = Depends(get_db)
):

    evaluation = db.query(
        AIEvaluation
    ).filter(
        AIEvaluation.technology_id
        == technology_id
    ).first()

    if not evaluation:

        return {
            "error":
            "No AI evaluation found"
        }

    return evaluation

@app.post("/community-signal")
def submit_signal(
    data: CommunitySignalRequest,
    db: Session = Depends(get_db)
):

    signal = CommunitySignal(
        stakeholder=data.stakeholder,
        signal_text=data.signal_text
    )

    db.add(signal)

    db.commit()

    db.refresh(signal)

    return signal

@app.get("/community-signals")
def get_signals(
    db: Session = Depends(get_db)
):

    return db.query(
        CommunitySignal
    ).all()
