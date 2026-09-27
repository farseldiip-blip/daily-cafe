import http from 'node:http';
import { spawn } from 'node:child_process';

let ws = null;
let chrome = null;
let id = 1;

function send(method, params = {}) {
  const payload = { id: id++, method, params };
  return new Promise((resolve, reject) => {
    const cb = (data) => { if (data.id === payload.id) { ws.removeListener('message', cb); resolve(data); } };
    ws.on('message', cb);
    ws.send(JSON.stringify(payload));
  });
}

function listenEvents(...types) {
  const out = {};
  for (const t of types) out[t] = [];
  ws.on('message', (raw) => {
    try { const d = JSON.parse(raw); if (d.method && out[d.method]) out[d.method].push(d.params || {}); } catch {}
  });
  return out;
}

function waitForPort(port = 9223, ms = 20000) {
  return new Promise((resolve, reject) => {
    const dl = Date.now() + ms;
    const tick = () => http.get(`http://127.0.0.1:${port}/json/version`, res => { let d=''; res.on('data',c=>d+=c); res.on('end',()=>resolve(d)); }).on('error',()=>{ if(Date.now()>dl) reject(new Error('DevTools not ready')); else setTimeout(tick,400); });
  });
}

export async function connect(port = 9223) {
  console.log('starting chrome');
  await new Promise(r => setTimeout(r, 300));
  const chromeExe = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const profile = 'D:/chrome-profile';
  const args = ['--headless=new','--disable-gpu','--no-sandbox','--no-first-run','--hide-scrollbars',`--user-data-dir=${profile}`,`--remote-debugging-port=${port}`,'--chromeProfile=cp','--start-maximized','about:blank'];
  const chromeProc = spawn('cmd', ['/c', 'start "" "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe" --headless=new --disable-gpu --no-sandbox --remote-debugging-port='+port+' --user-data-dir='+profile+' --start-maximized about:blank'], {shell:true, stdio:'ignore'});
  const v = JSON.parse(await waitForPort(port, 15000));
  console.log('devtools ready', v.webSocketDebuggerUrl ? 'yes' : 'no');
  ws = new WebSocket(v.webSocketDebuggerUrl);
  await new Promise(r => ws.on('open', r));
  await send('Target.createTarget', {url:'about:blank'});
  const {targetId} = (await send('Target.getTargets')).targets.find(t=>t.url==='about:blank');
  await send('Target.attachToTarget', {targetId, flatten:true});
  await send('Page.enable');
  await send('Runtime.enable');
  await send('Network.enable');
  return targetId;
}

export async function inspect(targetId, url, w, h, mobile = false) {
  await send('Emulation.setDeviceMetricsOverride', {targetId, width:w, height:h, deviceScaleFactor:1, mobile});
  const ev = listenEvents('Runtime.exceptionThrown','Network.loadingFailed','Page.loadEventFired');
  await send('Page.navigate', {targetId, url});
  await new Promise(r => setTimeout(r, 2200));
  const doc = await send('Runtime.evaluate', {expression:`(${inspectExpr.toString()})()`});
  return {doc: doc.result.value, events: ev};
}

function inspectExpr() {
  const bad = [];
  document.querySelectorAll('img').forEach(img=>{const s=img.currentSrc||img.src; if(s&&s.includes('gstatic')) bad.push(s);});
  const headings = [];
  ['h1','h2','h3','h4','h5','h6'].forEach(t=>document.querySelectorAll(t).forEach(h=>headings.push({tag:t, text:h.textContent.trim().slice(0,35)})));
  return {overflowX: document.documentElement.scrollWidth-document.documentElement.clientWidth, scrollW: document.documentElement.scrollWidth, vpW: document.documentElement.clientWidth, vpH: document.documentElement.clientHeight, cdnFonts: [...new Set(bad)], headings};
}

export function disconnect() { try { spawn('taskkill',['/F','/IM','chrome.exe','/T'],{shell:true,stdio:'ignore'}); } catch {} }
