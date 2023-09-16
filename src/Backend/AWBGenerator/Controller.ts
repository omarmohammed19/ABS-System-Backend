import { PDFDocument, StandardFonts, PDFPage, PDFFont, rgb } from 'pdf-lib';
import fs from 'fs';
import fontkit from '@pdf-lib/fontkit';
import bwipjs from 'bwip-js';
import QRCode from 'qrcode';
import path from 'path';
import { sequelize } from '../../Config/database';
import Sequelize from 'sequelize';
import { ShipmentServices } from '../ship_Services/Model';



export class AWBController {

    async generatePdf(AWBs: string[]): Promise<Buffer> {
        try {
            // Create a new PDF document
            const pdfDoc = await PDFDocument.create();

            for (const AWB of AWBs) {
                //call a stored procedure from the database to fill the fields in the pdf
                const query = 'EXEC [dbo].[p_Generate_AWB] @Method = :Method, @AWB= :AWB';
                const replacements = { Method: 'GET_ByAWB', AWB: AWB };
                const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT };
                const result: any = await sequelize.query(query, options);

                // Add a new page to the PDF document
                const page = pdfDoc.addPage([595.28, 419.53]);

                // Get the default font
                const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
                pdfDoc.registerFontkit(fontkit);
                //load font and embed it to pdf document
                const fontBytes = fs.readFileSync(path.join(__dirname, '../../../fonts/Cairo-Light.ttf'));
                const dataFont = await pdfDoc.embedFont(fontBytes);
                // Generate the barcode image using bwip-js

                const shipmentID = result[0].AWB.toString() ? result[0].AWB.toString() : '000000000000';

                const barcodeOptions = {
                    bcid: 'code128', // Replace with your desired barcode format
                    text: shipmentID, // Replace with your desired barcode value
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

                const mainAccountName = result[0]['Main Account Name']?.toString() ? result[0]['Main Account Name']?.toString() : '';
                const subAccountName = result[0]['Sub Account Name']?.toString() ? result[0]['Sub Account Name']?.toString() : '';
                const accountNumber = result[0]['Account Number']?.toString() ? result[0]['Account Number']?.toString() : '';
                const contactPerson = result[0].firstName?.toString() + " " + result[0].lastName?.toString() ? result[0].firstName?.toString() + " " + result[0].lastName?.toString() : '';
                const contactNumber = result[0].contactNumber?.toString() ? result[0].contactNumber?.toString() : '';
                const address = result[0].buildingNumber?.toString() + ", " + result[0].streetName?.toString() + ", " + result[0].floorNumber?.toString() + ", " + result[0].apartmentNumber?.toString() + ", " + result[0].enCityName?.toString() ? result[0].buildingNumber?.toString() + ", " + result[0].streetName?.toString() + ", " + result[0].floorNumber?.toString() + ", " + result[0].apartmentNumber?.toString() + ", " + result[0].enCityName?.toString() : '';

                this.drawTextWithUnderline(page, 'Sender', 20, 345, font, 12, true);
                this.drawTextWithUnderline(page, 'Account Name : ', 20, 330, font, 8, false);
                this.drawTextWithUnderline(page, mainAccountName + " - " + subAccountName, 83, 330, dataFont, 8, false);
                this.drawTextWithUnderline(page, 'Account Number : ', 250, 330, font, 8, false);
                this.drawTextWithUnderline(page, accountNumber, 321, 330, dataFont, 8, false);
                this.drawTextWithUnderline(page, 'Contact Person : ', 20, 315, font, 8, false);
                this.drawTextWithUnderline(page, contactPerson, 86, 315, dataFont, 8, false);
                this.drawTextWithUnderline(page, 'Contact Number : ', 250, 315, font, 8, false);
                this.drawTextWithUnderline(page, contactNumber, 320, 315, dataFont, 8, false);
                this.drawTextWithUnderline(page, 'Address : ', 20, 300, font, 8, false);
                this.drawTextWithUnderline(page, address, 60, 300, dataFont, 8, false);
                page.drawLine({
                    start: { x: 0, y: 290 },
                    end: { x: page.getWidth(), y: 290 },
                    thickness: 1,
                    color: rgb(0, 0, 0),
                });

                const receiverName = result[0]['Rec First Name']?.toString() + " " + result[0]['Rec Last Name']?.toString() ? result[0]['Rec First Name']?.toString() + " " + result[0]['Rec Last Name']?.toString() : '';
                const receiverContactNumber = result[0]['Rec Contact Number']?.toString() ? result[0]['Rec Contact Number']?.toString() : '';
                const receiverAddress = result[0]['Rec Build']?.toString() + ", " + result[0]['Rec Street Name']?.toString() + ", " + result[0]['Rec Floor']?.toString() + ", " + result[0]['Rec Apartment']?.toString() + ", " + result[0]['Rec City']?.toString() ? result[0]['Rec Build']?.toString() + ", " + result[0]['Rec Street Name']?.toString() + ", " + result[0]['Rec Floor']?.toString() + ", " + result[0]['Rec Apartment']?.toString() + ", " + result[0]['Rec City']?.toString() : '';

                this.drawTextWithUnderline(page, 'Receiver', 20, 270, font, 12, true);
                this.drawTextWithUnderline(page, 'Contact Person : ', 20, 255, font, 8, false);
                this.drawTextWithUnderline(page, receiverName, 86, 255, dataFont, 8, false);
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


                const services = await ShipmentServices.findAll({ where: { AWB: AWB } });

                const servicesList = services.map((service) => {
                    return service.serviceID;
                });

                const HideFees = servicesList.includes(4) ? true : false;

                const cash = result[0].Cash.toString() ? result[0].Cash.toString() : '';
                const absFees = result[0]['ABS Fees'].toString() ? result[0]['ABS Fees'].toString() : '';
                const total = result[0].Total.toString() ? result[0].Total.toString() : '';
                const weight = result[0].Weight.toString() ? result[0].Weight.toString() : '';
                const pieces = result[0]['No Of Pcs'].toString() ? result[0]['No Of Pcs'].toString() : '';

                const contents = result[0].Contents.toString() ? result[0].Contents.toString() : '';
                const serviceType = result[0].enService.toString() ? result[0].enService.toString() : '';
                const ref = result[0].Ref.toString() ? result[0].Ref.toString() : '';
                const specialInstructions = result[0]['Special Instructions'].toString() ? result[0]['Special Instructions'].toString() : '';
                const runnerCode = result[0]['Runner Code'].toString() ? result[0]['Runner Code'].toString() : '';

                this.drawTextWithUnderline(page, 'Shipment', 20, 210, font, 12, true);
                this.drawTextWithUnderline(page, 'COD : ', 20, 195, font, 8, false);
                this.drawTextWithUnderline(page, HideFees ? total + " EGP" : cash + " EGP", 45, 195, dataFont, 8, false);
                this.drawTextWithUnderline(page, 'ABS Fees : ', 250, 195, font, 8, false);
                this.drawTextWithUnderline(page, HideFees ? "0 EGP" : absFees + " EGP", 294, 195, dataFont, 8, false);
                this.drawTextWithUnderline(page, 'Total : ', 465, 195, font, 8, false);
                this.drawTextWithUnderline(page, total + " EGP", 491, 195, dataFont, 8, false);
                this.drawTextWithUnderline(page, 'Content : ', 20, 180, font, 8, false);
                this.drawTextWithUnderline(page, contents, 58, 180, dataFont, 8, false);
                this.drawTextWithUnderline(page, 'Weight : ', 250, 180, font, 8, false);
                this.drawTextWithUnderline(page, weight + " KG", 284, 180, dataFont, 8, false);
                this.drawTextWithUnderline(page, 'Pieces : ', 465, 180, font, 8, false);
                this.drawTextWithUnderline(page, pieces, 496, 180, dataFont, 8, false);
                this.drawTextWithUnderline(page, 'Service Type : ', 20, 165, font, 8, false);
                this.drawTextWithUnderline(page, serviceType, 76, 165, dataFont, 8, false);
                this.drawTextWithUnderline(page, 'Ref : ', 250, 165, font, 8, false);
                this.drawTextWithUnderline(page, ref, 269, 165, dataFont, 8, false);
                this.drawTextWithUnderline(page, 'Special Instructions : ', 20, 150, font, 8, false);
                this.drawTextWithUnderline(page, specialInstructions, 103, 150, dataFont, 8, false);
                this.drawTextWithUnderline(page, 'Runner Code : ', 465, 165, font, 8, false);
                this.drawTextWithUnderline(page, runnerCode, 522, 165, dataFont, 8, false);
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

    async drawTextWithUnderline(page: PDFPage, text: any, x: number, y: number, font: PDFFont, size: number, underline: boolean): Promise<void> {
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
