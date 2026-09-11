import {defineConfig} from 'vite';
import {readFileSync,readdirSync,writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
export default defineConfig({
  build:{rollupOptions:{output:{manualChunks:{engine:['three']}}}},
  plugins:[{name:'offline-game',closeBundle(){
    const files=['/','/index.html','/manifest.webmanifest','/icon.svg','/icon-192.png','/icon-512.png',...readdirSync('dist/assets').map(f=>'/assets/'+f)];
    const hash=createHash('sha256').update(files.join('|')+readFileSync('dist/index.html')).digest('hex').slice(0,12);
    writeFileSync('dist/sw.js',`const CACHE='valley-run-${hash}';const FILES=${JSON.stringify(files)};self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)));});self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('valley-run-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==self.location.origin)return;e.respondWith(caches.match(e.request,{ignoreVary:true}).then(hit=>hit||fetch(e.request).catch(()=>e.request.mode==='navigate'?caches.match('/index.html'):Response.error())));});`);
  }}]
});
