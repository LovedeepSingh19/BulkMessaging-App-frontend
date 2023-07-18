
// const wbm = require("wbm");
const chrome = require("chrome-aws-lambda");
const puppeteer = require("puppeteer-core");


export default async function POST(req, res) {
  const {message, number} = req.body
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

let counter = 0;

const interval = setInterval(() => {
  counter += 1;

  if (counter === 9) {
    res.status(200).json({text:"Work in Progress"})
    console.log("Task A");
  }
  if (counter >= 9) {
    clearInterval(interval);
  }
}, 1000);



    const args = {
      args: [...chrome.args, "--hide-scrollbars", "--disable-web-security"],
      defaultViewport: chrome.defaultViewport,
      executablePath: await chrome.executablePath,
      
      // "/opt/homebrew/bin/chromium",
      headless: false,
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
        page.setDefaultTimeout(30000);

        await page.goto(`https://web.whatsapp.com`);
        async function getQRCodeData() {
          await page.waitForSelector(SELECTORS.QRCODE_DATA, { timeout: 30000 });
          const qrcodeData = await page.evaluate((SELECTORS) => {
              let qrcodeDiv = document.querySelector(SELECTORS.QRCODE_DATA);
              return qrcodeDiv.getAttribute(SELECTORS.QRCODE_DATA_ATTR);
          }, SELECTORS);
          return await qrcodeData;
      }

    //   const qrcodeData = await page.evaluate((SELECTORS.QRCODE_DATA) => {
    //     let qrcodeDiv = document.querySelector(SELECTOR.QRCODE_DATA);
    //     // return qrcodeDiv.getAttribute(SELECTORS.QRCODE_DATA_ATTR);
    // });
    
      getQRCodeData().then(async () => {
        
        setTimeout(async () => {

          try {
          for (let num of number) {
            await page.goto(`https://web.whatsapp.com/send?phone=${num}&text=${encodeURIComponent(message)}`);
            await page.waitForSelector(SELECTORS.LOADING, { hidden: true, timeout: 20000 });
            await page.waitForSelector(SELECTORS.SEND_BUTTON, { timeout: 22000 });
            await page.keyboard.press("Enter");
            
          }
        } catch (e) {
          console.error("Error occurred:", e);
        } finally {
          await browser.close();
          // res.status(200).json({Data: "Finally"})
        }
        
        
      }, 5000)
        
    });

      }




            // if (qrCodeData) {
            //     console.log('Getting QRCode data...');
            //     console.log('Note: You should use wbm.waitQRCode() inside wbm.start() to avoid errors.');
            //     return await getQRCodeData();
            catch(e){
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


   



 

