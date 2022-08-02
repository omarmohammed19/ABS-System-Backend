import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
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

const app: express.Application = express();
const address: string = 'localhost';

dotenv.config();

app.use(bodyParser.json());
addressRouter(app);
addressTypeRouter(app);
bankDetailsRouter(app);
bankNamesRouter(app);
branchesRouter(app);
citiesRouter(app);
companyInfoRouter(app);
contactPersonRouter(app);
contactPersonTypesRouter(app);  
countriesRouter(app);


app.listen(process.env.PORT, () => {
    console.log(`Server running on port http://${address}:${process.env.PORT}`);
});

export default app;