from pydantic import BaseModel

from sqlalchemy import (
    Column,
    Integer,
    String,
    ForeignKey
)

from app.database import Base


# =========================
# DATABASE TABLES
# =========================

class Technology(Base):

    __tablename__ = "technologies"

    id = Column(Integer, primary_key=True)

    name = Column(String)

    description = Column(String)

    current_status = Column(String)


class Vote(Base):

    __tablename__ = "votes"

    id = Column(Integer, primary_key=True)

    technology_id = Column(
        Integer,
        ForeignKey("technologies.id")
    )

    stakeholder = Column(String)

    financial_sustainability = Column(Integer)

    operational_excellence = Column(Integer)

    people_culture = Column(Integer)

    trusted_governance = Column(Integer)

    innovation_agility = Column(Integer)


class TimelineEvent(Base):

    __tablename__ = "timeline_events"

    id = Column(Integer, primary_key=True)

    technology_id = Column(
        Integer,
        ForeignKey("technologies.id")
    )

    status = Column(String)

    description = Column(String)

    event_date = Column(String)

class AIEvaluation(Base):

    __tablename__ = "ai_evaluations"

    id = Column(Integer, primary_key=True)

    technology_id = Column(
        Integer,
        ForeignKey("technologies.id")
    )

    financial_sustainability = Column(Integer)

    operational_excellence = Column(Integer)

    people_culture = Column(Integer)

    trusted_governance = Column(Integer)

    innovation_agility = Column(Integer)

    summary = Column(String)


# =========================
# REQUEST MODELS
# =========================

class VoteRequest(BaseModel):

    technology_id: int

    stakeholder: str

    financial_sustainability: int

    operational_excellence: int

    people_culture: int

    trusted_governance: int

    innovation_agility: int


class TechnologyRequest(BaseModel):

    name: str

    description: str

    current_status: str