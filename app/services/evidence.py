def collect_evidence(
    technology_name
):
    papers = search_openalex(
        technology_name
    )

    patents = search_patents(
        technology_name
    )

    return {
        "papers": papers,
        "patents": patents
    }
