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

    technology_id = Column(Integer, ForeignKey("technologies.id"))
    stakeholder = Column(String)

    financial_sustainability = Column(Integer)
    operational_excellence = Column(Integer)
    people_culture = Column(Integer)
    trusted_governance = Column(Integer)
    innovation_agility = Column(Integer)


class TimelineEvent(Base):
    __tablename__ = "timeline_events"

    id = Column(Integer, primary_key=True)
    technology_id = Column(Integer, ForeignKey("technologies.id"))

    status = Column(String)
    description = Column(String)
    event_date = Column(String)


# =========================
# AI EVALUATION (UPDATED)
# =========================

class AIEvaluation(Base):
    __tablename__ = "ai_evaluations"

    id = Column(Integer, primary_key=True)

    technology_id = Column(Integer, ForeignKey("technologies.id"))

    # scores
    financial_sustainability = Column(Integer)
    operational_excellence = Column(Integer)
    people_culture = Column(Integer)
    trusted_governance = Column(Integer)
    innovation_agility = Column(Integer)

    # existing summary
    summary = Column(String)

    # NEW AI ANALYSIS FIELDS
    technology_summary = Column(String)
    calgary_problem = Column(String)
    global_examples = Column(String)
    implementation_statistics = Column(String)
    governance_recommendation = Column(String)


# =========================
# COMMUNITY SIGNALS
# =========================

class CommunitySignal(Base):
    __tablename__ = "community_signals"

    id = Column(Integer, primary_key=True)
    stakeholder = Column(String)
    signal_text = Column(String)


# =========================
# APPLICATIONS
# =========================

class Application(Base):
    __tablename__ = "applications"

    id = Column(Integer, primary_key=True)

    name = Column(String)
    email = Column(String)
    field_of_work = Column(String)
    role = Column(String)
    role_other = Column(String)
    hear_about = Column(String)

    tech_1_year = Column(String)
    tech_2_year = Column(String)
    tech_5_year = Column(String)

    dietary = Column(String)
    dietary_other = Column(String)

    accessibility = Column(String)
    recording_consent = Column(String)
    anything_else = Column(String)


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


class CommunitySignalRequest(BaseModel):
    stakeholder: str
    signal_text: str


class ApplicationRequest(BaseModel):
    name: str
    email: str
    field_of_work: str = ""
    role: str = ""
    role_other: str = ""
    hear_about: str = ""
    tech_1_year: str = ""
    tech_2_year: str = ""
    tech_5_year: str = ""
    dietary: str = ""
    dietary_other: str = ""
    accessibility: str = ""
    recording_consent: str = ""
    anything_else: str = ""
