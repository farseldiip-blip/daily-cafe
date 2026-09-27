import { connect, inspect, disconnect } from './cdp.mjs';

async function main() {
  const tid = await connect();
  const out = {};
  for (const [name, w, h] of [['1440',1440,900],['1024',1024,900],['768',768,1024],['414',414,896],['390',390,844],['375',375,812],['320',320,568]]) {
    const mobile = [414,390,375,320].includes(name);
    const r = await inspect(tid, 'http://localhost:5173/', w, h, mobile);
    out[name] = r.doc;
    await new Promise(r=>setTimeout(r,600));
  }
  console.log(JSON.stringify(out, null, 2));
  disconnect();
}
main().catch(e=>{console.error(e);disconnect();process.exit(1);});
