"use strict";
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { Mail } from './Model';
import { Users } from '../../Backend/sys_Users/Model';
import { Info } from '../../Backend/cust_Info/Model';
import { Emails } from '../../Backend/cust_Emails/Model';
import { MainAccounts } from '../../Backend/cust_MainAccounts/Model';
import { SubAccounts } from '../../Backend/cust_SubAccounts/Model';
import { ContactNumbers } from '../../Backend/cust_ContactNumbers/Model';
import { ContactPersons } from '../../Backend/cust_ContactPersons/Model';
import { sequelize } from '../../Config/database';

dotenv.config();

const { nodemailerHost, nodemailerMail, nodemailerPassword } = process.env;

export class mailController {

	async matchOTP(email: string, OTP: string, username: string, contactNumber: string): Promise<boolean> {
		try {
			let res: boolean = false;
			await sequelize.transaction(async (t) => {
				const result = await Mail.findOne({ where: { email: email, OTP: OTP, isActive: true }, transaction: t });
				if (result) {
					res = true;
					const subAccountID: any = await Users.findOne({ where: { username: username }, attributes: ['subAccountID'], transaction: t });
					const mainAccountID: any = await SubAccounts.findOne({ where: { ID: Number(subAccountID?.subAccountID) }, attributes: ['mainAccountID'], transaction: t });
					const infoID: any = await MainAccounts.findOne({ where: { ID: Number(mainAccountID?.mainAccountID) }, attributes: ['custInfoID'], transaction: t });
					const contactPersonID: any = await ContactNumbers.findOne({ where: { contactNumber: contactNumber, contactTypeID: 4 }, attributes: ['contactPersonID'], transaction: t });
					await Mail.update({ isActive: false }, { where: { email: email }, transaction: t });
					await Users.update({ isActive: true }, { where: { username: username }, transaction: t });
					await Emails.update({ isActive: true }, { where: { email: email, emailTypeID: 4 }, transaction: t });
					await ContactNumbers.update({ isActive: true }, { where: { contactNumber: contactNumber, contactTypeID: 4 }, transaction: t });
					await SubAccounts.update({ isActive: true }, { where: { ID: subAccountID?.subAccountID }, transaction: t });
					await MainAccounts.update({ isActive: true }, { where: { ID: mainAccountID?.mainAccountID }, transaction: t });
					await Info.update({ isActive: true }, { where: { ID: infoID?.custInfoID }, transaction: t });
					await ContactPersons.update({ isActive: true }, { where: { ID: contactPersonID?.contactPersonID }, transaction: t });
				}
				else {
					res = false;
				}
			});
			return res;
		} catch (err) {

			throw new Error(`Could not get OTP. Error: ${err}`);
		}
	}

	async sendMail(to: string): Promise<void> {
		let otp: any = '';
		try {
			const result = await Mail.findOne({ where: { email: to, isActive: true } });
			if (result) {
				await sequelize.transaction(async (t) => {
					await Mail.update({ isActive: false }, { where: { email: to }, transaction: t });
				});
			}

			// Generate a random OTP
			otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
			await sequelize.transaction(async (t) => {
				await Mail.create({
					email: to,
					OTP: otp,
					isActive: true,
				}, { transaction: t });
			});
		} catch (err) {
			console.log(err);
		}
		let hostname = nodemailerHost;
		let username = nodemailerMail;
		let password = nodemailerPassword;

		let transporter = nodemailer.createTransport({
			host: hostname,
			port: 465,
			secure: true,
			auth: {
				user: username,
				pass: password,
			}
		});

		const mailOptions = {
			from: '"Adham Ahmed" <adhamahmeds2312@gmail.com>', // sender address
			to: to, // list of receivers
			subject: 'Registration OTP', // Subject of the email
			text: `Your OTP for registration is: ${otp}` // OTP message
		};
		// send mail with defined transport object
		let info = await transporter.sendMail(mailOptions);
		console.log("Message sent: %s", info.response);
	}
}