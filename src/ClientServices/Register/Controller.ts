import { GuestModel } from './Model';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { sequelize } from '../../Config/database';
import Sequelize from 'sequelize';
import { InfoModel, Info } from '../../Backend/cust_Info/Model';
import { EmailsModel, Emails } from '../../Backend/cust_Emails/Model';
import { MainAccounts } from '../../Backend/cust_MainAccounts/Model';
import { SubAccounts } from '../../Backend/cust_SubAccounts/Model';
import { ContactNumbersModel, ContactNumbers } from '../../Backend/cust_ContactNumbers/Model';
import { UsersModel, Users } from '../../Backend/sys_Users/Model';
import { ContactPersonsModel, ContactPersons } from '../../Backend/cust_ContactPersons/Model';
import { SubAccountsVerification } from '../../Backend/cust_SubAccountsVerification/Model';
import { VerificationTypes } from '../../Backend/cust_VerificationTypes/Model';

dotenv.config();
const { SALT_ROUNDS, pepper } = process.env;

const checkAccountNumberDuplicate = async (accountNumber: String) => {
    // if in table re-generate random number and check
    const result: any = await MainAccounts.findOne({ where: { accountNumber: accountNumber } });
    if (result) {
        return true;
    }
    return false;
};

const generateAccountNumber = async () => {
    const min = 100000; // minimum 7-digit number (inclusive)
    const max = 999999; // maximum 7-digit number (inclusive)
    let accountNumber: any = '';
    let flag: any = true;
    while (flag) {
        const rand = Math.floor(Math.random() * (max - min + 1) + min);
        accountNumber = String(rand);
        flag = await checkAccountNumberDuplicate(accountNumber);
    }
    return accountNumber;
};
const currentDate = Sequelize.literal('GETDATE()');

export class UsersController {


    async validateEmail(email: string): Promise<any> {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        const isValidEmail = emailRegex.test(email);

        const EmailSpace = email.includes(' ');
        if (!isValidEmail || EmailSpace) {
            return { error: 'Invalid email' };
        }

        const emailExists = await Emails.findOne({ where: { email: email, emailTypeID: 4, isActive: true } });
        if (emailExists) {
            return { message: 'Email already exists' };
        }
        else {
            return { message: "Email validated" };
        }
    }

    async validateUsername(username: string): Promise<any> {
        const usernameRegex = /^[a-zA-Z0-9\s]{8,}$/;
        const isValidUsername = usernameRegex.test(username);

        if (!isValidUsername) {
            return { error: 'Invalid username' };
        }
        const usernameExists = await Users.findOne({ where: { username: username, isActive: true } });
        if (usernameExists) {
            return { message: 'Username already exists' };
        }
        else {
            return { message: "Username validated" };
        }
    }

    async validateMobile(contactNumber: string): Promise<any> {
        const contactNumberExists = await ContactNumbers.findOne({ where: { contactNumber: contactNumber, contactTypeID: 4, isActive: true } });
        if (contactNumberExists) {
            return { message: 'Phone number already exists' };
        }
        else {
            return { message: "Phone number validated" };
        }
    }

