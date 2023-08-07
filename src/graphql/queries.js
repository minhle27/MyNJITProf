const GET_PROFESSOR = `
query TeacherRatingsPageQuery($id: ID!) {
    node(id: $id) {
        ... on Teacher {
            id
            legacyId
            firstName
            lastName
            department
            numRatings
            avgRating
            wouldTakeAgainPercent
            avgDifficulty
            ratings(first: 20) {
                edges {
					node {
						comment
					}
				}
            }
        }
    }
}
`;

const GET_PROFESSOR_ID = `
query TeacherSearchResultsPageQuery($query: TeacherSearchQuery!) {
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
