from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import func
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
    Base,
    TechnologyEvidence,
    Source, 
    SourceCreate, 
    TechnologyCandidate, 
    CalgaryChallengeVote,
    CalgaryChallengeVoteRequest,
    TechnologyApplication,
    TechnologyApplicationRequest,
)

from app.crud import (
    create_technology,
    create_vote,
    create_ai_evaluation
)

from app.ai_service import evaluate_technology
from app.services.openalex import search_openalex
import requests
import os
import json

from openai import OpenAI
from pydantic import BaseModel

class TechnologyCandidateRequest(BaseModel):
    name: str
    summary: str | None = None
    source: str | None = None
    confidence: float | None = None

# =========================
# DATABASE INIT
# =========================

Base.metadata.create_all(bind=engine)


# =========================
# APP SETUP
# =========================
client = OpenAI(
    api_key=os.getenv(
        "OPENAI_API_KEY"
    )
)
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://calgary-compass-self.vercel.app",
    ],
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

    technology = create_technology(
        db,
        name=data.name,
        description=data.description,
        current_status=data.current_status
    )

    try:

        papers = search_openalex(
            technology.name
        )

        for paper in papers:

            source = Source(

                technology_id=technology.id,

                title=paper.get(
                    "title",
                    ""
                ),

                source_type="academic_paper",

                source_database="OpenAlex",

                source_name=paper.get(
                    "primary_location",
                    {}
                ).get(
                    "source",
                    {}
                ).get(
                    "display_name",
                    ""
                ),

                publication_date=paper.get(
                    "publication_date",
                    ""
                ),

                doi=paper.get(
                    "doi",
                    ""
                ),

                citation_count=paper.get(
                    "cited_by_count",
                    0
                )
            )

            db.add(source)

        db.commit()

    except Exception as e:

        print(
            f"Source collection failed: {e}"
        )

    return technology

# =========================
# GET TECHNOLOGIES
# =========================

