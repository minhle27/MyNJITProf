import school_id from '../constants/school_id';
import token from '../constants/token';
import queries from '../graphql/queries';
import API_URL from '../constants/endpoint';

// if id already in storage, retrieve id from here, else fetch
const IdStorage = new Map();

const sendRequestToAPI = async (variables) => {
	const res = await fetch(API_URL, {
		method: 'POST',
		headers: {
			Authorization: token,
		},
		body: JSON.stringify({
			query: queries.GET_PROFESSOR_ID,
			variables: {
				query: { text: variables.name, schoolID: school_id }
			},
		}),
	});

	if (!res.ok) throw new Error('Fetching ID failed');

	const jsonResponse = await res.json();
	const resultLength = jsonResponse.data?.newSearch?.teachers?.edges.length;
	if (resultLength == 0) return null;
	const id = jsonResponse.data?.newSearch?.teachers?.edges[0].node.id;
	return id;
};

const getIdFromName = async (name, sendResponse) => {
	if (!IdStorage.has(name)) {
		// fetch id
		try {
			const id = await sendRequestToAPI({ name });
			IdStorage.set(name, id);
		} catch (error) {
			sendResponse(new Error(error));
		} 
	}
	const id = IdStorage.get(name);
	sendResponse(id);
};

export default getIdFromName;