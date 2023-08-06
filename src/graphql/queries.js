const GET_PROFESSOR = `
query ($id: ID!) {
    node(id: $id) {
        ... on Teacher {
            id
            department
            legacyId
            firstName
            lastName
            avgRating
            numRatings
            avgDifficulty
            wouldTakeAgainPercent
        }
    }
}
`;

const GET_PROFESSOR_ID = `
query ($query: TeacherSearchQuery!) {
    newSearch {
        teachers(query: $query) {
            edges {
                node {
                	id
                }
            }
        }
    }
}
`;

module.exports = { GET_PROFESSOR, GET_PROFESSOR_ID };
