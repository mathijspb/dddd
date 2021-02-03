let dddd;

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
        if (e.action === 'setup') {
            const model = e.layoutModel;
            dddd.createLayoutFromModel(model, () => {
                port.postMessage({
                    action: 'setup-complete',
                });
            });
        }
    });
}

window.chrome.devtools.network.onNavigated.addListener(() => {
    connect();
});

connect();
