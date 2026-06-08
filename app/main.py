from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware

from sqlalchemy.orm import Session

from app.database import engine, SessionLocal

from app.models import (
    Technology,
    Vote,
    TimelineEvent,
    AIEvaluation,
    CommunitySignal,
    Application,
    Event,
    VoteRequest,
    TechnologyRequest,
    CommunitySignalRequest,
    ApplicationRequest,
    EventRequest,
    Base.
    TechnologyEvidence
)

from app.crud import (
    create_technology,
    create_vote,
    create_ai_evaluation
)

from app.ai_service import evaluate_technology


# =========================
# DATABASE INIT
# =========================

Base.metadata.create_all(bind=engine)


# =========================
# APP SETUP
# =========================

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================
# DB SESSION
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
        "message":
            "Calgary Compass API Running"
    }


# =========================
# CREATE TECHNOLOGY
# =========================

@app.post("/technology")
def create_new_technology(
    data: TechnologyRequest,
    db: Session = Depends(get_db)
):

    return create_technology(
        db,
        name=data.name,
        description=data.description,
        current_status=data.current_status
    )


# =========================
# GET TECHNOLOGIES
# =========================

@app.get("/technologies")
def get_technologies(
    db: Session = Depends(get_db)
):

    return db.query(
        Technology
    ).all()


# =========================
# AI EVALUATION
# =========================

