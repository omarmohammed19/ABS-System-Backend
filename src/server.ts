import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import contactLogTypesRouter from './Backend/ship_ContactLogTypes/Route';
import AuthenticationRouter from './Backend/authentication/Route';
import verifyJWT from './Middlewares/verifyJWT';
import UsersRouter from './Backend/sys_Users/Route';
import branchesRouter from './Backend/cmp_Branches/Route';
import departmentsRouter from './Backend/cmp_Departments/Route';
import infoRouter from './Backend/cmp_Info/Route';
import titlesRouter from './Backend/cmp_Titles/Route';
import vehicleTypesRouter from './Backend/cmp_VehicleTypes/Route';

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
branchesRouter(app);
departmentsRouter(app);
infoRouter(app);
titlesRouter(app);
vehicleTypesRouter(app);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port http://${address}:${process.env.PORT}`);
});

export default app;
