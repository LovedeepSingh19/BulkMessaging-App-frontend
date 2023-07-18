
// const wbm = require("wbm");
const chrome = require("chrome-aws-lambda");
const puppeteer = require("puppeteer-core");


export default async function POST(req, res) {
  const {message, number, userNumber} = req.body
  console.log(number)



let browser = null;
let page = null;


const SELECTORS = {
    LOADING: "progress",
    INSIDE_CHAT: "document.getElementsByClassName('two')[0]",
    QRCODE_PAGE: "body > div > div > .landing-wrapper",
    QRCODE_DATA: "div[data-ref]",
    QRCODE_DATA_ATTR: "data-ref",
    SEND_BUTTON: 'div:nth-child(2) > button > span[data-icon="send"]'
};

/**
 * Initialize browser, page and setup page desktop mode
 */


    const args = {
      args: [...chrome.args, "--hide-scrollbars", "--disable-web-security"],
      defaultViewport: chrome.defaultViewport,
      executablePath: await chrome.executablePath,
      headless: true,
      ignoreHTTPSErrors: true,
    };

    try {
        browser = await puppeteer.launch(args);
        page = await browser.newPage();
        // prevent dialog blocking page and just accept it(necessary when a message is sent too fast)
        // page.on("dialog", async dialog => { await dialog.accept(); });
        // fix the chrome headless mode true issues
        // https://gitmemory.com/issue/GoogleChrome/puppeteer/1766/482797370
        // await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36");
        page.setDefaultTimeout(10000);

        await page.goto(`https://wa.me/91${userNumber}`);

        for (let num of number) {
          await page.goto(`https://wa.me/send?phone=${num}&text=${encodeURIComponent(message)}`);
          await page.waitForSelector(SELECTORS.LOADING, { hidden: true, timeout: 60000 });
          await page.waitForSelector(SELECTORS.SEND_BUTTON, { timeout: 5000 });
          await page.keyboard.press("Enter");
          await page.waitFor(1000);
          
      }

          await browser.close();
          res.status(200).json({Data: "Finally"})


            // if (qrCodeData) {
            //     console.log('Getting QRCode data...');
            //     console.log('Note: You should use wbm.waitQRCode() inside wbm.start() to avoid errors.');
            //     return await getQRCodeData();
            }catch(e){
              console.log("BIG ERROR: ", e)
            }
}



          // wbm
        // .start({ qrCodeData: true, session: false, showBrowser: true})
        // .then(async (qrCodeData) => {

          // res.status(200).json({ qr: qrCodeData });
          // await wbm.waitQRCode();

          // await wbm.sendTo(number, message);
          // await wbm.end();
        // })
        // .catch((error) => {
            // console.log("err whatsApp: ", error);
          // });

    // res.status(200).json({ text: message, number: number});


    // return NextResponse.json({text: "hello"})


   



 

