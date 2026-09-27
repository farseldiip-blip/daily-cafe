import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  for (const [name, w, h] of [['320',320,568],['375',375,812],['390',390,844],['430',430,932],['768',768,1024],['1024',1024,900],['1440',1440,900]]) {
    await page.setViewportSize({ width: w, height: h });
    await page.goto('http://localhost:5173/');
    await page.waitForTimeout(800);
    const m = await page.evaluate(({w,h}) => {
      const hero = document.querySelector('.hero');
      const grid = document.querySelector('.hero__grid');
      const copy = document.querySelector('.hero__copy');
      const visual = document.querySelector('.hero__visual');
      const photo = document.querySelector('.hero__photo-wrap');
      const slogan = document.querySelector('.hero__slogan');
      const btn = document.querySelectorAll('.btn');
      const textLink = document.querySelector('.text-link');
      const overflow = document.documentElement.scrollWidth - document.documentElement.clientWidth;
      const heroRect = hero?.getBoundingClientRect();
      return {
        w, h,
        heroH: Math.round(hero?.offsetHeight || 0),
        heroW: Math.round(hero?.offsetWidth || 0),
        gridH: Math.round(grid?.offsetHeight || 0),
        photoH: Math.round(photo?.offsetHeight || 0),
        photoW: Math.round(photo?.offsetWidth || 0),
        sloganH: Math.round(getComputedStyle(slogan).fontSize || 0),
        btnH: btn[0]?.offsetHeight || 0,
        btnW: btn[0]?.offsetWidth || 0,
        overflow,
        heroTop: Math.round(heroRect?.top || 0),
        heroBottom: Math.round(heroRect?.bottom || 0),
      };
    }, {w, h});
    console.log(JSON.stringify(m));
  }
  await browser.close();
}
main().catch(e => { console.error(e); process.exit(1); });
