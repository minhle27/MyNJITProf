const manipulate = () => {
	console.log('TODO');
};

const main = () => {
	const callback = (mutationList, observer) => {
		const target = document.getElementsByClassName('results-out-of');
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
