from sqlalchemy.orm import Session

from app.models import (
    Technology,
    Vote,
    AIEvaluation,
    Source,
    TechnologyEvidence
)

def create_technology(
    db: Session,
    name: str,
    description: str,
    current_status: str
):

    tech = Technology(
        name=name,
        description=description,
        current_status=current_status
    )

    db.add(tech)
    db.commit()
    db.refresh(tech)

    return tech


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


def create_ai_evaluation(
    db: Session,
    technology_id: int,
    financial_sustainability: int,
    operational_excellence: int,
    people_culture: int,
    trusted_governance: int,
    innovation_agility: int,
    summary: str,
    technology_summary: str,
    calgary_problem: str,
    global_examples: str,
    implementation_statistics: str,
    governance_recommendation: str
):

    evaluation = AIEvaluation(
        technology_id=technology_id,
        financial_sustainability=financial_sustainability,
        operational_excellence=operational_excellence,
        people_culture=people_culture,
        trusted_governance=trusted_governance,
        innovation_agility=innovation_agility,
        summary=summary,
        technology_summary=technology_summary,
        calgary_problem=calgary_problem,
        global_examples=global_examples,
        implementation_statistics=implementation_statistics,
        governance_recommendation=governance_recommendation
    )

    db.add(evaluation)
    db.commit()
    db.refresh(evaluation)

    return evaluation


def create_source(
    db: Session,
    source_data: dict
):

    source = Source(**source_data)

    db.add(source)
    db.commit()
    db.refresh(source)

    return source

def update_technology_evidence(
    db: Session,
    technology_id: int
):

    sources = db.query(
        Source
    ).filter(
        Source.technology_id == technology_id
    ).all()

    paper_count = len([
        s for s in sources
        if s.source_type == "academic_paper"
    ])

    citation_count = sum(
        s.citation_count or 0
        for s in sources
    )

    patent_count = len([
        s for s in sources
        if s.source_type == "patent"
    ])

    funding_count = len([
        s for s in sources
        if s.source_type == "funding"
    ])

    evidence = db.query(
        TechnologyEvidence
    ).filter(
        TechnologyEvidence.technology_id
        == technology_id
    ).first()

    if evidence:

        evidence.paper_count = paper_count
        evidence.citation_count = citation_count
        evidence.patent_count = patent_count
        evidence.funding_count = funding_count

    else:

        evidence = TechnologyEvidence(
            technology_id=technology_id,
            paper_count=paper_count,
            citation_count=citation_count,
            patent_count=patent_count,
            funding_count=funding_count
        )

        db.add(evidence)

    db.commit()

    return evidence
