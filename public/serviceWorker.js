// git commit -m ""
// git push

const CACHE_NAME = "version-1";
const urlsToCache = ['index.html', 'offline.html'];

// install sw
this.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            console.log("Cache opened")
            return cache.addAll(urlsToCache);
        })
    )
})

//listen for requests
this.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
        .then(() => {
            return fetch(event.request)
            .catch(() => caches.match('offline.html'))
            // match every request while internet is connected, show offline.html while disconnected
        })
    )
})

// Activate the SW
this.addEventListener('activate', event => {
    const cacheWhiteList = [];
    cacheWhiteList.push(CACHE_NAME);

    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map(cacheName => {
                if(!cacheWhiteList.includes(cacheName)){
         // if the cacheWhiteList does not include cacheName then delete the specific cacheName, else we want to keep it
        // then in our case when we change something, it will keep only version-1, and it will delete all previous versions, and always keep whitelist version
                    return caches.delete(cacheName)
                }
            })
        ))
    )
})