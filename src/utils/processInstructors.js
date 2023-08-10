import sendMessage from './sendMessagetoBackground';

const defaultProfObj = {
	id: null,
	legacyId: -1,
	firstName: 'None',
	lastName: 'None',
	department: 'None',
	numRatings: -1,
	avgRating: -1,
	wouldTakeAgainPercent: -1,
	avgDifficulty: -1,
	comments: [],
};

// send message to background to fetch
const fetchInstructorData = async (name) => {
	if (!name) {
		throw new Error('Name is undefined');
	}

	const id = await fetchIdFromName(name);
	if (!id) return defaultProfObj;
	const data = await fetchDataFromId(id);
	if (Object.keys(data).length === 0 || data.numRatings === 0)
		return defaultProfObj;

	// extract comments from ratings field
	return data;
};

const fetchIdFromName = async (name) => {
	try {
		const res = await sendMessage({
			queryType: 'getIdFromName',
			name: name,
		});
		return res;
	} catch (error) {
		console.log('Error when fetching id: ', error);
		return null;
	}
};

const fetchDataFromId = async (id) => {
	try {
		const res = await sendMessage({
			queryType: 'getDataFromId',
			id: id,
		});
		return res;
	} catch (error) {
		console.log('Error when fetching data from id ', error);
		return null;
	}
};

const processInstructors = async (section, index) => {
	if (
		!section ||
    !section.innerText ||
    // first row of the table, not containing instructor info
    section.innerText === 'Instructor'
	)
		return;

	const instructorElements = Array.from(section.querySelectorAll('a.email'));

	const instructors = await Promise.all(
		instructorElements.map(async (instructor) => {
			const name = instructor.textContent.replace(/\(.*?\)/, '');

			// this is possible if the section has no instructor information
			if (!name) return null;

			const instructorData = await fetchInstructorData(name);

			const isPrimary =
        instructor.nextSibling &&
        instructor.nextSibling.nodeType === 3 &&
        instructor.nextSibling.textContent &&
        instructor.nextSibling.textContent.includes('(Primary)');

			return {
				name: name,
				rating: parseFloat(instructorData.avgRating).toFixed(1),
				isPrimary,
				index,
				difficulty: parseFloat(instructorData.avgDifficulty).toFixed(1),
				department: instructorData.department,
				legacyId: instructorData.legacyId,
				email: instructor.getAttribute('href').replace('mailto:', ''),
				numRatings: instructorData.numRatings,
				wouldTakeAgainPercent: instructorData.wouldTakeAgainPercent,
			};

		})
	);

	// replace current section's instructors by the new data
	// const newCell = document.createElement('div');
	// newCell.classList.add('profwithrating');
	// newCell.innerHTML = '<p>Hello</p>';
	// if (section.parentNode) {
	// 	section.parentNode.replaceChild(newCell, section);
	// }
};

export default processInstructors;
