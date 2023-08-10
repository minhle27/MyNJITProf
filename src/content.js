import processInstructors from './utils/processInstructors';

const manipulate = () => {
	// Adjusting the instructor column to fit rating information
	const thElement = document.querySelector('.instructor-col');
	if (thElement) thElement.style.width = '300px';

	// eslint-disable-next-line no-unused-vars
	const callback = (mutationList, observer) => {
		// only execute the call back if changes in the DOM have effect on instructor column
		// if (document.getElementsByClassName('profwithrating')) return;

		const sections = Array.from(document.querySelectorAll('[data-property*="instructor"]'));
		// process instructors of each section
		sections.forEach(processInstructors);
	};

	const config = { subtree: true, attributes: true };
	const observer = new MutationObserver(callback);
	observer.observe(document, config);
};

// Listen for changes in DOM
const main = () => {
	const callback = (mutationList, observer) => {
		const target = document.getElementsByClassName('results-out-of');
		// If user at correct content, start manipulating the DOM
		if (target.length > 0) {
			observer.disconnect();
			manipulate();
		}
	};

	const config = { childList: true, subtree: true };
	const observer = new MutationObserver(callback);
	observer.observe(document.body, config);
};

window.addEventListener('load', main);
