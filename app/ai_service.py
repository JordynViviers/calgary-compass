from openai import OpenAI
from dotenv import load_dotenv

import os
import json

load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)

def evaluate_technology(
    technology_name,
    technology_description
):

    try:

        response = client.chat.completions.create(

            model="gpt-4.1-mini",

            messages=[

                {
                    "role": "system",
                    "content": """

                    You are a smart city governance analyst.

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

                    Categories:
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