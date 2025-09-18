// Service Worker for offline support
const CACHE_NAME = 'ayurtrace-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/app.js',
    '/login.html',
    '/product-details.html',
    '/processor-dashboard.html',
    '/lab-dashboard.html',
    '/manufacturer-dashboard.html',
    '/regulator-dashboard.html',
    '/reports.html',
    '/manifest.json'
];

// Install event - cache resources
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Return cached version or fetch from network
                if (response) {
                    return response;
                }
                return fetch(event.request);
            }
        )
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Background sync for offline data
self.addEventListener('sync', event => {
    if (event.tag === 'background-sync') {
        event.waitUntil(syncOfflineData());
    }
});

async function syncOfflineData() {
    try {
        // Get offline data from IndexedDB or localStorage
        const offlineData = await getStoredOfflineData();
        
        for (const data of offlineData) {
            if (!data.synced) {
                // Attempt to sync with blockchain
                await syncToBlockchain(data);
                data.synced = true;
            }
        }
        
        // Update stored data
        await updateStoredOfflineData(offlineData);
        
        console.log('Offline data synced successfully');
    } catch (error) {
        console.error('Failed to sync offline data:', error);
    }
}

async function getStoredOfflineData() {
    // In a real implementation, this would use IndexedDB
    return [];
}

async function updateStoredOfflineData(data) {
    // In a real implementation, this would update IndexedDB
    console.log('Updated offline data:', data);
}

async function syncToBlockchain(data) {
    // Simulate blockchain sync
    const response = await fetch('/api/blockchain/sync', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    
    if (!response.ok) {
        throw new Error('Failed to sync to blockchain');
    }
    
    return response.json();
}

// Push notifications for important updates
self.addEventListener('push', event => {
    const options = {
        body: event.data ? event.data.text() : 'New update available',
        icon: '/icon-192x192.png',
        badge: '/badge-72x72.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'View Details',
                icon: '/icon-explore.png'
            },
            {
                action: 'close',
                title: 'Close',
                icon: '/icon-close.png'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification('AyurTrace Update', options)
    );
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
    event.notification.close();
    
    if (event.action === 'explore') {
        // Open the app
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// Message handling for communication with main thread
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

// Periodic background sync for data updates
self.addEventListener('periodicsync', event => {
    if (event.tag === 'content-sync') {
        event.waitUntil(updateContent());
    }
});

async function updateContent() {
    try {
        // Fetch latest blockchain data
        const response = await fetch('/api/blockchain/latest');
        const data = await response.json();
        
        // Update cache with new data
        const cache = await caches.open(CACHE_NAME);
        await cache.put('/api/blockchain/latest', new Response(JSON.stringify(data)));
        
        console.log('Content updated in background');
    } catch (error) {
        console.error('Failed to update content:', error);
    }
}