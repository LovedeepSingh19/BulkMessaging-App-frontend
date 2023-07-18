import { NextResponse } from "next/server";
const wbm = require("wbm");


export default function handler(req, res) {
  const {message, number} = req.body
  console.log(number)

          wbm
        .start({ qrCodeData: true, session: false, showBrowser: true})
        .then(async (qrCodeData) => {

          res.status(200).json({ qr: qrCodeData });
          await wbm.waitQRCode();

          await wbm.send(number, message);
          await wbm.end();
        })
        .catch((error) => {
            console.log("err whatsApp: ", error);
          });

    // res.status(200).json({ text: message});


    // return NextResponse.json({text: "hello"})
  }