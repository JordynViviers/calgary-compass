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


#Pie Chart Code

```python id="7b1q9f"
from pydantic import BaseModel, Field

from sqlalchemy import (
    Column,
    Integer,
    String,
    Float
)

from app.database import Base


# =========================
# DATABASE TABLE
# =========================

class Technology(Base):

    __tablename__ = "technologies"

    id = Column(Integer, primary_key=True)

    name = Column(String, nullable=False)

    description = Column(String)

    current_status = Column(String)

    allocation_percent = Column(
        Float,
        default=20.0
    )


# =========================
# REQUEST MODELS
# =========================

class TechnologyAllocationRequest(BaseModel):

    technology_id: int

    allocation_percent: float = Field(
        ge=0,
        le=100
    )


class TechnologyCreateRequest(BaseModel):

    name: str

    description: str

    current_status: str
```
```python id="sqs73f"
from sqlalchemy.orm import Session

from app.models import (
    Technology,
    TechnologyAllocationRequest
)


def get_technology_allocations(
    db: Session
):

    technologies = db.query(
        Technology
    ).all()

    return [
        {
            "id": tech.id,
            "name": tech.name,
            "allocation_percent":
                tech.allocation_percent
        }
        for tech in technologies
    ]


def update_technology_allocation(
    db: Session,
    request: TechnologyAllocationRequest
):

    technology = db.query(
        Technology
    ).filter(
        Technology.id == request.technology_id
    ).first()

    if not technology:
        raise Exception(
            "Technology not found"
        )

    technology.allocation_percent = (
        request.allocation_percent
    )

    db.commit()

    normalize_allocations(db)

    return technology


def normalize_allocations(
    db: Session
):

    technologies = db.query(
        Technology
    ).all()

    total = sum(
        t.allocation_percent
        for t in technologies
    )

    if total == 100:
        return

    multiplier = 100 / total

    for technology in technologies:

        technology.allocation_percent *= (
            multiplier
        )

    db.commit()
```
