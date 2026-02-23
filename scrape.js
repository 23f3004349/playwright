const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const urls = [
    "https://sanand0.github.io/tdsdata/js_table/?seed=11",
    "https://sanand0.github.io/tdsdata/js_table/?seed=12",
    "https://sanand0.github.io/tdsdata/js_table/?seed=13",
    "https://sanand0.github.io/tdsdata/js_table/?seed=14",
    "https://sanand0.github.io/tdsdata/js_table/?seed=15",
    "https://sanand0.github.io/tdsdata/js_table/?seed=16",
    "https://sanand0.github.io/tdsdata/js_table/?seed=17",
    "https://sanand0.github.io/tdsdata/js_table/?seed=18",
    "https://sanand0.github.io/tdsdata/js_table/?seed=19",
    "https://sanand0.github.io/tdsdata/js_table/?seed=20"
  ];

  let grandTotal = 0;

  for (let i = 0; i < urls.length; i++) {

    const url = urls[i];
    console.log("Visiting:", url);

    await page.goto(url, { waitUntil: "networkidle" });
    await page.waitForSelector("table");

    const numbers = await page.$$eval("table td", cells =>
      cells
        .map(td => parseFloat(td.innerText.replace(/[^0-9.-]/g, "")))
        .filter(n => !isNaN(n))
    );

    const pageSum = numbers.reduce((a, b) => a + b, 0);

    console.log(`Seed ${11 + i} sum: ${pageSum}`);

    grandTotal += pageSum;
  }

  console.log("====================================");
  console.log("FINAL TOTAL:", grandTotal);
  console.log("====================================");

  await browser.close();
})();