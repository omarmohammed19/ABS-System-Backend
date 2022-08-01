import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import test_Routes from './Controllers/test';
import mobileTypes_Routes from './Routes/mobileTypesRoute';
import nearestBranchRoutes from './Routes/nearestBranchRoutes';
import paymentInfoRoutes from './Routes/paymentInfoRoutes';
import paymentMethodsRoutes from './Routes/paymentMethodsRoutes';
import pricePlansRoutes from './Routes/pricePlansRoutes';

const app: express.Application = express();
const address: string = 'localhost';

dotenv.config();

app.use(bodyParser.json());
test_Routes(app);
mobileTypes_Routes(app);
nearestBranchRoutes(app);
paymentInfoRoutes(app);
paymentMethodsRoutes(app);
pricePlansRoutes(app);





app.listen(process.env.PORT, () => {
    console.log(`Server running on port http://${address}:${process.env.PORT}`);
});

export default app;