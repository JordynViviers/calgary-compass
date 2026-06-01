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
# 1. OPENALEX RETRIEVAL
# =====================================================
def search_openalex(query: str):

    try:
        response = requests.get(
            "https://api.openalex.org/works",
            params={
                "search": query,
                "per-page": 5
            },
            timeout=10
        )

        results = response.json().get("results", [])

        papers = []

        for p in results:
            papers.append({
                "title": p.get("title"),
                "abstract": p.get("abstract"),
                "source": "OpenAlex"
            })

        return papers

    except Exception as e:
        print("OPENALEX ERROR:", str(e))
        return []


# =====================================================
# 2. SEMANTIC SCHOLAR RETRIEVAL
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

        papers = []

        for p in data:
            papers.append({
                "title": p.get("title"),
                "abstract": p.get("abstract"),
                "year": p.get("year"),
                "citations": p.get("citationCount"),
                "source": "Semantic Scholar"
            })

        return papers

    except Exception as e:
        print("SEMANTIC SCHOLAR ERROR:", str(e))
        return []


# =====================================================
# 3. MERGE + CLEAN CONTEXT
# =====================================================
def build_research_context(openalex_papers, semantic_papers):

    all_papers = openalex_papers + semantic_papers

    # Remove papers with no useful content
    filtered = [
        p for p in all_papers
        if p.get("title") and p.get("abstract")
    ]

    context = ""

    for i, p in enumerate(filtered[:10], start=1):

        context += f"""
[{i}] Title: {p['title']}
Source: {p.get('source')}
Abstract: {p.get('abstract')}
---

"""

    return context


# =====================================================
# 4. MAIN FUNCTION (UPDATED RAG PIPELINE)
# =====================================================
def evaluate_technology(
    technology_name,
    technology_description
):

    try:

        # -----------------------------
        # STEP 1: RETRIEVE FROM BOTH SOURCES
        # -----------------------------
        query = f"{technology_name} smart city urban governance"

        openalex_papers = search_openalex(query)
        semantic_papers = search_semantic_scholar(query)

        # -----------------------------
        # STEP 2: BUILD CONTEXT
        # -----------------------------
        research_context = build_research_context(
            openalex_papers,
            semantic_papers
        )

        # -----------------------------
        # STEP 3: SEND TO GPT
        # -----------------------------
        response = client.chat.completions.create(

            model="gpt-4.1-mini",

            messages=[

                {
                    "role": "system",
                    "content": """

You are a smart city governance analyst.

You must use the provided academic research context.

If evidence is missing, say so in the summary reasoning.

Return ONLY valid JSON.

"""
                },

                {
                    "role": "user",
                    "content": f"""

Evaluate this technology from 1-10:

Technology:
{technology_name}

Description:
{technology_description}

=========================
ACADEMIC RESEARCH CONTEXT
=========================
{research_context}

=========================
CATEGORIES
=========================
- financial_sustainability
- operational_excellence
- people_culture
- trusted_governance
- innovation_agility

Return JSON like:

{{
    "financial_sustainability": 7,
    "operational_excellence": 8,
    "people_culture": 6,
    "trusted_governance": 5,
    "innovation_agility": 9,
    "summary": "..."
}}

"""
                }
            ],

            response_format={
                "type": "json_object"
            }
        )

        content = response.choices[0].message.content

        print("RAW OPENAI RESPONSE:")
        print(content)

        return json.loads(content)

    except Exception as e:

        print("ERROR:", str(e))

        return {
            "financial_sustainability": 5,
            "operational_excellence": 5,
            "people_culture": 5,
            "trusted_governance": 5,
            "innovation_agility": 5,
            "summary": f"AI evaluation failed: {str(e)}"
        }
