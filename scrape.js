const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const seeds = [11,12,13,14,15,16,17,18,19,20];
  let grandTotal = 0;

  for (let seed of seeds) {
    const url = `https://YOUR_BASE_URL?seed=${seed}`; // replace with actual URL
    console.log(`Visiting: ${url}`);

    await page.goto(url);

    const numbers = await page.$$eval("table td", cells =>
      cells
        .map(td => parseFloat(td.innerText.replace(/[^0-9.-]/g, "")))
        .filter(n => !isNaN(n))
    );

    const pageSum = numbers.reduce((a,b) => a+b, 0);
    console.log(`Seed ${seed} sum: ${pageSum}`);

    grandTotal += pageSum;
  }

  console.log("====================================");
  console.log("FINAL TOTAL:", grandTotal);
  console.log("====================================");

  await browser.close();
})();