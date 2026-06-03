from openai import OpenAI
from dotenv import load_dotenv
import os
import json
import requests

load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)


# =====================================================
# OPENALEX
# =====================================================
def search_openalex(query: str):

    try:
        response = requests.get(
            "https://api.openalex.org/works",
            params={"search": query, "per-page": 5},
            timeout=10
        )

        results = response.json().get("results", [])

        return [
            {
                "title": r.get("title"),
                "abstract": r.get("abstract"),
                "source": "OpenAlex"
            }
            for r in results
        ]

    except Exception as e:
        print("OPENALEX ERROR:", e)
        return []


# =====================================================
# SEMANTIC SCHOLAR
# =====================================================
def search_semantic_scholar(query: str):

    try:
        response = requests.get(
            "https://api.semanticscholar.org/graph/v1/paper/search",
            params={
                "query": query,
                "limit": 5,
                "fields": "title,abstract,year,citationCount"
            },
            timeout=10
        )

        data = response.json().get("data", [])

        return [
            {
                "title": p.get("title"),
                "abstract": p.get("abstract"),
                "year": p.get("year"),
                "citations": p.get("citationCount"),
                "source": "Semantic Scholar"
            }
            for p in data
        ]

    except Exception as e:
        print("SEMANTIC SCHOLAR ERROR:", e)
        return []


# =====================================================
# CONTEXT BUILDER
# =====================================================
def build_research_context(openalex_papers, semantic_papers):

    all_papers = openalex_papers + semantic_papers

    filtered = [p for p in all_papers if p.get("title") and p.get("abstract")]

    context = ""

    for i, p in enumerate(filtered[:8], 1):
        context += f"""
[{i}] Title: {p['title']}
Source: {p.get('source')}
Abstract: {p['abstract']}
---
"""

    return context


# =====================================================
# MAIN AI FUNCTION (CIVIC INTELLIGENCE ENGINE)
# =====================================================
def evaluate_technology(technology_name, technology_description):

    try:

        query = f"{technology_name} smart city urban infrastructure governance"

        openalex = search_openalex(query)
        semantic = search_semantic_scholar(query)

        context = build_research_context(openalex, semantic)

        response = client.chat.completions.create(
            model="gpt-4.1-mini",
            messages=[
                {
                    "role": "system",
                    "content": """
You are a Smart City AI Governance Analyst for the City of Calgary.

You evaluate technologies for real-world municipal deployment.

Return ONLY valid JSON.

Be precise, realistic, and evidence-based.
"""
                },
                {
                    "role": "user",
                    "content": f"""
Evaluate this technology for municipal use in Calgary.

Technology Name:
{technology_name}

Description:
{technology_description}

========================
RESEARCH CONTEXT
========================
{context}

========================
OUTPUT REQUIREMENTS
========================

Return JSON ONLY with:

1. Scores (1-10):
- financial_sustainability
- operational_excellence
- people_culture
- trusted_governance
- innovation_agility

2. Analysis Fields:
- summary: 2-3 sentence high level assessment
- technology_summary: what the technology does (plain language)
- calgary_problem: what municipal challenge in Calgary it solves
- global_examples: real cities using similar systems (be factual, no hallucinations)
- implementation_statistics: measurable outcomes (cost, efficiency, emissions, safety, etc.)
- governance_recommendation: one of [pilot, scale, monitor, avoid]

If data is uncertain, explicitly say so.

========================
RETURN FORMAT EXAMPLE
========================

{
  "financial_sustainability": 7,
  "operational_excellence": 8,
  "people_culture": 6,
  "trusted_governance": 7,
  "innovation_agility": 8,

  "summary": "...",

  "technology_summary": "...",
  "calgary_problem": "...",
  "global_examples": "...",
  "implementation_statistics": "...",
  "governance_recommendation": "pilot"
}
"""
                }
            ],
            response_format={"type": "json_object"}
        )

        content = response.choices[0].message.content

        return json.loads(content)

    except Exception as e:

        print("AI ERROR:", e)

        return {
            "financial_sustainability": 5,
            "operational_excellence": 5,
            "people_culture": 5,
            "trusted_governance": 5,
            "innovation_agility": 5,

            "summary": "AI evaluation failed.",

            "technology_summary": "",
            "calgary_problem": "",
            "global_examples": "",
            "implementation_statistics": "",
            "governance_recommendation": "monitor"
        }
