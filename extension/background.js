// The background script runs all the time and serves as a central message hub.

const connections = {};

chrome.runtime.onConnect.addListener((port) => {
    const data = JSON.parse(port.name);
    let tabId = null;

    console.log(port);

    if (data.type === 'devtools-tab') {
        tabId = data.tabId;
        connections[tabId] = {};
        connections[tabId]['devtools-tab'] = port;
        installProxy(tabId);
    }

    if (data.type === 'page') {
        tabId = port.sender.tab.id;
        connections[tabId]['page'] = port;
    }

    if (connections[tabId]['devtools-tab'] && connections[tabId]['page']) {
        const devtoolsTab = connections[tabId]['devtools-tab'];
        const page = connections[tabId]['page'];
        doublePipe(tabId, devtoolsTab, page);
    }
});

function installProxy(tabId) {
    chrome.tabs.executeScript(
        tabId,
        {
            file: 'utils/proxy.js',
        },
        function (res) {
            if (!res) {
                ports[tabId].devtools.postMessage('proxy-fail');
            } else {
                console.log('injected proxy to tab ' + tabId);
            }
        }
    );
}

function doublePipe(tabId, devtoolsTab, page) {
    // devtools-tab -> page
    function devtoolsTabMessageHandler(message) {
        page.postMessage(message);
    }
    devtoolsTab.onMessage.addListener(devtoolsTabMessageHandler);

    // page -> devtools-tab
    function pageMessageHandler(message) {
        devtoolsTab.postMessage(message);
    }
    page.onMessage.addListener(pageMessageHandler);

    function shutdown() {
        devtoolsTab.onMessage.removeListener(devtoolsTabMessageHandler);
        devtoolsTab.disconnect();

        page.onMessage.removeListener(pageMessageHandler);
        page.disconnect();

        connections[tabId] = null;
        console.log(`tab ${tabId} disconnected.`);
    }

    devtoolsTab.onDisconnect.addListener(shutdown);
    page.onDisconnect.addListener(shutdown);

    console.log(`tab ${tabId} connected.`);
}