@app.get("/technologies")
def get_technologies(
    db: Session = Depends(get_db)
):
    return db.query(
        Technology
    ).filter(
        Technology.is_active == True
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
    papers = search_openalex(
        technology.name
    )
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

    db.query(Vote).filter(
        Vote.technology_id == technology_id
    ).delete()

    db.query(AIEvaluation).filter(
        AIEvaluation.technology_id == technology_id
    ).delete()

    db.query(TimelineEvent).filter(
        TimelineEvent.technology_id == technology_id
    ).delete()

    db.query(TechnologyEvidence).filter(
        TechnologyEvidence.technology_id == technology_id
    ).delete()

    db.query(Source).filter(
        Source.technology_id == technology_id
    ).delete()

    db.delete(tech)

    db.commit()

    return {
        "message": "Technology deleted"
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
    tech.is_active = data.is_active

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


@app.get("/openalex-test/{technology_name}")
def openalex_test(
    technology_name: str
):

    return search_openalex(
        technology_name
    )

@app.post("/technology/{technology_id}/collect-sources")
def collect_sources(
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

    papers = search_openalex(
        technology.name
    )

    added = 0

    for paper in papers:

        doi = paper.get(
            "doi",
            ""
        )

        if doi:

            existing = db.query(
                Source
            ).filter(
                Source.doi == doi
            ).first()

            if existing:
                continue

        source = Source(

            technology_id=technology.id,

            title=paper.get(
                "title",
                ""
            ),

            source_type="academic_paper",

            source_database="OpenAlex",

            source_name=paper.get(
                "primary_location",
                {}
            ).get(
                "source",
                {}
            ).get(
                "display_name",
                ""
            ),

            publication_date=paper.get(
                "publication_date",
                ""
            ),

            doi=doi,

            citation_count=paper.get(
                "cited_by_count",
                0
            )
        )

        db.add(source)

@app.post("/technology/{technology_id}/collect-sources")
def collect_sources(
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

    papers = search_openalex(
        technology.name
    )

    added = 0
    skipped = 0

    for paper in papers:

        doi = paper.get(
            "doi",
            ""
        )

        title = paper.get(
            "title",
            ""
        )

        existing = None

        # Check DOI first
        if doi:

            existing = db.query(
                Source
            ).filter(
                Source.doi == doi
            ).first()

        # Check title if DOI doesn't exist
        if not existing:

            existing = db.query(
                Source
            ).filter(
                Source.title == title
            ).first()

        # Skip duplicates
        if existing:

            skipped += 1
            continue

        source = Source(

            technology_id=technology.id,

            title=title,

            source_type="academic_paper",

            source_database="OpenAlex",

            source_name=paper.get(
                "primary_location",
                {}
            ).get(
                "source",
                {}
            ).get(
                "display_name",
                ""
            ),

            publication_date=paper.get(
                "publication_date",
                ""
            ),

            doi=doi,

            citation_count=paper.get(
                "cited_by_count",
                0
            )
        )

        db.add(source)

        added += 1

    db.commit()

    paper_count = db.query(
        Source
    ).filter(
        Source.technology_id == technology.id
    ).count()

    citation_count = sum(

        source.citation_count or 0

        for source in db.query(
            Source
        ).filter(
            Source.technology_id ==
            technology.id
        ).all()
    )

    evidence = db.query(
        TechnologyEvidence
    ).filter(
        TechnologyEvidence.technology_id
        == technology.id
    ).first()

    if not evidence:

        evidence = TechnologyEvidence(

            technology_id=
                technology.id,

            paper_count=
                paper_count,

            citation_count=
                citation_count,

            patent_count=0,

            funding_count=0
        )

        db.add(evidence)

    else:

        evidence.paper_count = paper_count

        evidence.citation_count = citation_count

    db.commit()

    return {

        "technology":
            technology.name,

        "added":
            added,

        "skipped":
            skipped,

        "paper_count":
            paper_count,

        "citation_count":
            citation_count
    }

@app.put("/technology/{technology_id}/hide")
def hide_technology(
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
            "error": "Technology not found"
        }

    tech.is_active = False

    db.commit()

    db.refresh(tech)

    return {
        "message": "Technology hidden"
    }

@app.put("/technology/{technology_id}/show")
def show_technology(
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
            "error": "Technology not found"
        }

    tech.is_active = True

    db.commit()

    db.refresh(tech)

    return {
        "message": "Technology shown"
    }

@app.get("/admin/technologies")
def get_all_technologies(
    db: Session = Depends(get_db)
):
    return db.query(
        Technology
    ).all()


@app.post("/technology-candidates")
def create_candidate(
    data: TechnologyCandidateRequest,
    db: Session = Depends(get_db)
):

    candidate = TechnologyCandidate(
        name=data.name,
        summary=data.summary,
        source=data.source,
        confidence=data.confidence
    )

    db.add(candidate)

    db.commit()

    db.refresh(candidate)

    return candidate

@app.get("/technology-candidates")
def get_candidates(
    db: Session = Depends(get_db)
):

    return db.query(
        TechnologyCandidate
    ).filter(
        TechnologyCandidate.status == "Pending"
    ).all()



@app.post(
    "/technology-candidates/{candidate_id}/approve"
)
def approve_candidate(
    candidate_id: int,
    db: Session = Depends(get_db)
):

    candidate = db.query(
        TechnologyCandidate
    ).filter(
        TechnologyCandidate.id == candidate_id
    ).first()

    if not candidate:

        return {
            "error":
                "Candidate not found"
        }

    technology = Technology(
        name=candidate.name,
        description=candidate.summary,
        current_status="Identified"
    )

    db.add(
        technology
    )

    candidate.status = "Approved"

    db.commit()

    return {
        "message":
            "Technology approved"
    }

@app.post(
    "/technology-candidates/{candidate_id}/reject"
)
def reject_candidate(
    candidate_id: int,
    db: Session = Depends(get_db)
):

    candidate = db.query(
        TechnologyCandidate
    ).filter(
        TechnologyCandidate.id == candidate_id
    ).first()

    if not candidate:

        return {
            "error":
                "Candidate not found"
        }

    candidate.status = "Rejected"

    db.commit()

    return {
        "message":
            "Technology rejected"
    }

@app.post("/discover-technologies")
def discover_technologies(
    db: Session = Depends(get_db)
):

    response = requests.get(
        "https://api.openalex.org/works",
        params={
            "search": "smart city technology",
            "per-page": 20
        }
    )

    data = response.json()

    papers = []

    for paper in data.get("results", []):

        title = paper.get("title", "")

        if title:
            papers.append(title)

    if not papers:

        return {
            "error": "No papers found from OpenAlex"
        }

    prompt = f"""
You are a municipal innovation analyst.

Below are academic paper titles from OpenAlex:

{papers}

Identify emerging technologies relevant to cities like Calgary.

Return ONLY valid JSON.

Example:

[
  {{
    "name": "AI Road Inspection",
    "summary": "Computer vision systems that automatically inspect road infrastructure.",
    "confidence": 92
  }}
]
"""

    ai_response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    content = ai_response.choices[0].message.content

    try:

        candidates = json.loads(content)

        print("========== AI CANDIDATES ==========")
        print(candidates)
        print("===================================")

    except Exception as e:

        print("JSON PARSE FAILED")
        print(content)

        return {
            "error": "AI returned invalid JSON",
            "response": content
        }

    created_count = 0

    for item in candidates:

        print(f"Processing: {item}")

        existing_candidate = db.query(
            TechnologyCandidate
        ).filter(
            TechnologyCandidate.name == item["name"]
        ).first()

        existing_technology = db.query(
            Technology
        ).filter(
            Technology.name == item["name"]
        ).first()

        if existing_candidate:

            print(
                f"Skipped existing candidate: {item['name']}"
            )

            continue

        if existing_technology:

            print(
                f"Skipped existing technology: {item['name']}"
            )

            continue

        candidate = TechnologyCandidate(
            name=item["name"],
            summary=item.get("summary", ""),
            source="OpenAlex + AI",
            confidence=item.get("confidence", 50),
            status="Pending"
        )

        db.add(candidate)

        created_count += 1

        print(
            f"Added candidate: {item['name']}"
        )

    db.commit()

    all_candidates = db.query(
        TechnologyCandidate
    ).all()

    print(
        f"TOTAL CANDIDATES IN DB: {len(all_candidates)}"
    )

    return {
        "message": "Discovery complete",
        "created": created_count,
        "total_candidates": len(all_candidates)


@app.post("/challenge-vote")
def submit_challenge_vote(
    vote: CalgaryChallengeVoteRequest,
    db: Session = Depends(get_db)
):

    db_vote = CalgaryChallengeVote(
        stakeholder=vote.stakeholder,
        challenge=vote.challenge,
        rank=vote.rank
    )

    db.add(db_vote)

    db.commit()

    return {
        "message": "Challenge vote recorded"
    }

@app.get("/challenge-summary")
def challenge_summary(
    db: Session = Depends(get_db)
):

    results = (
        db.query(
            CalgaryChallengeVote.challenge,
            func.avg(
                CalgaryChallengeVote.rank
            ).label("average_rank"),
            func.count(
                CalgaryChallengeVote.id
            ).label("votes")
        )
        .group_by(
            CalgaryChallengeVote.challenge
        )
        .order_by(
            func.avg(
                CalgaryChallengeVote.rank
            )
        )
        .all()
    )

    return [
        {
            "challenge": r.challenge,
            "average_rank": round(
                float(r.average_rank),
                2
            ),
            "votes": r.votes,
        }
        for r in results
    ]

@app.get("/technology-applications")
def get_technology_applications(
    db: Session = Depends(get_db)
):

    return db.query(
        TechnologyApplication
    ).all()

@app.post("/technology-applications")
def create_technology_application(
    data: TechnologyApplicationRequest,
    db: Session = Depends(get_db)
):

    application = TechnologyApplication(
        technology_id=data.technology_id,
        name=data.name,
        description=data.description
    )

    db.add(application)

    db.commit()

    db.refresh(application)

    return application

@app.delete(
    "/technology-applications/{application_id}"
)
def delete_technology_application(
    application_id: int,
    db: Session = Depends(get_db)
):

    application = db.query(
        TechnologyApplication
    ).filter(
        TechnologyApplication.id
        == application_id
    ).first()

    if not application:
        return {
            "error": "Application not found"
        }

    db.delete(application)

    db.commit()

    return {
        "message": "Deleted"
    }

