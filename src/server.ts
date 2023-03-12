import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import contactLogTypesRouter from './Backend/ship_ContactLogTypes/Route';
import AuthenticationRouter from './Backend/authentication/Route';
import verifyJWT from './Middlewares/verifyJWT';
import UsersRouter from './Backend/sys_Users/Route';
import callResultsRouter from './Backend/cc_CallResults/Route';
import callStatusRouter from './Backend/cc_CallStatus/Route';
import callTypesRouter from './Backend/cc_CallTypes/Route';
import messageStatusRouter from './Backend/cs_MessageStatus/Route';
import templateTypesRouter from './Backend/cs_TemplateTypes/Route';
import branchesRouter from './Backend/cmp_Branches/Route';
import departmentsRouter from './Backend/cmp_Departments/Route';
import infoRouter from './Backend/cmp_Info/Route';
import titlesRouter from './Backend/cmp_Titles/Route';
import vehicleTypesRouter from './Backend/cmp_VehicleTypes/Route';
import bankDetailsRouter from './Backend/cust_BankDetails/Route';
import mobileCashRouter from './Backend/cust_MobileCash/Route';
import paymentMethodsRouter from './Backend/cust_PaymentMethods/Route';
import salesChannelTypesRouter from './Backend/cust_SalesChannelTypes/Route'
import serviceTypesRouter from './Backend/cust_ServiceTypes/Route'
import walletDetailsRouter from './Backend/cust_WalletDetails/Route'
import locationsRouter from './Backend/cust_Locations/Route'
import subAccountsRouter from './Backend/cust_SubAccounts/Route'
import packageTypesRouter from './Backend/ship_PackageTypes/Route';
import pickupTypesRouter from './Backend/ship_PickupTypes/Route';
import reasonsRouter from './Backend/ship_Reasons/Route';
import recipientTypesRouter from './Backend/ship_RecepientsTypes/Route';
import shipmentTypesRouter from './Backend/ship_ShipmentTypes/Route';
import productsRouter from './Backend/ship_Products/Route';

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
callResultsRouter(app);
callStatusRouter(app);
callTypesRouter(app);
messageStatusRouter(app);
templateTypesRouter(app);
branchesRouter(app);
departmentsRouter(app);
infoRouter(app);
titlesRouter(app);
vehicleTypesRouter(app);
bankDetailsRouter(app);
mobileCashRouter(app);
paymentMethodsRouter(app);
salesChannelTypesRouter(app);
serviceTypesRouter(app);
walletDetailsRouter(app);
locationsRouter(app);
subAccountsRouter(app);
packageTypesRouter(app);
pickupTypesRouter(app);
reasonsRouter(app);
recipientTypesRouter(app);
shipmentTypesRouter(app);
productsRouter(app);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port http://${address}:${process.env.PORT}`);
});

export default app;
