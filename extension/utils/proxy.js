// This is a content-script that is injected only when the devtools are activated. 

class Proxy {
    constructor() {
        this._port = this._connect();
        this._bindHandlers();
        this._setupEventListeners();
        this._sendMessageToPage({ action: 'init' });
    }

    /**
     * Private
     */
    _bindHandlers() {
        this._portMessageHandler = this._portMessageHandler.bind(this);
        this._portDisconnectHandler = this._portDisconnectHandler.bind(this);
        this._windowMessageHandler = this._windowMessageHandler.bind(this);
    }

    _setupEventListeners() {
        this._port.onMessage.addListener(this._portMessageHandler);
        this._port.onDisconnect.addListener(this._portDisconnectHandler);
        window.addEventListener('message', this._windowMessageHandler);
    }

    _removeEventListeners() {
        window.removeEventListener('message', this._windowMessageHandler);
    }

    _connect() {
        const port = chrome.runtime.connect({
            name: JSON.stringify({
                type: 'page'
            })
        });
        return port;
    }

    _sendMessageToPage(message) {
        window.postMessage(
            {
                source: 'dddd-devtools-proxy',
                payload: message,
            },
            '*'
        );
    }

    _sendMessageToDevtoolsTab(message) {
        this._port.postMessage(message);
    }

    /**
     * Handlers
     */
    _portMessageHandler(message) {
        this._sendMessageToPage(message);
    }
    
    _portDisconnectHandler() {
        this._removeEventListeners();
        this._sendMessageToPage('shutdown');
    }
    
    _windowMessageHandler(e) {
        if (e.data && e.data.source === 'dddd-page') {
            this._sendMessageToDevtoolsTab(e.data.payload);
        }
    }
}

new Proxy();