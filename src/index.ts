import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import test_Routes from './Handler/test';

const app: express.Application = express();
const address: string = 'localhost';

dotenv.config();

app.use(bodyParser.json());
test_Routes(app);


app.listen(process.env.PORT, () => {
    console.log(`Server running on port http://${address}:${process.env.PORT}`);
});

export default app;