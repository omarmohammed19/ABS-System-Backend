import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import addressRouter from './Routes/AddressesRoute';
import addressTypeRouter from './Routes/addressTypesRoute';
import bankDetailsRouter from './Routes/bankDetailsRoute';

const app: express.Application = express();
const address: string = 'localhost';

dotenv.config();

app.use(bodyParser.json());
addressRouter(app);
addressTypeRouter(app);
bankDetailsRouter(app);


app.listen(process.env.PORT, () => {
    console.log(`Server running on port http://${address}:${process.env.PORT}`);
});

export default app;