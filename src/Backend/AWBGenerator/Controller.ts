import { PDFDocument, StandardFonts, PDFPage, PDFFont, rgb } from 'pdf-lib';
import fs from 'fs';
import fontkit from '@pdf-lib/fontkit';
import bwipjs from 'bwip-js';
import QRCode from 'qrcode';
import path from 'path';


export class AWBController {

    async generatePdf(accountName: string, accountNumber: string, senderContactPerson: string,
        senderContactNumber: string, senderAddress: string, receiverContactPerson: string, receiverContactNumber: string,
        receiverAddress: string, COD: string, absFees: string, total: string, content: string, weight: string, pieces: string,
        serviceType: string, ref: string, specialInstructions: string): Promise<Buffer> {
        try {

            // Create a new PDF document
            const pdfDoc = await PDFDocument.create();

            // Add a new page to the PDF document
            const page = pdfDoc.addPage([595.28, 419.53]);

            // Get the default font
            const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
            pdfDoc.registerFontkit(fontkit);
            //load font and embed it to pdf document
            const fontBytes = fs.readFileSync(path.join(__dirname, '../../../fonts/Cairo-Light.ttf'));
            const dataFont = await pdfDoc.embedFont(fontBytes);
            // Generate the barcode image using bwip-js
            const barcodeOptions = {
                bcid: 'code128', // Replace with your desired barcode format
                text: '123456789', // Replace with your desired barcode value
                scale: 3, // Replace with your desired barcode scale
                height: 10, // Replace with your desired barcode height
                includetext: true, // Replace with true/false depending on whether or not you want the text to be included in the barcode image
                //textyalign: "below"
            };
            const barcodeBuffer = await bwipjs.toBuffer(barcodeOptions);

            // Embed the barcode image in the PDF using pdf-lib
            const bc = await pdfDoc.embedPng(barcodeBuffer);
            page.drawImage(bc, {
                x: 250, // Replace with your desired x coordinate
                y: 360, // Replace with your desired y coordinate
                width: 100,
                height: 40,
            });


            //ABS Logo
            const imagePath = path.join(__dirname, '../../../uploads', 'LOGO.png');
            const imageData = fs.readFileSync(imagePath);
            const image = await pdfDoc.embedPng(imageData);


            // Draw the image on the top left of the PDF
            page.drawImage(image, {
                x: 20, // Replace with your desired x coordinate
                y: 370, // Replace with your desired y coordinate
                width: 100,
                height: 40,
            });

            // Create the QR code image as a data URL
            const qrCodeDataUrl = await QRCode.toBuffer('https://www.absegy.com');

            // Draw the QR code image on the PDF document
            const qrCodeImage = await pdfDoc.embedPng(qrCodeDataUrl);
            const qrCodeWidth = 100; // Replace with your desired QR code width
            const qrCodeHeight = 80; // Replace with your desired QR code height
            page.drawImage(qrCodeImage, {
                x: 475, // Replace with your desired x coordinate
                y: 340, // Replace with your desired y coordinate
                width: qrCodeWidth,
                height: qrCodeHeight,
            });
            //Add data
            this.drawTextWithUnderline(page, 'Sender', 20, 345, font, 12, true);
            this.drawTextWithUnderline(page, 'Account Name : ', 20, 330, font, 8, false);
            this.drawTextWithUnderline(page, accountName, 83, 330, dataFont, 8, false);
            this.drawTextWithUnderline(page, 'Account Number : ', 250, 330, font, 8, false);
            this.drawTextWithUnderline(page, accountNumber, 321, 330, dataFont, 8, false);
            this.drawTextWithUnderline(page, 'Contact Person : ', 20, 315, font, 8, false);
            this.drawTextWithUnderline(page, senderContactPerson, 86, 315, dataFont, 8, false);
            this.drawTextWithUnderline(page, 'Contact Number : ', 250, 315, font, 8, false);
            this.drawTextWithUnderline(page, senderContactNumber, 320, 315, dataFont, 8, false);
            this.drawTextWithUnderline(page, 'Address : ', 20, 300, font, 8, false);
            this.drawTextWithUnderline(page, senderAddress, 60, 300, dataFont, 8, false);
            page.drawLine({
                start: { x: 0, y: 290 },
                end: { x: page.getWidth(), y: 290 },
                thickness: 1,
                color: rgb(0, 0, 0),
            });

            this.drawTextWithUnderline(page, 'Receiver', 20, 270, font, 12, true);
            this.drawTextWithUnderline(page, 'Contact Person : ', 20, 255, font, 8, false);
            this.drawTextWithUnderline(page, receiverContactPerson, 86, 255, dataFont, 8, false);
            this.drawTextWithUnderline(page, 'Contact Number : ', 250, 255, font, 8, false);
            this.drawTextWithUnderline(page, receiverContactNumber, 320, 255, dataFont, 8, false);
            this.drawTextWithUnderline(page, 'Address : ', 20, 240, font, 8, false);
            this.drawTextWithUnderline(page, receiverAddress, 60, 240, dataFont, 8, false);
            page.drawLine({
                start: { x: 0, y: 230 },
                end: { x: page.getWidth(), y: 230 },
                thickness: 1,
                color: rgb(0, 0, 0),
            });

            this.drawTextWithUnderline(page, 'Shipment', 20, 210, font, 12, true);
            this.drawTextWithUnderline(page, 'COD : ', 20, 195, font, 8, false);
            this.drawTextWithUnderline(page, COD, 45, 195, dataFont, 8, false);
            this.drawTextWithUnderline(page, 'ABS Fees : ', 250, 195, font, 8, false);
            this.drawTextWithUnderline(page, absFees, 294, 195, dataFont, 8, false);
            this.drawTextWithUnderline(page, 'Total : ', 465, 195, font, 8, false);
            this.drawTextWithUnderline(page, total, 491, 195, dataFont, 8, false);
            this.drawTextWithUnderline(page, 'Content : ', 20, 180, font, 8, false);
            this.drawTextWithUnderline(page, content, 58, 180, dataFont, 8, false);
            this.drawTextWithUnderline(page, 'Weight : ', 250, 180, font, 8, false);
            this.drawTextWithUnderline(page, weight, 284, 180, dataFont, 8, false);
            this.drawTextWithUnderline(page, 'Pieces : ', 465, 180, font, 8, false);
            this.drawTextWithUnderline(page, pieces, 496, 180, dataFont, 8, false);
            this.drawTextWithUnderline(page, 'Service Type : ', 20, 165, font, 8, false);
            this.drawTextWithUnderline(page, serviceType, 76, 165, dataFont, 8, false);
            this.drawTextWithUnderline(page, 'Ref : ', 250, 165, font, 8, false);
            this.drawTextWithUnderline(page, ref, 269, 165, dataFont, 8, false);
            this.drawTextWithUnderline(page, 'Special Instructions : ', 20, 150, font, 8, false);
            this.drawTextWithUnderline(page, specialInstructions, 103, 150, dataFont, 8, false);
            page.drawLine({
                start: { x: 0, y: 140 },
                end: { x: page.getWidth(), y: 140 },
                thickness: 1,
                color: rgb(0, 0, 0),
            });
            this.drawTextWithUnderline(page, 'Delivery Details', 20, 120, font, 12, true);
            this.drawTextWithUnderline(page, 'Received By : ', 20, 105, font, 8, false);
            this.drawTextWithUnderline(page, 'Date : ', 250, 105, font, 8, false);
            this.drawTextWithUnderline(page, 'Time : ', 465, 105, font, 8, false);
            this.drawTextWithUnderline(page, 'Recipient Type : ', 20, 90, font, 8, false);
            this.drawTextWithUnderline(page, 'National ID Number : ', 20, 75, font, 8, false);

            const boxWidth = 240;
            const boxHeight = 15;
            const boxX = 140;
            const boxY = 70;
            const borderWidth = 1;
            const borderColor = rgb(0, 0, 0);
            const fillColor = rgb(1, 1, 1);

            // Draw the rectangle
            page.drawRectangle({
                x: boxX,
                y: boxY,
                width: boxWidth,
                height: boxHeight,
                borderWidth: borderWidth,
                borderColor: borderColor,
                color: fillColor,
            });


            // Draw the vertical lines inside the rectangle
            const lineX = boxX + borderWidth;
            const lineY = boxY;
            const lineHeight = boxHeight;

            for (let i = 1; i <= 13; i++) {
                const lineStartX = lineX + ((boxWidth / 14) * i);
                page.drawLine({
                    start: { x: lineStartX, y: lineY },
                    end: { x: lineStartX, y: lineY + lineHeight },
                    thickness: borderWidth,
                    color: borderColor,
                });
            }

            // Save the PDF document to a buffer
            const pdfBytes = await pdfDoc.save();
            return Buffer.from(pdfBytes);
        }
        catch (err) {
            console.log(err);
            throw new Error(`Could not generate AWB. Error: ${err}`);
        }
    }

    async drawTextWithUnderline(page: PDFPage, text: string, x: number, y: number, font: PDFFont, size: number, underline: boolean): Promise<void> {
        page.drawText(text, { x, y, font, size });

        if (underline) {
            const textWidth = font.widthOfTextAtSize(text, size);
            const lineOffset = 2;
            page.drawLine({
                start: { x, y: y - lineOffset },
                end: { x: x + textWidth, y: y - lineOffset },
                thickness: 1,
                color: rgb(0, 0, 0),
            });
        }
    }
}
