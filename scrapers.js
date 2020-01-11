const puppeteer = require('puppeteer');

async function scrapeProduct(url){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const [el] = await page.$x('//*[@id="imgBlkFront"]');
    const src =  await el.getProperty('src');
    const imgURL = await src.jsonValue();

    const [el2] = await page.$x('//*[@id="productTitle"]');
    const txt =  await el2.getProperty('textContent');
    const title = await txt.jsonValue();

    const [el3] = await page.$x('//*[@id="addToCart"]/div[1]/div[1]/span');
    const txt2 =  await el3.getProperty('textContent');
    const price = await txt2.jsonValue();

    console.log({imgURL, title, price});
    browser.close();
}

scrapeProduct('https://www.amazon.com/gp/product/1506341284?pf_rd_p=ab873d20-a0ca-439b-ac45-cd78f07a84d8&pf_rd_r=F5GCGQXP02W4MQYF6248');