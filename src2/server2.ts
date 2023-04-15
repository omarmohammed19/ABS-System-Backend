import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import mobileTypes_Routes from './Routes2/mobileTypesRoute';
import nearestBranchRoutes from './Routes2/nearestBranchRoutes';
import paymentInfoRoutes from './Routes2/paymentInfoRoutes';
import paymentMethodsRoutes from './Routes2/paymentMethodsRoutes';
import pricePlansRoutes from './Routes2/pricePlansRoutes';
import productRoutes from './Routes2/productRoutes';
import salesChannelsRoutes from './Routes2/salesChannelsRoutes';
import salesChannelTypeRoutes from './Routes2/salesChannelTypeRoutes';
import servicesRoutes from './Routes2/ServicesRoutes';
import servicesTypes_endpoints from './Routes2/servicesTypesRoute';
import subAccount_endpoints from './Routes2/subAccountRoute';
import telephoneNumber_endpoints from './Routes2/telephoneNumberRoute';
import telephoneTypes_endpoints from './Routes2/telephoneTypesRoute';
import walletDetails_endpoints from './Routes2/walletDetailsRoute';
import webUser_endpoints from './Routes2/webUsersRoute';
import Zones_endpoints from './Routes2/zonesRoute';
import custInfo_router from './Routes2/custInfoRoute';
import deliverylocations_Route from './Routes2/deliverylocationsRoutes';
import emails_Route from './Routes2/EmailsRoute';
import emailTypes_Route from './Routes2/emailTypesRoute';
import governorates_Route from './Routes2/GovernorateRoute';
import legalPapers_Route from './Routes2/legalPapersRoutes';
import legalPaperType_Route from './Routes2/legalPaperTypeRoute';
import mainAccount_Route from './Routes2/mainAccountRoute';
import mobileCash_Route from './Routes2/mobileCashRoutr';
import mobileNumber_Route from './Routes2/mobileNumberRoute';
import addressRouter from './Routes2/AddressesRoute';
import addressTypeRouter from './Routes2/addressTypesRoute';
import bankDetailsRouter from './Routes2/bankDetailsRoute';
import bankNamesRouter from './Routes2/bankNamesRoute';
import branchesRouter from './Routes2/BranchesRoute';
import citiesRouter from './Routes2/CitiesRoute';
import companyInfoRouter from './Routes2/companyInfoRoute';
import contactPersonRouter from './Routes2/contactPersonRoute';
import contactPersonTypesRouter from './Routes2/contactPersonTypesRoute';
import countriesRouter from './Routes2/CountriesRoute';
import cors from 'cors';
import register_router from './Routes2/RegisterRoute';
import customers_router from './Routes2/CustomersRoutes';
import pricePlanNameRoutes from './Routes2/pricePlanNameRoute';
import imageRouter from './Routes2/uploadFilesRoute';
import handleLoginRouter from './Routes2/authRoute';
import conversationRouter from './Routes2/ChatRoutes/conversationRoute';
import messageRouter from './Routes2/ChatRoutes/messagesRoutes';
import newsRoutes from './Routes2/NewsRoutes';
import rolesRoutes from './Routes2/RolesRoute';
import mail_route from './Routes2/mailRoute';
import { ticketCategories_endpoints } from './Routes2/ticketCategoriesRoutes';

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

register_router(app);
mobileTypes_Routes(app);
nearestBranchRoutes(app);
paymentInfoRoutes(app);
paymentMethodsRoutes(app);
pricePlansRoutes(app);
productRoutes(app);
salesChannelsRoutes(app);
salesChannelTypeRoutes(app);
servicesRoutes(app);
servicesTypes_endpoints(app);
subAccount_endpoints(app);
telephoneNumber_endpoints(app);
telephoneTypes_endpoints(app);
walletDetails_endpoints(app);
webUser_endpoints(app);
Zones_endpoints(app);
custInfo_router(app);
deliverylocations_Route(app);
emails_Route(app);
emailTypes_Route(app);
governorates_Route(app);
legalPapers_Route(app);
legalPaperType_Route(app);
mainAccount_Route(app);
mobileCash_Route(app);
mobileNumber_Route(app);
addressRouter(app);
addressTypeRouter(app);
bankDetailsRouter(app);
bankNamesRouter(app);
branchesRouter(app);
companyInfoRouter(app);
contactPersonRouter(app);
contactPersonTypesRouter(app);
countriesRouter(app);
customers_router(app);
pricePlanNameRoutes(app);
citiesRouter(app);
pricePlanNameRoutes(app);
citiesRouter(app);
customers_router(app);
handleLoginRouter(app);
conversationRouter(app);
messageRouter(app);
newsRoutes(app);
rolesRoutes(app);
mail_route(app);
ticketCategories_endpoints(app);

app.use('/images', imageRouter);

app.listen(process.env.PORT2, () => {
  console.log(`Server running on port http://${address}:${process.env.PORT2}`);
});

export default app;
