import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import test_Routes from './Controllers/test';
import servicesTypes_endpoints from './Routes/servicesTypesRoute';
import subAccount_endpoints from './Routes/subAccountRoute';
import telephoneNumber_endpoints from './Routes/telephoneNumberRoute';
import telephoneTypes_endpoints from './Routes/telephoneTypesRoute';

const app: express.Application = express();
const address: string = 'localhost';

dotenv.config();

app.use(bodyParser.json());
test_Routes(app);
servicesTypes_endpoints(app);
subAccount_endpoints(app);
telephoneNumber_endpoints(app);
telephoneTypes_endpoints(app);
app.listen(process.env.PORT, () => {
  console.log(`Server running on port http://${address}:${process.env.PORT}`);
});

export default app;
