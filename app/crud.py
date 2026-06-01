from sqlalchemy.orm import Session

from app.models import (
    Technology,
    Vote,
    TimelineEvent
)

# =========================
# CREATE TECHNOLOGY
# =========================

def create_technology(
    db: Session,
    name: str,
    description: str,
    current_status: str
):

    technology = Technology(
        name=name,
        description=description,
        current_status=current_status
    )

    db.add(technology)

    db.commit()

    db.refresh(technology)

    return technology


# =========================
# CREATE VOTE
# =========================

def create_vote(
    db: Session,
    technology_id: int,
    stakeholder: str,
    financial_sustainability: int,
    operational_excellence: int,
    people_culture: int,
    trusted_governance: int,
    innovation_agility: int
):

    vote = Vote(
        technology_id=technology_id,
        stakeholder=stakeholder,
        financial_sustainability=financial_sustainability,
        operational_excellence=operational_excellence,
        people_culture=people_culture,
        trusted_governance=trusted_governance,
        innovation_agility=innovation_agility
    )

    db.add(vote)

    db.commit()

    db.refresh(vote)

    return vote

from app.models import AIEvaluation

def create_ai_evaluation(
    db: Session,
    technology_id: int,
    financial_sustainability: int,
    operational_excellence: int,
    people_culture: int,
    trusted_governance: int,
    innovation_agility: int,
    summary: str
):

    evaluation = AIEvaluation(

        technology_id=technology_id,

        financial_sustainability=financial_sustainability,

        operational_excellence=operational_excellence,

        people_culture=people_culture,

        trusted_governance=trusted_governance,

        innovation_agility=innovation_agility,

        summary=summary
    )

    db.add(evaluation)

    db.commit()

    db.refresh(evaluation)

    return evaluation