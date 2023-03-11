import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import contactLogTypesRouter from './Backend/ship_ContactLogTypes/Route';
import AuthenticationRouter from './Backend/authentication/Route';
import verifyJWT from './Middlewares/verifyJWT';
import UsersRouter from './Backend/sys_Users/Route';
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
