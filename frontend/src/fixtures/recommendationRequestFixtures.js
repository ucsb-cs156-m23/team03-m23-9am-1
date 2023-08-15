const recommendationRequestFixtures = {
    oneRR: {
        "id": 1,
        "requesterEmail": "adhit10@ucsb.edu",
        "professorEmail": "phtcon10@ucsb.edu",
        "explanation": "Recommendations are cool 10",
        "dateRequested": "2022-10-03T00:00:00",
        "dateNeeded": "2022-10-05T00:00:00",
        "done": "yes"
    },
    threeRRs: [
        {
            "id": 1,
            "requesterEmail": "adhit1@ucsb.edu",
            "professorEmail": "phtcon1@ucsb.edu",
            "explanation": "Recommendations are cool 1",
            "dateRequested": "2022-01-03T00:00:00",
            "dateNeeded": "2022-01-05T00:00:00",
            "done": "no"
        },
        {
            "id": 2,
            "requesterEmail": "adhit2@ucsb.edu",
            "professorEmail": "phtcon2@ucsb.edu",
            "explanation": "Recommendations are cool 2",
            "dateRequested": "2022-02-03T00:00:00",
            "dateNeeded": "2022-02-05T00:00:00",
            "done": "yes"
        },
        {
            "id": 3,
            "requesterEmail": "adhit3@ucsb.edu",
            "professorEmail": "phtcon3@ucsb.edu",
            "explanation": "Recommendations are cool 3",
            "dateRequested": "2022-03-03T00:00:00",
            "dateNeeded": "2022-03-05T00:00:00",
            "done": "no"
        },
    ]
};


export { recommendationRequestFixtures };