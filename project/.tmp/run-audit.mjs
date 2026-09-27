import { launchChrome, navigate } from './cdp.mjs';

async function main() {
  const targetId = await launchChrome();
  const results = {};
  for (const [name, url, w, h] of [
    ['1440', 'http://localhost:5173/', 1440, 900],
    ['1024', 'http://localhost:5173/', 1024, 900],
    ['768', 'http://localhost:5173/', 768, 1024],
    ['414', 'http://localhost:5173/', 414, 896, true],
    ['375', 'http://localhost:5173/', 375, 812, true],
    ['320', 'http://localhost:5173/', 320, 568, true],
  ]) {
    const [m, h] = name === '1440' ? [1440, 900] : name === '1024' ? [1024, 900] : name === '768' ? [768, 1024] : name === '414' ? [414, 896] : [320, 568];
    const isMobile = name === '414' || name === '375' || name === '320';
    const r = await navigate(targetId, url, m, h, isMobile);
    const consoleMsgs = (r.events.Runtime.consoleAPICalled || []).map(e => ({ level: e.type, text: String(e.args?.[0]?.value || '').slice(0, 120) })).filter(x => x.text);
    const exceptions = (r.events.Runtime.exceptionThrown || []).map(e => ({ text: String(e.exception?.description || e.exception?.value || '').slice(0, 150) }));
    const netErrors = (r.events.Network.loadingFailed || []).map(e => ({ url: e.requestId ? (r.events.Network.requestWillBeSent || []).find(x => x.requestId === e.requestId)?.request?.url || e.requestId : '', errorText: e.errorText?.slice(0, 80) })).filter(x => x.errorText);
    results[name] = { ...r.doc, consoleMsgs, exceptions, netErrors };
  }
  console.log(JSON.stringify(results, null, 2));
  try { await import('node:child_process').then(({ execSync }) => execSync(`taskkill /F /IM chrome.exe /T`, { shell: true, stdio: 'ignore' })); } catch {}
}
main().catch(e => { console.error(e); try { import('node:child_process').then(({ execSync }) => execSync(`taskkill /F /IM chrome.exe /T`, { shell: true, stdio: 'ignore' })); } catch {} process.exit(1); });
