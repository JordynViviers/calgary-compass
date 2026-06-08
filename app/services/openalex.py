import requests


def search_openalex(
    query: str,
    limit: int = 10
):

    response = requests.get(
        "https://api.openalex.org/works",
        params={
            "search": query,
            "per-page": limit
        },
        timeout=30
    )

    response.raise_for_status()

    return response.json()["results"]

