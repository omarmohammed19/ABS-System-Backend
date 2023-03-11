import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import contactLogTypesRouter from './Backend/ship_ContactLogTypes/Route';
import AuthenticationRouter from './Backend/authentication/Route';
import verifyJWT from './Middlewares/verifyJWT';
import UsersRouter from './Backend/sys_Users/Route';
import bankDetailsRouter from './Backend/cust_BankDetails/Route';
import mobileCashRouter from './Backend/cust_MobileCash/Route';
import paymentMethodsRouter from './Backend/cust_PaymentMethods/Route';
import salesChannelTypesRouter from './Backend/cust_SalesChannelTypes/Route'
import serviceTypesRouter from './Backend/cust_ServiceTypes/Route'
import walletDetailsRouter from './Backend/cust_WalletDetails/Route'
import locationsRouter from './Backend/cust_Locations/Route'
import subAccountsRouter from './Backend/cust_SubAccounts/Route'

const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
};

const app: express.Application = express();
const address: string = 'localhost';

dotenv.config();

app.use(cors(corsOptions));

app.use(bodyParser.json());

//without authorization
AuthenticationRouter(app);
UsersRouter(app);

//with authorization
app.use(verifyJWT);
contactLogTypesRouter(app);
bankDetailsRouter(app);
mobileCashRouter(app);
paymentMethodsRouter(app);
salesChannelTypesRouter(app);
serviceTypesRouter(app);
walletDetailsRouter(app);
locationsRouter(app);
subAccountsRouter(app);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port http://${address}:${process.env.PORT}`);
});

export default app;
