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
def evaluate_technology(
    technology_name,
    technology_description
):

    query = (
        f"{technology_name} "
        "smart city urban infrastructure governance"
    )

    openalex = search_openalex(query)

    semantic = search_semantic_scholar(query)

    context = build_research_context(
        openalex,
        semantic
    )

    try:

        response = client.chat.completions.create(

            model="gpt-4.1-mini",

            messages=[

                {
                    "role": "system",
                    "content": """
You are a Smart City AI Governance Analyst for the City of Calgary.

You evaluate technologies for real-world municipal deployment.

Return ONLY valid JSON.

Use evidence from the supplied research context whenever possible.

Scores must be realistic and should not all be identical unless strongly justified.
"""
                },

                {
                    "role": "user",
                    "content": f"""
Evaluate this technology for municipal use in Calgary.

Technology:
{technology_name}

Description:
{technology_description}

========================
RESEARCH CONTEXT
========================

{context}

========================
RETURN JSON ONLY
========================

{{
  "reliable_infrastructure": integer 1-10,
  "safe_city": integer 1-10,
  "transportation_network": integer 1-10,
  "community_wellbeing": integer 1-10,
  "balanced_growth": integer 1-10,
  "trusted_governance": integer 1-10,

  "summary": "...",

  "technology_summary": "...",

  "calgary_problem": "...",

  "global_examples": "...",

  "implementation_statistics": "...",

  "governance_recommendation":
      "pilot" | "scale" | "monitor" | "avoid"
}}
"""
                }
            ],

            response_format={
                "type": "json_object"
            }

        )

        content = (
            response
            .choices[0]
            .message
            .content
        )

        print(
            "========== AI RESPONSE =========="
        )

        print(content)

        print(
            "================================="
        )

        result = json.loads(content)

        required_fields = [

            "reliable_infrastructure",
            "safe_city",
            "transportation_network",
            "community_wellbeing",
            "balanced_growth",
            "trusted_governance",

            "summary",
            "technology_summary",
            "calgary_problem",
            "global_examples",
            "implementation_statistics",
            "governance_recommendation"
        ]

        missing = [

            field
            for field in required_fields
            if field not in result

        ]

        if missing:

            raise Exception(
                f"Missing fields: {missing}"
            )

        return result

    except Exception as e:

        print(
            "========== AI ERROR =========="
        )

        print(e)

        print(
            "=============================="
        )

        return {

            "error": str(e),

            "reliable_infrastructure": None,
            "safe_city": None,
            "transportation_network": None,
            "community_wellbeing": None,
            "balanced_growth": None,
            "trusted_governance": None,

            "summary":
                f"AI evaluation failed: {e}",

            "technology_summary": "",
            "calgary_problem": "",
            "global_examples": "",
            "implementation_statistics": "",
            "governance_recommendation":
                "monitor"
        }
