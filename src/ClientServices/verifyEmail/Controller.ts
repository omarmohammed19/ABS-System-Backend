
import { sequelize } from '../../Config/database';
import Sequelize from 'sequelize';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { SubAccountsVerification } from '../../Backend/cust_SubAccountsVerification/Model';

dotenv.config();

const { nodemailerHost, nodemailerMail, nodemailerPassword, TOKEN_SECRET } = process.env;

export class VerifyEmailController {

  async verifyVerificationTypeID(subAccountID: number): Promise<string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        await SubAccountsVerification.update(
          {
            isVerified: true
          },
          {
            where: {
              subAccountID: subAccountID,
              verificationTypeID: 1,
            },
            transaction: t, // pass transaction object to query
          }
        );

        return 'Verification Type is verified';
      });
    } catch (err) {
      throw new Error(`Could not update verification Type. Error: ${err}`);
    }
  }

  async sendEmail(email: string): Promise<any> {
    try {
      return await sequelize.transaction(async (t) => {
        const query = 'EXEC [dbo].[p_GET_sys_UsersByCredentials] @userCred = :userCred , @Method = :Method';
        const replacements = { userCred: email, Method: 'client_login' };
        const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT, transaction: t };
        const result = await sequelize.query(query, options);

        //@ts-ignore
        const subAccountID = result[0].subAccountID;

        //@ts-ignore
        const token = jwt.sign({ subAccountID }, TOKEN_SECRET, { expiresIn: '24h' });

        const resetLink = `http://localhost:3001/verification-success?token=${token}`;

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
          //@ts-ignore
          to: result[0].email, // list of receivers
          subject: 'Email Verification',
          text: `Click on this link to verify your email: ${resetLink}`,
        };
        // send mail with defined transport object
        await transporter.sendMail(mailOptions);

        return { message: 'Mail sent successfully' };
      });
    } catch (err) {
      throw new Error(`Could not send mail. Error: ${err}`);
    }
  }
}
