const processInstructors = (section) => {
	if (
		!section ||
    !section.innerText ||
    // first row of the table, not containing instructor info
    section.innerText === 'Instructor'
	)
		return;

	const instructors = Array.from(section.querySelectorAll('a.email')).map(
		(instructor) => {
			return instructor.textContent.replace(/\(.*?\)/, '');
		}
	);

	console.log(instructors);
};

module.exports = processInstructors;
