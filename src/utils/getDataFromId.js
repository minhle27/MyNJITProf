import token from '../constants/token';
import queries from '../graphql/queries';
import API_URL from '../constants/endpoint';

// if data already in storage, retrieve data from here, else fetch
const ProfDataStorage = new Map();

const sendRequestToAPI = async (variables) => {
	const res = await fetch(API_URL, {
		method: 'POST',
		headers: {
			Authorization: token,
		},
		body: JSON.stringify({
			query: queries.GET_PROFESSOR,
			variables: {
				id: variables.id
			},
		}),
	});

	if (!res.ok) throw new Error('Fetching prof data failed');

	const jsonResponse = await res.json();
	return jsonResponse.data?.node;
};

const getDataFromId = async (id, sendResponse) => {
	if (!ProfDataStorage.has(id)) {
		// fetch data
		try {
			const data = await sendRequestToAPI({ id });
			data.comments = data.ratings.edges.map(each => each.node.comment);
			delete data.ratings;
			ProfDataStorage.set(id, data);
		} catch (error) {
			sendResponse(new Error(error));
		} 
	}
	const data = ProfDataStorage.get(id);
	sendResponse(data);
};

export default getDataFromId;