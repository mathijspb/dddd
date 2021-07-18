let dddd;
let isSetup = false;

function connect() {
    if (dddd) {
        dddd.destroy();
    }

    dddd = new window.DDDD({
        devtools: true,
        onChange: (modelData) => {
            port.postMessage({
                action: 'change',
                modelData,
            });
        },
    });

    const port = window.chrome.runtime.connect({
        name: JSON.stringify({
            type: 'devtools-tab',
            tabId: window.chrome.devtools.inspectedWindow.tabId,
        }),
    });

    port.onMessage.addListener((e) => {
        if (e.action === 'setup' && !isSetup) {
            isSetup = true;
            const model = e.layoutModel;
            dddd.createLayoutFromModel(model, () => {
                port.postMessage({
                    action: 'setup-complete',
                });
            });
        }
    });
}

// NOTE: Resfreshes devtools on tab reload
window.chrome.devtools.network.onNavigated.addListener(() => {
    connect();
});

connect();
