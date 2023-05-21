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
    async CreateGuestUser(custInfo: InfoModel, email: EmailsModel, contactPerson: ContactPersonsModel, contactNumber: ContactNumbersModel, user: UsersModel): Promise<any> {
        try {

            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            const mobileRegex = /^0[0-9]{10}$/;
            const usernameRegex = /^[a-zA-Z0-9]{8,}$/;
            const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8,}$/;

            const isValidEmail = emailRegex.test(email.email);
            const isValidMobile = mobileRegex.test(contactNumber.contactNumber);
            const isValidUsername = usernameRegex.test(user.username);
            const isValidPassword = passwordRegex.test(user.password);
            const EmailSpace = email.email.includes(' ');
            const MobileSpace = contactNumber.contactNumber.includes(' ');
            const UsernameSpace = user.username.includes(' ');
            const PasswordSpace = user.password.includes(' ');



            if (!isValidEmail || EmailSpace) {
                return { error: 'Invalid email' };
            }
            if (!isValidMobile || MobileSpace) {
                return { error: 'Invalid mobile number' };
            }
            if (!isValidUsername || UsernameSpace) {
                return { error: 'Invalid username' };
            }
            if (!isValidPassword || PasswordSpace) {
                return { error: 'Invalid password' };
            }

            const usernameExists = await Users.findOne({ where: { username: user.username } });
            if (usernameExists) {
                return { error: 'Username already exists' };
            }

            const emailExists = await Emails.findOne({ where: { email: email.email, emailTypeID: 4 } });
            if (emailExists) {
                return { error: 'Email already exists' };
            }

            const contactNumberExists = await ContactNumbers.findOne({ where: { contactNumber: contactNumber.contactNumber, contactTypeID: 4 } });
            if (contactNumberExists) {
                return { error: 'Phone number already exists' };
            }

            const accountNumber = await generateAccountNumber();
            await sequelize.transaction(async (t) => {
                const newCustInfo = await Info.create(
                    {
                        firstName: custInfo.firstName,
                        lastName: custInfo.lastName,
                        isActive: false
                    },
                    { transaction: t, returning: ['ID', 'firstName', 'lastName'] } // pass transaction object and specify returning column(s)
                );

                const newMainAccount = await MainAccounts.create(
                    {
                        mainAccountName: newCustInfo.firstName + ' ' + newCustInfo.lastName,
                        accountNumber: accountNumber,
                        custInfoID: newCustInfo.ID,
                        clientTypeID: 2,
                        creationDate: currentDate,
                        isActive: false
                    },
                    { transaction: t, returning: ['ID'] }
                );

                const newSubAccount = await SubAccounts.create(
                    {
                        mainAccountID: newMainAccount.ID,
                        subAccountName: newCustInfo.firstName + ' ' + newCustInfo.lastName,
                        accountNumber: accountNumber,
                        pricePlanID: 1,
                        productTypeID: 1,
                        creationDate: currentDate,
                        isActive: false
                    },
                    { transaction: t, returning: ['ID'] }
                );

                const newContactPerson = await ContactPersons.create(
                    {
                        subAccountID: newSubAccount.ID,
                        firstName: contactPerson.firstName,
                        lastName: contactPerson.lastName,
                        contactPersonTypeID: 4,
                        isActive: false
                    },
                    { transaction: t, returning: ['ID'] }
                );


                await Emails.create(
                    {
                        custInfoID: newCustInfo.ID,
                        email: email.email,
                        emailTypeID: 4,
                        contactPersonID: newContactPerson.ID,
                        isActive: false
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
                        isActive: false
                    },
                    { transaction: t }
                );

                //@ts-ignore
                const hashedPassword = bcrypt.hashSync(user.password + pepper, parseInt(SALT_ROUNDS));
                await Users.create(
                    {
                        username: user.username,
                        password: hashedPassword,
                        subAccountID: newSubAccount.ID,
                        displayedName: newCustInfo.firstName + ' ' + newCustInfo.lastName,
                        roleID: 3,
                        isActive: false
                    },
                    { transaction: t }
                );
            });
            return true;
        } catch (err) {
            console.log(err);
            throw new Error(`Could not add new user. Error: ${err}`);
        }
    }
}