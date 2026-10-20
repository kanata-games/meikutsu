const VERSION='meikutsu-v1.4.0';
const ASSETS=['./','./index.html','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png','./icons/maskable-192.png','./icons/maskable-512.png','./icons/apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(VERSION).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith('meikutsu-')&&k!==VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
 if(r.mode==='navigate'){e.respondWith(fetch(r).then(res=>{const c=res.clone();caches.open(VERSION).then(k=>k.put('./index.html',c));return res}).catch(()=>caches.match('./index.html',{ignoreSearch:true})));return}
 e.respondWith(caches.match(r,{ignoreSearch:true}).then(h=>h||fetch(r).then(res=>{if(res.ok){const c=res.clone();caches.open(VERSION).then(k=>k.put(r,c))}return res})))});
