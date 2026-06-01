from openai import OpenAI
from dotenv import load_dotenv

import os
import json
import requests

load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)


# -----------------------------
# STEP 1: OPENALEX SEARCH
# -----------------------------
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

        data = response.json().get("results", [])

        context = ""

        for paper in data:

            title = paper.get("title", "No title")
            abstract = paper.get("abstract", None)

            # OpenAlex sometimes does NOT return abstracts in search results
            # so we safely handle missing data
            context += f"""
Title: {title}
Abstract: {abstract if abstract else "Not available"}

---
"""

        return context

    except Exception as e:
        print("OPENALEX ERROR:", str(e))
        return "No research context available."


# -----------------------------
# STEP 2: MAIN FUNCTION
# -----------------------------
def evaluate_technology(
    technology_name,
    technology_description
):

    try:

        # Build research query (this is your RAG step)
        research_context = search_openalex(
            f"{technology_name} smart city urban technology governance"
        )

        # -----------------------------
        # STEP 3: CALL OPENAI WITH RAG CONTEXT
        # -----------------------------
        response = client.chat.completions.create(

            model="gpt-4.1-mini",

            messages=[

                {
                    "role": "system",
                    "content": """

You are a smart city governance analyst.

You MUST use the provided academic research context when available.

Do NOT invent research findings.

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

-------------------------
ACADEMIC RESEARCH (OpenAlex)
-------------------------
{research_context}

-------------------------
CATEGORIES
-------------------------
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

        print("OPENAI ERROR:")
        print(str(e))

        return {
            "financial_sustainability": 5,
            "operational_excellence": 5,
            "people_culture": 5,
            "trusted_governance": 5,
            "innovation_agility": 5,
            "summary": f"AI evaluation failed: {str(e)}"
        }
