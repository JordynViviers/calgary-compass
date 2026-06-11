from sqlalchemy.orm import relationship
from app.database import Base
from pydantic import BaseModel
from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    ForeignKey,
    Text,
    DateTime, 
    Boolean
)

from sqlalchemy.sql import func
from datetime import datetime
# =========================
# DATABASE TABLES
# =========================
class Technology(Base):
    __tablename__ = "technologies"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String)

    description = Column(String)

    current_status = Column(String)

    is_active = Column(Boolean, default=True)

    sources = relationship(
        "Source",
        backref="technology",
        cascade="all, delete-orphan"
    ) 
    
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
    # Which event this application was submitted for (optional).
    event_id = Column(Integer)
    event_title = Column(String)
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
# EVENTS
# =========================
class Event(Base):
    __tablename__ = "events"
    id = Column(Integer, primary_key=True)
    title = Column(String)
    date = Column(String)
    location = Column(String)
    description = Column(String)
    link = Column(String)
    # When True, the built-in application form is attached to this event
    # and an "Apply" button is shown on the public events page.
    has_application = Column(Boolean, default=False)
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
    is_active: bool = True
    
class CommunitySignalRequest(BaseModel):
    stakeholder: str
    signal_text: str
    
class ApplicationRequest(BaseModel):
    name: str
    email: str
    event_id: int | None = None
    event_title: str = ""
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
    
class EventRequest(BaseModel):
    title: str
    date: str = ""
    location: str = ""
    description: str = ""
    link: str = ""
    has_application: bool = False

class Source(Base):
    __tablename__ = "sources"

    id = Column(Integer, primary_key=True, index=True)

    technology_id = Column(
        Integer,
        ForeignKey("technologies.id"),
        nullable=False
    )

    title = Column(String, nullable=False)

    authors = Column(String)

    source_type = Column(String)
    # academic_paper
    # patent
    # funding
    # industry_report
    # market_signal

    source_name = Column(String)
    # Nature
    # IEEE
    # USPTO
    # DARPA

    source_database = Column(String)
    # OpenAlex
    # SemanticScholar
    # GooglePatents

    publication_date = Column(String)

    doi = Column(String)

    url = Column(String)

    citation_count = Column(Integer)

    abstract = Column(Text)

    created_at = Column(DateTime, default=datetime.utcnow)

class SourceCreate(BaseModel):
    technology_id: int

    title: str

    authors: str = ""

    source_type: str = ""

    source_name: str = ""

    source_database: str = ""

    publication_date: str = ""

    doi: str = ""

    url: str = ""

    citation_count: int = 0

    abstract: str = ""

class TechnologyEvidence(Base):
    __tablename__ = "technology_evidence"

    id = Column(Integer, primary_key=True)

    technology_id = Column(
        Integer,
        ForeignKey("technologies.id"),
        unique=True
    )

    paper_count = Column(Integer, default=0)

    citation_count = Column(Integer, default=0)

    patent_count = Column(Integer, default=0)

    funding_count = Column(Integer, default=0)

class TechnologyCandidate(Base):
    __tablename__ = "technology_candidates"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)

    summary = Column(Text)

    source = Column(String)

    confidence = Column(Integer)

    status = Column(
        String,
        default="Pending"
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

class TechnologyCandidateRequest(BaseModel):
    name: str
    summary: str | None = None
    source: str | None = None
    confidence: int | None = None

class CalgaryChallengeVote(Base):
    __tablename__ = "calgary_challenge_votes"

    id = Column(Integer, primary_key=True)

    stakeholder = Column(String)

    challenge = Column(String)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

class CalgaryChallengeVoteRequest(BaseModel):
    stakeholder: str
    challenge: str
