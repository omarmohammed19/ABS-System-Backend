import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';

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

const app: express.Application = express();
const address: string = 'localhost';

dotenv.config();

app.use(bodyParser.json());

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


app.listen(process.env.PORT, () => {
    console.log(`Server running on port http://${address}:${process.env.PORT}`);
});

export default app;