@app.post("/technology/{technology_id}/ai-evaluate")
def ai_evaluate_technology(
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
            "error":
                "Technology not found"
        }

    # =========================
    # RUN AI ENGINE
    # =========================

    ai_result = evaluate_technology(
        technology.name,
        technology.description
    )

    # =========================
    # SAVE TO DATABASE
    # =========================

    evaluation = create_ai_evaluation(

        db,

        technology_id=technology.id,

        financial_sustainability=
            ai_result["financial_sustainability"],

        operational_excellence=
            ai_result["operational_excellence"],

        people_culture=
            ai_result["people_culture"],

        trusted_governance=
            ai_result["trusted_governance"],

        innovation_agility=
            ai_result["innovation_agility"],

        summary=
            ai_result.get("summary", ""),

        technology_summary=
            ai_result.get("technology_summary", ""),

        calgary_problem=
            ai_result.get("calgary_problem", ""),

        global_examples=
            ai_result.get("global_examples", ""),

        implementation_statistics=
            ai_result.get(
                "implementation_statistics",
                ""
            ),

        governance_recommendation=
            ai_result.get(
                "governance_recommendation",
                ""
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

    return create_vote(

        db,

        technology_id=
            data.technology_id,

        stakeholder=
            data.stakeholder,

        financial_sustainability=
            data.financial_sustainability,

        operational_excellence=
            data.operational_excellence,

        people_culture=
            data.people_culture,

        trusted_governance=
            data.trusted_governance,

        innovation_agility=
            data.innovation_agility
    )


# =========================
# GET ALL VOTES
# =========================

@app.get("/votes")
def get_votes(
    db: Session = Depends(get_db)
):

    votes = db.query(
        Vote
    ).all()

    results = []

    for vote in votes:

        technology = db.query(
            Technology
        ).filter(
            Technology.id == vote.technology_id
        ).first()

        results.append({

            "id":
                vote.id,

            "technology_id":
                vote.technology_id,

            "technology_name":
                technology.name
                if technology
                else "Unknown",

            "stakeholder":
                vote.stakeholder,

            "financial_sustainability":
                vote.financial_sustainability,

            "operational_excellence":
                vote.operational_excellence,

            "people_culture":
                vote.people_culture,

            "trusted_governance":
                vote.trusted_governance,

            "innovation_agility":
                vote.innovation_agility

        })

    return results


# =========================
# WEIGHTED SCORES
# =========================

@app.get("/technology/{technology_id}/weighted-scores")
def weighted_scores(
    technology_id: int,
    db: Session = Depends(get_db)
):

    ai_eval = db.query(
        AIEvaluation
    ).filter(
        AIEvaluation.technology_id == technology_id
    ).first()

    votes = db.query(
        Vote
    ).filter(
        Vote.technology_id == technology_id
    ).all()

    if not ai_eval or not votes:

        return {
            "error":
                "Missing data"
        }

    financial_avg = (
        sum(
            v.financial_sustainability
            for v in votes
        ) / len(votes)
    )

    operational_avg = (
        sum(
            v.operational_excellence
            for v in votes
        ) / len(votes)
    )

    people_avg = (
        sum(
            v.people_culture
            for v in votes
        ) / len(votes)
    )

    governance_avg = (
        sum(
            v.trusted_governance
            for v in votes
        ) / len(votes)
    )

    innovation_avg = (
        sum(
            v.innovation_agility
            for v in votes
        ) / len(votes)
    )

    return {

        "financial_sustainability":
            round(
                (
                    financial_avg * 0.5
                ) + (
                    ai_eval.financial_sustainability * 0.5
                ),
                2
            ),

        "operational_excellence":
            round(
                (
                    operational_avg * 0.5
                ) + (
                    ai_eval.operational_excellence * 0.5
                ),
                2
            ),

        "people_culture":
            round(
                (
                    people_avg * 0.5
                ) + (
                    ai_eval.people_culture * 0.5
                ),
                2
            ),

        "trusted_governance":
            round(
                (
                    governance_avg * 0.5
                ) + (
                    ai_eval.trusted_governance * 0.5
                ),
                2
            ),

        "innovation_agility":
            round(
                (
                    innovation_avg * 0.5
                ) + (
                    ai_eval.innovation_agility * 0.5
                ),
                2
            ),
    }


# =========================
# COMPARISON
# =========================

@app.get("/technology/{technology_id}/comparison")
def comparison(
    technology_id: int,
    db: Session = Depends(get_db)
):

    ai_eval = db.query(
        AIEvaluation
    ).filter(
        AIEvaluation.technology_id == technology_id
    ).first()

    votes = db.query(
        Vote
    ).filter(
        Vote.technology_id == technology_id
    ).all()

    if not ai_eval or not votes:

        return {
            "error":
                "Missing data"
        }

    human = {

        "financial_sustainability":
            sum(
                v.financial_sustainability
                for v in votes
            ) / len(votes),

        "operational_excellence":
            sum(
                v.operational_excellence
                for v in votes
            ) / len(votes),

        "people_culture":
            sum(
                v.people_culture
                for v in votes
            ) / len(votes),

        "trusted_governance":
            sum(
                v.trusted_governance
                for v in votes
            ) / len(votes),

        "innovation_agility":
            sum(
                v.innovation_agility
                for v in votes
            ) / len(votes),
    }

    ai = {

        "financial_sustainability":
            ai_eval.financial_sustainability,

        "operational_excellence":
            ai_eval.operational_excellence,

        "people_culture":
            ai_eval.people_culture,

        "trusted_governance":
            ai_eval.trusted_governance,

        "innovation_agility":
            ai_eval.innovation_agility,
    }

    return {
        "human": human,
        "ai": ai
    }


# =========================
# GET AI EVALUATION
# =========================

@app.get("/technology/{technology_id}/ai-evaluation")
def get_ai_evaluation(
    technology_id: int,
    db: Session = Depends(get_db)
):

    evaluation = db.query(
        AIEvaluation
    ).filter(
        AIEvaluation.technology_id == technology_id
    ).first()

    if not evaluation:

        return {
            "error":
                "No AI evaluation found"
        }

    return evaluation


# =========================
# GET SINGLE TECHNOLOGY
# =========================

@app.get("/technology/{technology_id}")
def get_technology(
    technology_id: int,
    db: Session = Depends(get_db)
):

    tech = db.query(
        Technology
    ).filter(
        Technology.id == technology_id
    ).first()

    if not tech:

        return {
            "error":
                "Technology not found"
        }

    return tech


# =========================
# DELETE TECHNOLOGY
# =========================

@app.delete("/technology/{technology_id}")
def delete_technology(
    technology_id: int,
    db: Session = Depends(get_db)
):

    tech = db.query(
        Technology
    ).filter(
        Technology.id == technology_id
    ).first()

    if not tech:

        return {
            "error":
                "Technology not found"
        }

    db.delete(tech)

    db.commit()

    return {
        "message":
            "Deleted"
    }


# =========================
# UPDATE TECHNOLOGY
# =========================

@app.put("/technology/{technology_id}")
def update_technology(

    technology_id: int,

    data: TechnologyRequest,

    db: Session = Depends(get_db)

):

    tech = db.query(
        Technology
    ).filter(
        Technology.id == technology_id
    ).first()

    if not tech:

        return {
            "error":
                "Technology not found"
        }

    tech.name = data.name
    tech.description = data.description
    tech.current_status = data.current_status

    db.commit()

    db.refresh(tech)

    return tech


# =========================
# COMMUNITY SIGNALS
# =========================

@app.post("/community-signal")
def submit_signal(
    data: CommunitySignalRequest,
    db: Session = Depends(get_db)
):

    signal = CommunitySignal(

        stakeholder=
            data.stakeholder,

        signal_text=
            data.signal_text
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


# =========================
# APPLICATIONS
# =========================

@app.post("/application")
def submit_application(
    data: ApplicationRequest,
    db: Session = Depends(get_db)
):

    app_obj = Application(
        **data.dict()
    )

    db.add(app_obj)

    db.commit()

    db.refresh(app_obj)

    return app_obj


@app.get("/applications")
def get_applications(
    db: Session = Depends(get_db)
):

    return db.query(
        Application
    ).all()


# =========================
# EVENTS
# =========================

@app.post("/event")
def create_event(
    data: EventRequest,
    db: Session = Depends(get_db)
):

    event = Event(
        title=data.title,
        date=data.date,
        location=data.location,
        description=data.description,
        link=data.link
    )

    db.add(event)

    db.commit()

    db.refresh(event)

    return event


@app.get("/events")
def get_events(
    db: Session = Depends(get_db)
):

    return db.query(
        Event
    ).all()


@app.put("/event/{event_id}")
def update_event(
    event_id: int,
    data: EventRequest,
    db: Session = Depends(get_db)
):

    event = db.query(
        Event
    ).filter(
        Event.id == event_id
    ).first()

    if not event:

        return {
            "error":
                "Event not found"
        }

    event.title = data.title
    event.date = data.date
    event.location = data.location
    event.description = data.description
    event.link = data.link

    db.commit()

    db.refresh(event)

    return event


@app.delete("/event/{event_id}")
def delete_event(
    event_id: int,
    db: Session = Depends(get_db)
):

    event = db.query(
        Event
    ).filter(
        Event.id == event_id
    ).first()

    if not event:

        return {
            "error":
                "Event not found"
        }

    db.delete(event)

    db.commit()

    return {
        "message":
            "Event deleted"
    }

@app.post("/sources/")
def add_source(
    source: SourceCreate,
    db: Session = Depends(get_db)
):
    return create_source(
        db,
        source.dict()
    )

@app.get(
    "/technology/{technology_id}/evidence"
)
def get_evidence(
    technology_id: int,
    db: Session = Depends(get_db)
):

    evidence = db.query(
        TechnologyEvidence
    ).filter(
        TechnologyEvidence.technology_id
        == technology_id
    ).first()

    if not evidence:

        return {
            "paper_count": 0,
            "citation_count": 0,
            "patent_count": 0,
            "funding_count": 0
        }

    return evidence
