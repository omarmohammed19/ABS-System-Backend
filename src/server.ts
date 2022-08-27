import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import mobileTypes_Routes from './Routes/mobileTypesRoute';
import nearestBranchRoutes from './Routes/nearestBranchRoutes';
import paymentInfoRoutes from './Routes/paymentInfoRoutes';
import paymentMethodsRoutes from './Routes/paymentMethodsRoutes';
import pricePlansRoutes from './Routes/pricePlansRoutes';
import productRoutes from './Routes/productRoutes';
import salesChannelsRoutes from './Routes/salesChannelsRoutes';
import salesChannelTypeRoutes from './Routes/salesChannelTypeRoutes';
import servicesRoutes from './Routes/ServicesRoutes';
import servicesTypes_endpoints from './Routes/servicesTypesRoute';
import subAccount_endpoints from './Routes/subAccountRoute';
import telephoneNumber_endpoints from './Routes/telephoneNumberRoute';
import telephoneTypes_endpoints from './Routes/telephoneTypesRoute';
import walletDetails_endpoints from './Routes/walletDetailsRoute';
import webUser_endpoints from './Routes/webUsersRoute';
import Zones_endpoints from './Routes/zonesRoute';
import custInfo_router from './Routes/custInfoRoute';
import deliverylocations_Route from './Routes/deliverylocationsRoutes';
import emails_Route from './Routes/EmailsRoute';
import emailTypes_Route from './Routes/emailTypesRoute';
import governorates_Route from './Routes/GovernorateRoute';
import legalPapers_Route from './Routes/legalPapersRoutes';
import legalPaperType_Route from './Routes/legalPaperTypeRoute';
import mainAccount_Route from './Routes/mainAccountRoute';
import mobileCash_Route from './Routes/mobileCashRoutr';
import mobileNumber_Route from './Routes/mobileNumberRoute';
import addressRouter from './Routes/AddressesRoute';
import addressTypeRouter from './Routes/addressTypesRoute';
import bankDetailsRouter from './Routes/bankDetailsRoute';
import bankNamesRouter from './Routes/bankNamesRoute';
import branchesRouter from './Routes/BranchesRoute';
import citiesRouter from './Routes/CitiesRoute';
import companyInfoRouter from './Routes/companyInfoRoute';
import contactPersonRouter from './Routes/contactPersonRoute';
import contactPersonTypesRouter from './Routes/contactPersonTypesRoute';
import countriesRouter from './Routes/CountriesRoute';
import cors from 'cors';
import register_router from './Routes/RegisterRoute';
import pricePlanNameRoutes from './Routes/pricePlanNameRoute';
import imageRouter from './Routes/uploadFilesRoute';

const corsOptions = {
  origin: 'http://localhost:3001',
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
pricePlanNameRoutes(app);
citiesRouter(app);
pricePlanNameRoutes(app);
citiesRouter(app);
app.use('/images', imageRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port http://${address}:${process.env.PORT}`);
});

export default app;