    async CreateUser(custInfo: InfoModel, email: EmailsModel, contactPerson: ContactPersonsModel, contactNumber: ContactNumbersModel, user: UsersModel, pricePlanID: number, clientTypeID: number): Promise<any> {
        try {

            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            const mobileRegex = /^0[0-9]{10}$/;
            const usernameRegex = /^[a-zA-Z0-9\s]{8,}$/;
            const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8,}$/;

            const isValidEmail = emailRegex.test(email.email);
            const isValidMobile = mobileRegex.test(contactNumber.contactNumber);
            const isValidUsername = usernameRegex.test(user.username);
            const isValidPassword = passwordRegex.test(user.password);
            const EmailSpace = email.email.includes(' ');
            const MobileSpace = contactNumber.contactNumber.includes(' ');
            const PasswordSpace = user.password.includes(' ');

            if (!isValidEmail || EmailSpace) {
                return { error: 'Invalid email' };
            }
            if (!isValidMobile || MobileSpace) {
                return { error: 'Invalid mobile number' };
            }
            if (!isValidUsername) {
                return { error: 'Invalid username' };
            }
            if (!isValidPassword || PasswordSpace) {
                return { error: 'Invalid password' };
            }

            const usernameExists = await Users.findOne({ where: { username: user.username, isActive: true } });
            if (usernameExists) {
                return { error: 'Username already exists' };
            }

            const emailExists = await Emails.findOne({ where: { email: email.email, emailTypeID: 4, isActive: true } });
            if (emailExists) {
                return { error: 'Email already exists' };
            }

            const contactNumberExists = await ContactNumbers.findOne({ where: { contactNumber: contactNumber.contactNumber, contactTypeID: 4, isActive: true } });
            if (contactNumberExists) {
                return { error: 'Phone number already exists' };
            }

            const accountNumber = await generateAccountNumber();
            await sequelize.transaction(async (t) => {
                const newCustInfo = await Info.create(
                    {
                        firstName: custInfo.firstName,
                        lastName: custInfo.lastName,
                        isActive: true
                    },
                    { transaction: t, returning: ['ID', 'firstName', 'lastName'] } // pass transaction object and specify returning column(s)
                );

                const newMainAccount = await MainAccounts.create(
                    {
                        mainAccountName: user.username,
                        accountNumber: accountNumber,
                        custInfoID: newCustInfo.ID,
                        clientTypeID: clientTypeID,
                        creationDate: currentDate,
                        isActive: true
                    },
                    { transaction: t, returning: ['ID'] }
                );

                const newSubAccount = await SubAccounts.create(
                    {
                        mainAccountID: newMainAccount.ID,
                        subAccountName: user.username,
                        accountNumber: accountNumber,
                        pricePlanID: pricePlanID,
                        creationDate: currentDate,
                        isActive: true
                    },
                    { transaction: t, returning: ['ID'] }
                );

                const newContactPerson = await ContactPersons.create(
                    {
                        subAccountID: newSubAccount.ID,
                        firstName: contactPerson.firstName,
                        lastName: contactPerson.lastName,
                        contactPersonTypeID: 4,
                        isActive: true
                    },
                    { transaction: t, returning: ['ID'] }
                );


                await Emails.create(
                    {
                        custInfoID: newCustInfo.ID,
                        email: email.email,
                        emailTypeID: 4,
                        contactPersonID: newContactPerson.ID,
                        isActive: true
                    },
                    { transaction: t }
                );

                await ContactNumbers.create(
                    {
                        subAccountID: newSubAccount.ID,
                        contactNumber: contactNumber.contactNumber,
                        contactTypeID: 4,
                        numberTypeID: 1,
                        contactPersonID: newContactPerson.ID,
                        isActive: true
                    },
                    { transaction: t }
                );

                //@ts-ignore
                const hashedPassword = bcrypt.hashSync(user.password + pepper, parseInt(SALT_ROUNDS));
                const newUser = await Users.create(
                    {
                        username: user.username,
                        password: hashedPassword,
                        subAccountID: newSubAccount.ID,
                        displayedName: newCustInfo.firstName + ' ' + newCustInfo.lastName,
                        roleID: clientTypeID === 3 ? 3 : clientTypeID === 2 ? 1 : 2,
                        isActive: true
                    },
                    { transaction: t, returning: ['ID'] }
                );

                const query = 'EXEC [dbo].[p_POST_sys_UserRoles]  @userID = :ID , @RoleIDs = :ROLES ';
                const replacements = { ID: newUser.ID, ROLES: clientTypeID === 3 ? 3 : clientTypeID === 2 ? 1 : 2 };
                const options = { replacements: replacements, type: Sequelize.QueryTypes.INSERT, transaction: t };
                await sequelize.query(query, options);

                await VerificationTypes.findAll({ where: { isActive: true }, transaction: t }).then(async (verificationTypes: any) => {
                    for (let i = 0; i < verificationTypes.length; i++) {
                        await SubAccountsVerification.create(
                            {
                                subAccountID: newSubAccount.ID,
                                verificationTypeID: verificationTypes[i].ID,
                                isVerified: false,
                                isActive: true
                            },
                            { transaction: t }
                        );
                    }
                });

                return true;
            });
            return true;
        } catch (err) {
            console.log(err);
            throw new Error(`Could not add new user. Error: ${err}`);
        }
    }
}