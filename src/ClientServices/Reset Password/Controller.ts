import { sequelize } from '../../Config/database';
import Sequelize from 'sequelize';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { Users } from '../../Backend/sys_Users/Model';
import bcrypt from 'bcrypt';

dotenv.config();
const { nodemailerHost, nodemailerMail, nodemailerPassword, SALT_ROUNDS, TOKEN_SECRET, pepper } = process.env;

export class ResetPasswordController {
  async getUserDetails(userCred: string): Promise<any> {
    try {
      return await sequelize.transaction(async (t) => {
        const query = 'EXEC [dbo].[p_GET_sys_UsersByCredentials] @userCred = :userCred, @Method = :Method';
        const replacements = { userCred: userCred, Method: 'client_login' };
        const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT, transaction: t };
        const result = await sequelize.query(query, options);

        if (result.length < 1) {
          throw new Error('User not found');
        }

        //@ts-ignore
        const userID = result[0].ID;


        //@ts-ignore
        const token = jwt.sign({ userID }, TOKEN_SECRET, { expiresIn: '0.16h' });

        const resetLink = `http://localhost:3001/resetpassword?token=${token}`;

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
        //@ts-ignore
        console.log(result[0].email);


        const mailOptions = {
          from: '"Adham Ahmed" <adhamahmeds2312@gmail.com>', // sender address
          //@ts-ignore
          to: result[0].email, // list of receivers
          subject: 'Reset Password', // Subject of the email
          text: `Click the following link to reset your password: ${resetLink}` // OTP message
        };
        // send mail with defined transport object
        await transporter.sendMail(mailOptions);

        return { message: 'Mail sent successfully' };
      });
    } catch (err) {
      throw new Error(`Could not send mail. Error: ${err}`);
    }
  }

  async confirmResetPassword(userID: number, password: string): Promise<any> {
    try {
      return await sequelize.transaction(async (t) => {
        //@ts-ignore
        const hashedPassword = bcrypt.hashSync(password + pepper, parseInt(SALT_ROUNDS));

        await Users.update(
          {
            password: hashedPassword,
          },
          {
            where: {
              ID: userID,
            },
            transaction: t,
          }
        );
        return { message: 'Password updated successfully' };
      });

    }
    catch (err) {
      throw new Error(`Could not update password. Error: ${err}`);
    }

  }

}
