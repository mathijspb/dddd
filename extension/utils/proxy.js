// This is a content-script that is injected only when the devtools are activated.

function removeEventListeners() {
    window.removeEventListener('message', this._windowMessageHandler);
}

function connect() {
    const port = window.chrome.runtime.connect({
        name: JSON.stringify({
            type: 'page',
        }),
    });
    return port;
}

function sendMessageToPage(message) {
    window.postMessage(
        {
            source: 'dddd-devtools-proxy',
            payload: message,
        },
        '*',
    );
}

function sendMessageToDevtoolsTab(message) {
    window.port.postMessage(message);
}

function portMessageHandler(message) {
    sendMessageToPage(message);
}

function portDisconnectHandler() {
    removeEventListeners();
    sendMessageToPage('shutdown');
}

function windowMessageHandler(e) {
    if (e.data && e.data.source === 'dddd-page') {
        sendMessageToDevtoolsTab(e.data.payload);
    }
}

window.port = connect();
window.port.onMessage.addListener(portMessageHandler);
window.port.onDisconnect.addListener(portDisconnectHandler);
window.addEventListener('message', windowMessageHandler);
sendMessageToPage({ action: 'init' });
