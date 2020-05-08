!function(e){var t={};function s(n){if(t[n])return t[n].exports;var a=t[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,s),a.l=!0,a.exports}s.m=e,s.c=t,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)s.d(n,a,function(t){return e[t]}.bind(null,a));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/",s(s.s=6)}([function(e,t,s){"use strict";try{self["workbox:core:5.1.3"]&&_()}catch(e){}},function(e,t,s){"use strict";try{self["workbox:precaching:5.1.3"]&&_()}catch(e){}},function(e,t,s){"use strict";try{self["workbox:routing:5.1.3"]&&_()}catch(e){}},function(e,t,s){"use strict";try{self["workbox:strategies:5.1.3"]&&_()}catch(e){}},function(e,t,s){"use strict";try{self["workbox:expiration:5.1.3"]&&_()}catch(e){}},function(e,t,s){"use strict";try{self["workbox:cacheable-response:5.1.3"]&&_()}catch(e){}},function(e,t,s){"use strict";s.r(t);s(0);const n=(e,...t)=>{let s=e;return t.length>0&&(s+=" :: "+JSON.stringify(t)),s};class a extends Error{constructor(e,t){super(n(e,t)),this.name=e,this.details=t}}const i=new Set;const r={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},c=e=>[r.prefix,e,r.suffix].filter(e=>e&&e.length>0).join("-"),o=e=>e||c(r.precache),h=e=>e||c(r.runtime);const u=e=>new URL(String(e),location.href).href.replace(new RegExp("^"+location.origin),""),l=(e,t)=>e.filter(e=>t in e),p=async({request:e,mode:t,plugins:s=[]})=>{const n=l(s,"cacheKeyWillBeUsed");let a=e;for(const e of n)a=await e.cacheKeyWillBeUsed.call(e,{mode:t,request:a}),"string"==typeof a&&(a=new Request(a));return a},d=async({cacheName:e,request:t,event:s,matchOptions:n,plugins:a=[]})=>{const i=await self.caches.open(e),r=await p({plugins:a,request:t,mode:"read"});let c=await i.match(r,n);for(const t of a)if("cachedResponseWillBeUsed"in t){const a=t.cachedResponseWillBeUsed;c=await a.call(t,{cacheName:e,event:s,matchOptions:n,cachedResponse:c,request:r})}return c},f=async({cacheName:e,request:t,response:s,event:n,plugins:r=[],matchOptions:c})=>{const o=await p({plugins:r,request:t,mode:"write"});if(!s)throw new a("cache-put-with-no-response",{url:u(o.url)});const h=await(async({request:e,response:t,event:s,plugins:n=[]})=>{let a=t,i=!1;for(const t of n)if("cacheWillUpdate"in t){i=!0;const n=t.cacheWillUpdate;if(a=await n.call(t,{request:e,response:a,event:s}),!a)break}return i||(a=a&&200===a.status?a:void 0),a||null})({event:n,plugins:r,response:s,request:o});if(!h)return void 0;const f=await self.caches.open(e),g=l(r,"cacheDidUpdate"),m=g.length>0?await d({cacheName:e,matchOptions:c,request:o}):null;try{await f.put(o,h)}catch(e){throw"QuotaExceededError"===e.name&&await async function(){for(const e of i)await e()}(),e}for(const t of g)await t.cacheDidUpdate.call(t,{cacheName:e,event:n,oldResponse:m,newResponse:h,request:o})},g=d;let m;function w(e){e.then(()=>{})}class _{constructor(e,t,{onupgradeneeded:s,onversionchange:n}={}){this._db=null,this._name=e,this._version=t,this._onupgradeneeded=s,this._onversionchange=n||(()=>this.close())}get db(){return this._db}async open(){if(!this._db)return this._db=await new Promise((e,t)=>{let s=!1;setTimeout(()=>{s=!0,t(new Error("The open request was blocked and timed out"))},this.OPEN_TIMEOUT);const n=indexedDB.open(this._name,this._version);n.onerror=()=>t(n.error),n.onupgradeneeded=e=>{s?(n.transaction.abort(),n.result.close()):"function"==typeof this._onupgradeneeded&&this._onupgradeneeded(e)},n.onsuccess=()=>{const t=n.result;s?t.close():(t.onversionchange=this._onversionchange.bind(this),e(t))}}),this}async getKey(e,t){return(await this.getAllKeys(e,t,1))[0]}async getAll(e,t,s){return await this.getAllMatching(e,{query:t,count:s})}async getAllKeys(e,t,s){return(await this.getAllMatching(e,{query:t,count:s,includeKeys:!0})).map(e=>e.key)}async getAllMatching(e,{index:t,query:s=null,direction:n="next",count:a,includeKeys:i=!1}={}){return await this.transaction([e],"readonly",(r,c)=>{const o=r.objectStore(e),h=t?o.index(t):o,u=[],l=h.openCursor(s,n);l.onsuccess=()=>{const e=l.result;e?(u.push(i?e:e.value),a&&u.length>=a?c(u):e.continue()):c(u)}})}async transaction(e,t,s){return await this.open(),await new Promise((n,a)=>{const i=this._db.transaction(e,t);i.onabort=()=>a(i.error),i.oncomplete=()=>n(),s(i,e=>n(e))})}async _call(e,t,s,...n){return await this.transaction([t],s,(s,a)=>{const i=s.objectStore(t),r=i[e].apply(i,n);r.onsuccess=()=>a(r.result)})}close(){this._db&&(this._db.close(),this._db=null)}}_.prototype.OPEN_TIMEOUT=2e3;const y={readonly:["get","count","getKey","getAll","getAllKeys"],readwrite:["add","put","clear","delete"]};for(const[e,t]of Object.entries(y))for(const s of t)s in IDBObjectStore.prototype&&(_.prototype[s]=async function(t,...n){return await this._call(s,t,e,...n)});const v=async({request:e,fetchOptions:t,event:s,plugins:n=[]})=>{if("string"==typeof e&&(e=new Request(e)),s instanceof FetchEvent&&s.preloadResponse){const e=await s.preloadResponse;if(e)return e}const i=l(n,"fetchDidFail"),r=i.length>0?e.clone():null;try{for(const t of n)if("requestWillFetch"in t){const n=t.requestWillFetch,a=e.clone();e=await n.call(t,{request:a,event:s})}}catch(e){throw new a("plugin-error-request-will-fetch",{thrownError:e})}const c=e.clone();try{let a;a="navigate"===e.mode?await fetch(e):await fetch(e,t);for(const e of n)"fetchDidSucceed"in e&&(a=await e.fetchDidSucceed.call(e,{event:s,request:c,response:a}));return a}catch(e){0;for(const t of i)await t.fetchDidFail.call(t,{error:e,event:s,originalRequest:r.clone(),request:c.clone()});throw e}};async function x(e,t){const s=e.clone(),n={headers:new Headers(s.headers),status:s.status,statusText:s.statusText},a=t?t(n):n,i=function(){if(void 0===m){const e=new Response("");if("body"in e)try{new Response(e.body),m=!0}catch(e){m=!1}m=!1}return m}()?s.body:await s.blob();return new Response(i,a)}s(1);const q=[],R={get:()=>q,add(e){q.push(...e)}};function b(e){if(!e)throw new a("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:t,url:s}=e;if(!s)throw new a("add-to-cache-list-unexpected-type",{entry:e});if(!t){const e=new URL(s,location.href);return{cacheKey:e.href,url:e.href}}const n=new URL(s,location.href),i=new URL(s,location.href);return n.searchParams.set("__WB_REVISION__",t),{cacheKey:n.href,url:i.href}}class N{constructor(e){this._cacheName=o(e),this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map}addToCacheList(e){const t=[];for(const s of e){"string"==typeof s?t.push(s):s&&void 0===s.revision&&t.push(s.url);const{cacheKey:e,url:n}=b(s),i="string"!=typeof s&&s.revision?"reload":"default";if(this._urlsToCacheKeys.has(n)&&this._urlsToCacheKeys.get(n)!==e)throw new a("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(n),secondEntry:e});if("string"!=typeof s&&s.integrity){if(this._cacheKeysToIntegrities.has(e)&&this._cacheKeysToIntegrities.get(e)!==s.integrity)throw new a("add-to-cache-list-conflicting-integrities",{url:n});this._cacheKeysToIntegrities.set(e,s.integrity)}if(this._urlsToCacheKeys.set(n,e),this._urlsToCacheModes.set(n,i),t.length>0){const e=`Workbox is precaching URLs without revision info: ${t.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}async install({event:e,plugins:t}={}){const s=[],n=[],a=await self.caches.open(this._cacheName),i=await a.keys(),r=new Set(i.map(e=>e.url));for(const[e,t]of this._urlsToCacheKeys)r.has(t)?n.push(e):s.push({cacheKey:t,url:e});const c=s.map(({cacheKey:s,url:n})=>{const a=this._cacheKeysToIntegrities.get(s),i=this._urlsToCacheModes.get(n);return this._addURLToCache({cacheKey:s,cacheMode:i,event:e,integrity:a,plugins:t,url:n})});return await Promise.all(c),{updatedURLs:s.map(e=>e.url),notUpdatedURLs:n}}async activate(){const e=await self.caches.open(this._cacheName),t=await e.keys(),s=new Set(this._urlsToCacheKeys.values()),n=[];for(const a of t)s.has(a.url)||(await e.delete(a),n.push(a.url));return{deletedURLs:n}}async _addURLToCache({cacheKey:e,url:t,cacheMode:s,event:n,plugins:i,integrity:r}){const c=new Request(t,{integrity:r,cache:s,credentials:"same-origin"});let o,h=await v({event:n,plugins:i,request:c});for(const e of i||[])"cacheWillUpdate"in e&&(o=e);if(!(o?await o.cacheWillUpdate({event:n,request:c,response:h}):h.status<400))throw new a("bad-precaching-response",{url:t,status:h.status});h.redirected&&(h=await x(h)),await f({event:n,plugins:i,response:h,request:e===t?c:new Request(e),cacheName:this._cacheName,matchOptions:{ignoreSearch:!0}})}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s){return(await self.caches.open(this._cacheName)).match(s)}}createHandler(e=!0){return async({request:t})=>{try{const e=await this.matchPrecache(t);if(e)return e;throw new a("missing-precache-entry",{cacheName:this._cacheName,url:t instanceof Request?t.url:t})}catch(s){if(e)return fetch(t);throw s}}}createHandlerBoundToURL(e,t=!0){if(!this.getCacheKeyForURL(e))throw new a("non-precached-url",{url:e});const s=this.createHandler(t),n=new Request(e);return()=>s({request:n})}}let U;const T=()=>(U||(U=new N),U);const E=(e,t)=>{const s=T().getURLsToCacheKeys();for(const n of function*(e,{ignoreURLParametersMatching:t,directoryIndex:s,cleanURLs:n,urlManipulation:a}={}){const i=new URL(e,location.href);i.hash="",yield i.href;const r=function(e,t=[]){for(const s of[...e.searchParams.keys()])t.some(e=>e.test(s))&&e.searchParams.delete(s);return e}(i,t);if(yield r.href,s&&r.pathname.endsWith("/")){const e=new URL(r.href);e.pathname+=s,yield e.href}if(n){const e=new URL(r.href);e.pathname+=".html",yield e.href}if(a){const e=a({url:i});for(const t of e)yield t.href}}(e,t)){const e=s.get(n);if(e)return e}};let O=!1;function L(e){O||((({ignoreURLParametersMatching:e=[/^utm_/],directoryIndex:t="index.html",cleanURLs:s=!0,urlManipulation:n}={})=>{const a=o();self.addEventListener("fetch",i=>{const r=E(i.request.url,{cleanURLs:s,directoryIndex:t,ignoreURLParametersMatching:e,urlManipulation:n});if(!r)return void 0;let c=self.caches.open(a).then(e=>e.match(r)).then(e=>e||fetch(r));i.respondWith(c)})})(e),O=!0)}const S=e=>{const t=T(),s=R.get();e.waitUntil(t.install({event:e,plugins:s}).catch(e=>{throw e}))},C=e=>{const t=T();e.waitUntil(t.activate())};s(2);const K=e=>e&&"object"==typeof e?e:{handle:e};class M{constructor(e,t,s="GET"){this.handler=K(t),this.match=e,this.method=s}}class k extends M{constructor(e,t,s){super(({url:t})=>{const s=e.exec(t.href);if(s&&(t.origin===location.origin||0===s.index))return s.slice(1)},t,s)}}class j{constructor(){this._routes=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)})}addCacheListener(){self.addEventListener("message",e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data;0;const s=Promise.all(t.urlsToCache.map(e=>{"string"==typeof e&&(e=[e]);const t=new Request(...e);return this.handleRequest({request:t})}));e.waitUntil(s),e.ports&&e.ports[0]&&s.then(()=>e.ports[0].postMessage(!0))}})}handleRequest({request:e,event:t}){const s=new URL(e.url,location.href);if(!s.protocol.startsWith("http"))return void 0;const{params:n,route:a}=this.findMatchingRoute({url:s,request:e,event:t});let i=a&&a.handler;if(!i&&this._defaultHandler&&(i=this._defaultHandler),!i)return void 0;let r;try{r=i.handle({url:s,request:e,event:t,params:n})}catch(e){r=Promise.reject(e)}return r instanceof Promise&&this._catchHandler&&(r=r.catch(n=>this._catchHandler.handle({url:s,request:e,event:t}))),r}findMatchingRoute({url:e,request:t,event:s}){const n=this._routes.get(t.method)||[];for(const a of n){let n;const i=a.match({url:e,request:t,event:s});if(i)return n=i,(Array.isArray(i)&&0===i.length||i.constructor===Object&&0===Object.keys(i).length||"boolean"==typeof i)&&(n=void 0),{route:a,params:n}}return{}}setDefaultHandler(e){this._defaultHandler=K(e)}setCatchHandler(e){this._catchHandler=K(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(e){if(!this._routes.has(e.method))throw new a("unregister-route-but-not-found-with-method",{method:e.method});const t=this._routes.get(e.method).indexOf(e);if(!(t>-1))throw new a("unregister-route-route-not-registered");this._routes.get(e.method).splice(t,1)}}let A;const P=()=>(A||(A=new j,A.addFetchListener(),A.addCacheListener()),A);function W(e,t,s){let n;if("string"==typeof e){const a=new URL(e,location.href);0,n=new M(({url:e})=>e.href===a.href,t,s)}else if(e instanceof RegExp)n=new k(e,t,s);else if("function"==typeof e)n=new M(e,t,s);else{if(!(e instanceof M))throw new a("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});n=e}return P().registerRoute(n),n}s(3);class D{constructor(e={}){this._cacheName=h(e.cacheName),this._plugins=e.plugins||[],this._fetchOptions=e.fetchOptions,this._matchOptions=e.matchOptions}async handle({event:e,request:t}){"string"==typeof t&&(t=new Request(t));let s,n=await g({cacheName:this._cacheName,request:t,event:e,matchOptions:this._matchOptions,plugins:this._plugins});if(n)0;else{0;try{n=await this._getFromNetwork(t,e)}catch(e){s=e}0}if(!n)throw new a("no-response",{url:t.url,error:s});return n}async _getFromNetwork(e,t){const s=await v({request:e,event:t,fetchOptions:this._fetchOptions,plugins:this._plugins}),n=s.clone(),a=f({cacheName:this._cacheName,request:e,response:n,event:t,plugins:this._plugins});if(t)try{t.waitUntil(a)}catch(e){0}return s}}const I={cacheWillUpdate:async({response:e})=>200===e.status||0===e.status?e:null};class F{constructor(e={}){if(this._cacheName=h(e.cacheName),e.plugins){const t=e.plugins.some(e=>!!e.cacheWillUpdate);this._plugins=t?e.plugins:[I,...e.plugins]}else this._plugins=[I];this._networkTimeoutSeconds=e.networkTimeoutSeconds||0,this._fetchOptions=e.fetchOptions,this._matchOptions=e.matchOptions}async handle({event:e,request:t}){const s=[];"string"==typeof t&&(t=new Request(t));const n=[];let i;if(this._networkTimeoutSeconds){const{id:a,promise:r}=this._getTimeoutPromise({request:t,event:e,logs:s});i=a,n.push(r)}const r=this._getNetworkPromise({timeoutId:i,request:t,event:e,logs:s});n.push(r);let c=await Promise.race(n);if(c||(c=await r),!c)throw new a("no-response",{url:t.url});return c}_getTimeoutPromise({request:e,logs:t,event:s}){let n;return{promise:new Promise(t=>{n=setTimeout(async()=>{t(await this._respondFromCache({request:e,event:s}))},1e3*this._networkTimeoutSeconds)}),id:n}}async _getNetworkPromise({timeoutId:e,request:t,logs:s,event:n}){let a,i;try{i=await v({request:t,event:n,fetchOptions:this._fetchOptions,plugins:this._plugins})}catch(e){a=e}if(e&&clearTimeout(e),a||!i)i=await this._respondFromCache({request:t,event:n});else{const e=i.clone(),s=f({cacheName:this._cacheName,request:t,response:e,event:n,plugins:this._plugins});if(n)try{n.waitUntil(s)}catch(e){0}}return i}_respondFromCache({event:e,request:t}){return g({cacheName:this._cacheName,request:t,event:e,matchOptions:this._matchOptions,plugins:this._plugins})}}class H{constructor(e={}){if(this._cacheName=h(e.cacheName),this._plugins=e.plugins||[],e.plugins){const t=e.plugins.some(e=>!!e.cacheWillUpdate);this._plugins=t?e.plugins:[I,...e.plugins]}else this._plugins=[I];this._fetchOptions=e.fetchOptions,this._matchOptions=e.matchOptions}async handle({event:e,request:t}){"string"==typeof t&&(t=new Request(t));const s=this._getFromNetwork({request:t,event:e});let n,i=await g({cacheName:this._cacheName,request:t,event:e,matchOptions:this._matchOptions,plugins:this._plugins});if(i){if(e)try{e.waitUntil(s)}catch(n){0}}else{0;try{i=await s}catch(e){n=e}}if(!i)throw new a("no-response",{url:t.url,error:n});return i}async _getFromNetwork({request:e,event:t}){const s=await v({request:e,event:t,fetchOptions:this._fetchOptions,plugins:this._plugins}),n=f({cacheName:this._cacheName,request:e,response:s.clone(),event:t,plugins:this._plugins});if(t)try{t.waitUntil(n)}catch(e){0}return s}}s(5);class B{constructor(e={}){this._statuses=e.statuses,this._headers=e.headers}isResponseCacheable(e){let t=!0;return this._statuses&&(t=this._statuses.includes(e.status)),this._headers&&t&&(t=Object.keys(this._headers).some(t=>e.headers.get(t)===this._headers[t])),t}}s(4);const Q=e=>{const t=new URL(e,location.href);return t.hash="",t.href};class ${constructor(e){this._cacheName=e,this._db=new _("workbox-expiration",1,{onupgradeneeded:e=>this._handleUpgrade(e)})}_handleUpgrade(e){const t=e.target.result.createObjectStore("cache-entries",{keyPath:"id"});t.createIndex("cacheName","cacheName",{unique:!1}),t.createIndex("timestamp","timestamp",{unique:!1}),(async e=>{await new Promise((t,s)=>{const n=indexedDB.deleteDatabase(e);n.onerror=()=>{s(n.error)},n.onblocked=()=>{s(new Error("Delete blocked"))},n.onsuccess=()=>{t()}})})(this._cacheName)}async setTimestamp(e,t){const s={url:e=Q(e),timestamp:t,cacheName:this._cacheName,id:this._getId(e)};await this._db.put("cache-entries",s)}async getTimestamp(e){return(await this._db.get("cache-entries",this._getId(e))).timestamp}async expireEntries(e,t){const s=await this._db.transaction("cache-entries","readwrite",(s,n)=>{const a=s.objectStore("cache-entries").index("timestamp").openCursor(null,"prev"),i=[];let r=0;a.onsuccess=()=>{const s=a.result;if(s){const n=s.value;n.cacheName===this._cacheName&&(e&&n.timestamp<e||t&&r>=t?i.push(s.value):r++),s.continue()}else n(i)}}),n=[];for(const e of s)await this._db.delete("cache-entries",e.id),n.push(e.url);return n}_getId(e){return this._cacheName+"|"+Q(e)}}class G{constructor(e,t={}){this._isRunning=!1,this._rerunRequested=!1,this._maxEntries=t.maxEntries,this._maxAgeSeconds=t.maxAgeSeconds,this._cacheName=e,this._timestampModel=new $(e)}async expireEntries(){if(this._isRunning)return void(this._rerunRequested=!0);this._isRunning=!0;const e=this._maxAgeSeconds?Date.now()-1e3*this._maxAgeSeconds:0,t=await this._timestampModel.expireEntries(e,this._maxEntries),s=await self.caches.open(this._cacheName);for(const e of t)await s.delete(e);this._isRunning=!1,this._rerunRequested&&(this._rerunRequested=!1,w(this.expireEntries()))}async updateTimestamp(e){await this._timestampModel.setTimestamp(e,Date.now())}async isURLExpired(e){if(this._maxAgeSeconds){return await this._timestampModel.getTimestamp(e)<Date.now()-1e3*this._maxAgeSeconds}return!1}async delete(){this._rerunRequested=!1,await this._timestampModel.expireEntries(1/0)}}class J{constructor(e={}){var t;this.cachedResponseWillBeUsed=async({event:e,request:t,cacheName:s,cachedResponse:n})=>{if(!n)return null;const a=this._isResponseDateFresh(n),i=this._getCacheExpiration(s);w(i.expireEntries());const r=i.updateTimestamp(t.url);if(e)try{e.waitUntil(r)}catch(e){0}return a?n:null},this.cacheDidUpdate=async({cacheName:e,request:t})=>{const s=this._getCacheExpiration(e);await s.updateTimestamp(t.url),await s.expireEntries()},this._config=e,this._maxAgeSeconds=e.maxAgeSeconds,this._cacheExpirations=new Map,e.purgeOnQuotaError&&(t=()=>this.deleteCacheAndMetadata(),i.add(t))}_getCacheExpiration(e){if(e===h())throw new a("expire-custom-caches-only");let t=this._cacheExpirations.get(e);return t||(t=new G(e,this._config),this._cacheExpirations.set(e,t)),t}_isResponseDateFresh(e){if(!this._maxAgeSeconds)return!0;const t=this._getDateHeaderTimestamp(e);return null===t||t>=Date.now()-1e3*this._maxAgeSeconds}_getDateHeaderTimestamp(e){if(!e.headers.has("date"))return null;const t=e.headers.get("date"),s=new Date(t).getTime();return isNaN(s)?null:s}async deleteCacheAndMetadata(){for(const[e,t]of this._cacheExpirations)await self.caches.delete(e),await t.delete();this._cacheExpirations=new Map}}var V;self.addEventListener("install",()=>self.skipWaiting()),self.addEventListener("activate",()=>self.clients.claim()),function(e){T().addToCacheList(e),e.length>0&&(self.addEventListener("install",S),self.addEventListener("activate",C))}([{'revision':'a7e3f827811d877690f157d8604e6bc6','url':'/01ce1568a9b1bee56351.js'},{'revision':'e5dbaec196ca674ed8b987f69ab84ed9','url':'/0d3f234a2a45ee7d6bc5.js'},{'revision':'5ba6fbc7516a5c3041f03e009339f3ba','url':'/0d3f234a2a45ee7d6bc5.js.LICENSE.txt'},{'revision':'a2ba4097af337fc58062c15e87c828eb','url':'/1dbbd604ad64e32dfdb8.js'},{'revision':'71cc31433634651ed8aedf9cb29b5906','url':'/1dbbd604ad64e32dfdb8.js.LICENSE.txt'},{'revision':'40295ec2647978d24b79d37eb7c43d0d','url':'/27a1dda0a66d86459c41.js'},{'revision':'a80cc8a2b4c68cc913e7f7d2e678c5b7','url':'/2a8d574a186efe95a53c.js'},{'revision':'cb82e64838a286b50527417e27616412','url':'/2a8d574a186efe95a53c.js.LICENSE.txt'},{'revision':'ec47bd72d6c5df7c0fb7c92759be35a0','url':'/2fb32e41fad2a9825061.js'},{'revision':'bc4200efa7b6a2e16a0359ac24db503e','url':'/3cb35956734e1913e4e7.js'},{'revision':'a6df6236f25b8c845412dd9822bb90e3','url':'/42e6124ba9e7c1739875.js'},{'revision':'521ebf11d99521b8a23ce9ec81eb92af','url':'/51820c835725440a6d9a.js'},{'revision':'485087406ab449fa52ecd217923b9076','url':'/51a51a185ac8fd8d721e.js'},{'revision':'25a8103173d83c03ae6a351f721aef56','url':'/51a51a185ac8fd8d721e.js.LICENSE.txt'},{'revision':'44af0542a38645e17dece434ad95b629','url':'/5814c210fb1b7a6d1749.js'},{'revision':'7fd23991b0b37b49066e7a34e0535285','url':'/5814c210fb1b7a6d1749.js.LICENSE.txt'},{'revision':'ae7f33ebc2d090f8fbff4966affab5d3','url':'/8403bc49bb813cc00bef.js'},{'revision':'6140be787edfafbb6db2da935eecfce3','url':'/a5ac05482f4b084549de.js'},{'revision':'25a8103173d83c03ae6a351f721aef56','url':'/a5ac05482f4b084549de.js.LICENSE.txt'},{'revision':'56a0e90b42dd1682bbb5bd7f93b01a54','url':'/admin.3559c2a5b139560ced4b.js'},{'revision':'5dae3c5565db289db1b2a92bb4754b2d','url':'/admin.3559c2a5b139560ced4b.js.LICENSE.txt'},{'revision':'ba1cf5e7075e28f7095298b1c8ca5c83','url':'/admin/config.json'},{'revision':'62de26a760dafeb83a5f85caa4666c75','url':'/assets/cms-preview.css'},{'revision':'5390f6ffc62949e5de34f36fb5447f3c','url':'/assets/cvv.png'},{'revision':'aa72bd2711758e763a0917204ea86db3','url':'/assets/img-placeholder.png'},{'revision':'cc50a22d772de45fa0b34931f3d7810f','url':'/assets/payments.png'},{'revision':'917cbf7a0f9d6d937dccc17fbd462429','url':'/assets/ssl-safe.png'},{'revision':'019773a40d8c8449354bfec55bc9e61d','url':'/c04d61cd4f1c13ee51df.js'},{'revision':'25a8103173d83c03ae6a351f721aef56','url':'/c04d61cd4f1c13ee51df.js.LICENSE.txt'},{'revision':'78b74ff5c2d63d422449ae2a81bf6da8','url':'/checkout.2f59ac295e9d17d68bca.js'},{'revision':'6bda166b1b0188829db02405b116f0d8','url':'/checkout.2f59ac295e9d17d68bca.js.LICENSE.txt'},{'revision':'ca7e2216aceeb42dc7707d52eb6712b4','url':'/e1c78b752440adc16498.js'},{'revision':'b7793b7db4efc20f9f6b1ab784af8ec4','url':'/e1c78b752440adc16498.js.LICENSE.txt'},{'revision':'6a2ea355f5cf8be4e3c63d1043abbe61','url':'/ed97dfd3886059c273f4.js'},{'revision':'7f3a19ee5df4c2cbd9163f869898ae38','url':'/ed97dfd3886059c273f4.js.LICENSE.txt'},{'revision':'92c723655dfc46dd5845833ecb53b692','url':'/f1c2f367471980df761b.js'},{'revision':'25a8103173d83c03ae6a351f721aef56','url':'/f1c2f367471980df761b.js.LICENSE.txt'},{'revision':'5d959ca072d2574643aff2abada3208e','url':'/icon_128x128.5d959ca072d2574643aff2abada3208e.png'},{'revision':'9b09241af66811556b0119e4553e1882','url':'/icon_192x192.9b09241af66811556b0119e4553e1882.png'},{'revision':'571427d4f5d20b19da559559376b0266','url':'/icon_384x384.571427d4f5d20b19da559559376b0266.png'},{'revision':'f90a333902ce9ce4af3ade780eb88ebb','url':'/icon_512x512.f90a333902ce9ce4af3ade780eb88ebb.png'},{'revision':'318043c0c61a5f78ca08dc7d8f6f48a5','url':'/icon_96x96.318043c0c61a5f78ca08dc7d8f6f48a5.png'},{'revision':'791be7ee6538f26bb57bc31243a6e17e','url':'/img/icon.png'},{'revision':'0b35db516cfa7475b1c2f8c081e8d54d','url':'/img/large-icon.png'},{'revision':'1db8fc9cfca7a2bea52da39802e1079e','url':'/img/uploads/banner_site-1.png'},{'revision':'b227fc2c42822942bae26d56ec2085c3','url':'/img/uploads/clube_de_desconto-1.png'},{'revision':'89aaf827de4d0414d8bc8de56611b72e','url':'/img/uploads/favicon.png'},{'revision':'f64174dda64c566530415873c16c0e3d','url':'/img/uploads/google.png'},{'revision':'5cf745c5bc5f9a3e55138c242ae83d56','url':'/img/uploads/headless.png'},{'revision':'791be7ee6538f26bb57bc31243a6e17e','url':'/img/uploads/icon.png'},{'revision':'0b35db516cfa7475b1c2f8c081e8d54d','url':'/img/uploads/large-icon.png'},{'revision':'c83c3ea503399a02742a68e34cad0fe3','url':'/img/uploads/logo-ql.png'},{'revision':'bf1763c50245854ce5ad807b5c1ecea1','url':'/img/uploads/logo.webp'},{'revision':'1c4ec789092d1ecb6ba38c20e86284e0','url':'/img/uploads/logo3.png'},{'revision':'bb342a6d454021c85e97630690a2c78a','url':'/img/uploads/luna-marca.png'},{'revision':'53f2de258a265baf91327be5de72cb1d','url':'/img/uploads/mes-maes.png'},{'revision':'669c8c88cb5d26067fc2eec8f110390f','url':'/img/uploads/norton.png'},{'revision':'6d8c51304794f03e3a2421edc43b3864','url':'/img/uploads/og-image.png'},{'revision':'ae5e98e4ed3719eea34abbdb9d76a284','url':'/img/uploads/pwa-reliable.png'},{'revision':'b5ce2b510164133c9f0cf6bedbaff7a3','url':'/img/uploads/quer_dicas_de_produtos_e_tratamentos-1.png'},{'revision':'bdb4a8ab0c408c42d042fb593b309dae','url':'/img/uploads/rect8589.png'},{'revision':'6a2afb2e2dcfa5bf24d34c81408b611e','url':'/img/uploads/rect859.png'},{'revision':'b59c373c1a75acf61c9bb8dd7e717d01','url':'/img/uploads/rect89.png'},{'revision':'5efa4bc08fef068757c2a28a1f1fec30','url':'/img/uploads/rect89.webp'},{'revision':'917cbf7a0f9d6d937dccc17fbd462429','url':'/img/uploads/ssl-safe.png'},{'revision':'b95c2f52c39a35d70317f6067d81ac62','url':'/manifest.json'},{'revision':'9deea4df51d89384b71463618d64b524','url':'/robots.txt'},{'revision':'f767a4ab43d7378725c22dbb2f8f389b','url':'/storefront.027b6b5987b308415065.js'},{'revision':'20b34fb80af5b45c32917ec48056336f','url':'/storefront.027b6b5987b308415065.js.LICENSE.txt'},{'revision':'bec9715fb55b21945514c94d27fcdaec','url':'/storefront.e04ed1c24ffee1169f3d.css'}]),L(V),W(/^https:\/\/fonts\.googleapis\.com/,new H({cacheName:"google-fonts-stylesheets"})),W(/^https:\/\/fonts\.gstatic\.com/,new D({cacheName:"google-fonts-webfonts",plugins:[new class{constructor(e){this.cacheWillUpdate=async({response:e})=>this._cacheableResponse.isResponseCacheable(e)?e:null,this._cacheableResponse=new B(e)}}({statuses:[0,200]}),new J({maxAgeSeconds:31536e3,maxEntries:30})]})),W(/^https:\/\/code\.jquery\.com/,new H({cacheName:"cdn-jquery"})),W(/^https:\/\/cdn\.jsdelivr\.net/,new H({cacheName:"cdn-jsdelivr"})),W(/^https:\/\/io(storefront)?\.ecvol\.com/,new F({networkTimeoutSeconds:3,cacheName:"api-cache",plugins:[new J({maxEntries:20})]})),W(/^https:\/\/ioapi?\.ecvol\.com/,new F({networkTimeoutSeconds:3,cacheName:"store-api-cache",plugins:[new J({maxEntries:50,purgeOnQuotaError:!0})]})),W(/^https:\/\/(?:api|apx-search).e-com\.plus\/(api\/)?v[1-9]+\//,new F({cacheName:"live-api",plugins:[new J({maxEntries:50,maxAgeSeconds:300})]})),W(/^https:\/\/ecom-[\w]+\.[\w]+\.digitaloceanspaces\.com\/imgs\/([12345]?[0-9]{2}px|normal|small)\//,new D({cacheName:"pictures",plugins:[new J({maxEntries:100,maxAgeSeconds:2592e3,purgeOnQuotaError:!0})]})),W(/^https:\/\/ecom-[\w]+\.[\w]+\.digitaloceanspaces\.com\/imgs\/([678]?[0-9]{2}px|big)\//,new D({cacheName:"pictures-big",plugins:[new J({maxEntries:10,maxAgeSeconds:172800,purgeOnQuotaError:!0})]})),W(/\/assets\//,new H({cacheName:"assets"})),W(/\/((?:img|assets).*)?logo\.(?:png|gif|jpg|jpeg|webp|svg)$/,new H({cacheName:"logo"})),W(/\/img\/uploads\/.*\.(?:png|gif|jpg|jpeg|webp|svg)$/,new H({cacheName:"media",plugins:[new J({maxEntries:20,maxAgeSeconds:2592e3,purgeOnQuotaError:!0})]})),W("/",new F),W(/\/((?!(?:admin|assets|img)(\/|$))[^.]+)(\.(?!js|css|xml|txt|png|gif|jpg|jpeg|webp|svg)[^.]+)*$/,new F({cacheName:"page",plugins:[new J({maxEntries:50,purgeOnQuotaError:!0})]}))}]);
//# sourceMappingURL=sw.js.map