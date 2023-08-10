// Use background to send request to API
// https://stackoverflow.com/questions/58113581/how-can-i-use-google-api-in-chrome-extension-content-script
// To send a response to content script asynchronously: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onMessage

import getDataFromId from './src/utils/getDataFromId';
import getIdFromName from './src/utils/getIdFromName';

const handleMessage = (message, sender, sendResponse) => {
	if (message.queryType === 'getIdFromName') {
		getIdFromName(message.name, sendResponse);
		return true; // Indicates that the response will be sent asynchronously
	}
	else if (message.queryType === 'getDataFromId') {
		getDataFromId(message.id, sendResponse);
		return true;
	}
	return true;
};

// eslint-disable-next-line no-undef
chrome.runtime.onMessage.addListener(handleMessage);