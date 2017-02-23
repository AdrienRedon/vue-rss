if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/cache-sw.js').then(registration => {
            console.log('[serviceWorker]: registration successful with scope: ', registration.scope);
        }).catch(err => {
            console.log('[serviceWorker] registration failed', err);
        });
    });
}