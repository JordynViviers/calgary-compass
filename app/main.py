from fastapi import FastAPI, Depends, Header, HTTPException
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
    ChallengeApplicationLink,
    ChallengeApplicationLinkRequest,
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

ADMIN_PASSWORD = os.getenv(
    "ADMIN_PASSWORD",
    "ChangeMeImmediately"
)

def verify_admin(
    x_admin_password: str = Header(None)
):
    if x_admin_password != ADMIN_PASSWORD:
        raise HTTPException(
            status_code=401,
            detail="Unauthorized"
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
def create_technology(
    data: TechnologyCreate,
    db: Session = Depends(get_db),
    _: None = Depends(verify_admin)
):

    technology = create_technology(
        db,
        name=data.name,
        description=data.description,
        hero_image=data.hero_image,
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
    db: Session = Depends(get_db), 
    _: None = Depends(verify_admin)
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

    if "error" in ai_result:
    
        return {
            "error":
                ai_result["error"]
        }

    # =========================
    # SAVE TO DATABASE
    # =========================

    evaluation = create_ai_evaluation(

        db,

        technology_id=technology.id,

        reliable_infrastructure=
            ai_result["reliable_infrastructure"],

        safe_city=
            ai_result["safe_city"],

        transportation_network=
            ai_result["transportation_network"],

        community_wellbeing=
            ai_result["community_wellbeing"],

        balanced_growth=
            ai_result["balanced_growth"],

        trusted_governance=
            ai_result["trusted_governance"],

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

        reliable_infrastructure=
            data.reliable_infrastructure,

        safe_city=
            data.safe_city,

        transportation_network=
            data.transportation_network,

        community_wellbeing=
            data.community_wellbeing,

        balanced_growth=
            data.balanced_growth, 

        trusted_governance=
            data.trusted_governance, 
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

            "reliable_infrastructure":
                vote.reliable_infrastructure,

            "safe_city":
                vote.safe_city,

            "transportation_network":
                vote.transportation_network,

            "community_wellbeing":
                vote.community_wellbeing,

            "balanced_growth":
                vote.balanced_growth,

            "trusted_governance":
                vote.trusted_governance,

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
    ).order_by(
        AIEvaluation.id.desc()
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

    reliability_avg = (
        sum(
            v.reliable_infrastructure
            for v in votes
        ) / len(votes)
    )

    safety_avg = (
        sum(
            v.safe_city
            for v in votes
        ) / len(votes)
    )

    transportation_avg = (
        sum(
            v.transportation_network
            for v in votes
        ) / len(votes)
    )

    wellbeing_avg = (
        sum(
            v.community_wellbeing
            for v in votes
        ) / len(votes)
    )

    growth_avg = (
        sum(
            v.balanced_growth
            for v in votes
        ) / len(votes)
    )

    governance_avg = (
        sum(
            v.trusted_governance
            for v in votes
        ) / len(votes)
    )

    return {

        "reliable_infrastructure":
            round(
                (
                    reliability_avg * 0.5
                ) + (
                    ai_eval.reliable_infrastructure * 0.5
                ),
                2
            ),

        "safe_city":
            round(
                (
                    safety_avg * 0.5
                ) + (
                    ai_eval.safe_city * 0.5
                ),
                2
            ),

        "transportation_network":
            round(
                (
                    transportation_avg * 0.5
                ) + (
                    ai_eval.transportation_network * 0.5
                ),
                2
            ),

        "community_wellbeing":
            round(
                (
                    wellbeing_avg * 0.5
                ) + (
                    ai_eval.community_wellbeing * 0.5
                ),
                2
            ),

        "balanced_growth":
            round(
                (
                    growth_avg * 0.5
                ) + (
                    ai_eval.balanced_growth * 0.5
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
        AIEvaluation.technology_id
        == technology_id
    ).order_by(
        AIEvaluation.id.desc()
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

        "reliable_infrastructure":
            sum(
                v.reliable_infrastructure
                for v in votes
            ) / len(votes),

        "safe_city":
            sum(
                v.safe_city
                for v in votes
            ) / len(votes),

        "transportation_network":
            sum(
                v.transportation_network
                for v in votes
            ) / len(votes),

        "community_wellbeing":
            sum(
                v.community_wellbeing
                for v in votes
            ) / len(votes),

        "balanced_growth":
            sum(
                v.balanced_growth
                for v in votes
            ) / len(votes),

        "trusted_governance":
            sum(
                v.trusted_governance
                for v in votes
            ) / len(votes),
    }

    ai = {

        "reliable_infrastructure":
            ai_eval.reliable_infrastructure,

        "safe_city":
            ai_eval.safe_city,

        "transportation_network":
            ai_eval.transportation_network,

        "community_wellbeing":
            ai_eval.community_wellbeing,

        "balanced_growth":
            ai_eval.balanced_growth,

        "trusted_governance":
            ai_eval.trusted_governance,
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
    ).order_by(
        AIEvaluation.id.desc()
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
    db: Session = Depends(get_db), 
    _: None = Depends(verify_admin)
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

    db: Session = Depends(get_db),
    
    _: None = Depends(verify_admin)

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
    tech.is_active = data.is_active
    tech.hero_image = data.hero_image

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
    db: Session = Depends(get_db), 
    _: None = Depends(verify_admin)
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
    db: Session = Depends(get_db), 
    _: None = Depends(verify_admin)
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
def get_admin_technologies(
    db: Session = Depends(get_db),
    _: None = Depends(verify_admin)
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
    }

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

    official_challenges = [

        "Infrastructure, Traffic and Roads",

        "Growth and Planning",

        "Crime, Safety and Policing",

        "Transit",

        "Homelessness, Poverty and Affordable Housing",

        "Economy",

        "Water Supply/Infrastructure",

        "Environment and Waste Management",

        "Recreation and Parks",

        "Education",

    ]

    results = []

    for challenge in official_challenges:

        votes = db.query(
            CalgaryChallengeVote
        ).filter(
            CalgaryChallengeVote.challenge == challenge
        ).all()

        if len(votes) == 0:

            continue

        average_rank = sum(
            vote.rank
            for vote in votes
        ) / len(votes)

        results.append({

            "challenge": challenge,

            "average_rank": round(
                average_rank,
                2
            ),

            "votes": len(votes),

        })

    results.sort(
        key=lambda x:
        x["average_rank"]
    )

    return results

@app.get("/technology-applications")
def get_technology_applications(
    db: Session = Depends(get_db)
):

    return db.query(
        TechnologyApplication
    ).filter(
        TechnologyApplication.is_active == True
    ).all()
    
@app.post("/technology-applications")
def create_technology_application(
    data: TechnologyApplicationRequest,
    db: Session = Depends(get_db)
):

    application = TechnologyApplication(
        technology_id=data.technology_id,
        name=data.name,
        description=data.description,
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

@app.put(
    "/technology-applications/{application_id}"
)
def update_technology_application(
    application_id: int,
    data: TechnologyApplicationRequest,
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
            "error": "Not found"
        }

    application.name = data.name
    application.description = (
        data.description
    )
    application.technology_id = (
        data.technology_id
    )

    db.commit()
    db.refresh(application)
    return application

@app.post(
    "/technology-applications/{application_id}/toggle"
)
def toggle_application(
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
            "error": "Not found"
        }

    application.is_active = (
        not application.is_active
    )

    db.commit()

    return {
        "message": "Updated"
    }

@app.get("/technologies/{technology_id}/applications")
def get_technology_applications(
    technology_id: int,
    db: Session = Depends(get_db)
):
    return (
        db.query(TechnologyApplication)
        .filter(
            TechnologyApplication.technology_id
            == technology_id,
            TechnologyApplication.is_active == True
        )
        .all()
    )

@app.delete(
    "/community-input/{response_id}"
)
def delete_community_input(
    response_id: int,
    db: Session = Depends(get_db)
):

    response = db.query(
        CommunitySignal
    ).filter(
        CommunitySignal.id == response_id
    ).first()

    if not response:
        return {
            "error":
                "Response not found"
        }

    db.delete(response)

    db.commit()

    return {
        "message":
            "Response deleted"
    }

@app.delete("/community-input")
def clear_community_input(
    db: Session = Depends(get_db)
):

    db.query(
        CommunitySignal
    ).delete()

    db.query(
        Vote
    ).delete()

    db.commit()

    return {
        "message":
            "All community responses and ratings deleted"
    }

@app.post("/challenge-application-link")
def create_challenge_application_link(
    data: ChallengeApplicationLinkRequest,
    db: Session = Depends(get_db)
):
    existing = (
        db.query(ChallengeApplicationLink)
        .filter(
            ChallengeApplicationLink.challenge == data.challenge,
            ChallengeApplicationLink.application_id == data.application_id
        )
        .first()
    )
    
    if existing:
        raise HTTPException(
            status_code=400,
            detail="Mapping already exists."
        )
    link = ChallengeApplicationLink(
        challenge=data.challenge,
        application_id=data.application_id,
        strength=data.strength
    )

    db.add(link)

    db.commit()

    db.refresh(link)

    return link

@app.get("/challenge-application-links")
def get_challenge_application_links(
    db: Session = Depends(get_db)
):

    return db.query(
        ChallengeApplicationLink
    ).all()

@app.delete(
    "/challenge-application-link/{link_id}"
)
def delete_challenge_application_link(
    link_id: int,
    db: Session = Depends(get_db)
):

    link = db.query(
        ChallengeApplicationLink
    ).filter(
        ChallengeApplicationLink.id == link_id
    ).first()

    if not link:
        return {"error": "Not found"}

    db.delete(link)

    db.commit()

    return {
        "message": "Deleted"
    }

@app.get("/challenge-explorer")
def challenge_explorer(
    db: Session = Depends(get_db)
):

    challenges = db.query(
        ChallengeApplicationLink
    ).all()

    applications = db.query(
        TechnologyApplication
    ).all()

    technologies = db.query(
        Technology
    ).all()

    return {
        "links": challenges,
        "applications": applications,
        "technologies": technologies,
    }

@app.get("/challenge-solutions")
def challenge_solutions(
    db: Session = Depends(get_db)
):

    links = db.query(
        ChallengeApplicationLink
    ).all()

    applications = db.query(
        TechnologyApplication
    ).all()

    technologies = db.query(
        Technology
    ).all()

    result = {}

    for link in links:

        application = next(
            (
                a
                for a in applications
                if a.id ==
                link.application_id
            ),
            None
        )

        if not application:
            continue

        technology = next(
            (
                t
                for t in technologies
                if t.id ==
                application.technology_id
            ),
            None
        )

        if not technology:
            continue

        if link.challenge not in result:

            result[
                link.challenge
            ] = []

        result[
            link.challenge
        ].append(
            {
                "technology_id":
                    technology.id,
                "technology_name":
                    technology.name,
                "hero_image":
                    technology.hero_image,
                "application_name":
                    application.name,
                "application_description":
                    application.description,
                "strength":
                    link.strength,
            }
        )

    return result

@app.get("/technology/{technology_id}/impact")
def technology_impact(
    technology_id: int,
    db: Session = Depends(get_db)
):

    weighted = weighted_scores(
        technology_id,
        db
    )

    applications = db.query(
        TechnologyApplication
    ).filter(
        TechnologyApplication.technology_id
        == technology_id
    ).all()

    impact = {}

    challenge_weights = {

        "Infrastructure, Traffic and Roads": [
            "reliable_infrastructure",
            "transportation_network",
        ],

        "Crime, Safety and Policing": [
            "safe_city",
            "trusted_governance",
        ],

        "Growth and Planning": [
            "balanced_growth",
            "reliable_infrastructure",
        ],

        "Transit": [
            "transportation_network",
            "reliable_infrastructure",
        ],

        "Homelessness, Poverty and Affordable Housing": [
            "community_wellbeing",
            "balanced_growth",
        ],

        "Economy": [
            "balanced_growth",
            "trusted_governance",
        ],

        "Water Supply/Infrastructure": [
            "reliable_infrastructure",
            "community_wellbeing",
        ],

        "Environment and Waste Management": [
            "community_wellbeing",
            "balanced_growth",
        ],

        "Recreation and Parks": [
            "community_wellbeing",
        ],

        "Education": [
            "community_wellbeing",
            "trusted_governance",
        ],

    }

    for application in applications:

        links = db.query(
            ChallengeApplicationLink
        ).filter(
            ChallengeApplicationLink.application_id
            == application.id
        ).all()

        for link in links:

            if link.challenge not in impact:

                priorities = challenge_weights.get(
                    link.challenge,
                    []
                )

                if priorities:

                    base_score = sum(
                        weighted[p]
                        for p in priorities
                    ) / len(priorities)

                else:

                    base_score = 5

                impact[link.challenge] = {

                    "score": 0,

                    "applications": []

                }

            impact[link.challenge]["score"] += base_score

            if application.name not in impact[
                link.challenge
            ]["applications"]:

                impact[
                    link.challenge
                ]["applications"].append(
                    application.name
                )

    if not impact:

        return {}

    max_score = max(
        item["score"]
        for item in impact.values()
    )

    for item in impact.values():

        item["score"] = round(
            item["score"] /
            max_score *
            10,
            1
        )

    return impact


@app.post("/admin/login")
def admin_login(
    x_admin_password: str = Header(None)
):

    if x_admin_password != ADMIN_PASSWORD:

        raise HTTPException(
            status_code=401,
            detail="Incorrect password"
        )

    return {
        "success": True
    }

@app.post("/community-submission")
def submit_community_submission(
    submission: CommunitySubmissionRequest,
    db: Session = Depends(get_db)
):

    # -------------------------
    # Create one submission
    # -------------------------

    db_submission = CommunitySubmission(
        stakeholder=submission.stakeholder
    )

    db.add(db_submission)

    db.flush()

    # -------------------------
    # Save challenge rankings
    # -------------------------

    for ranking in submission.challenge_rankings:

        db.add(

            CalgaryChallengeVote(

                submission_id=db_submission.id,

                stakeholder=submission.stakeholder,

                challenge=ranking.challenge,

                rank=ranking.rank

            )

        )

    # -------------------------
    # Save technology votes
    # -------------------------

    for vote in submission.technology_votes:

        db.add(

            Vote(

                submission_id=db_submission.id,

                stakeholder=submission.stakeholder,

                technology_id=vote.technology_id,

                reliable_infrastructure=vote.reliable_infrastructure,

                safe_city=vote.safe_city,

                transportation_network=vote.transportation_network,

                community_wellbeing=vote.community_wellbeing,

                balanced_growth=vote.balanced_growth,

                trusted_governance=vote.trusted_governance

            )

        )

    # -------------------------
    # Save community signal
    # -------------------------

    if (
        submission.community_signal
        and submission.community_signal.strip()
    ):

        db.add(

            CommunitySignal(

                submission_id=db_submission.id,

                stakeholder=submission.stakeholder,

                signal_text=submission.community_signal

            )

        )

    db.commit()

    return {

        "message":
            "Community submission saved.",

        "submission_id":
            db_submission.id

    }

