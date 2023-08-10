const sendMessage = (message) => {
	return new Promise((resolve) => {
		// eslint-disable-next-line no-undef
		chrome.runtime.sendMessage(message, (res) => {
			resolve(res);
		});
	});
};

export default sendMessage;