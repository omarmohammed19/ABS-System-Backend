import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

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


app.listen(process.env.PORT, () => {
  console.log(`Server running on port http://${address}:${process.env.PORT}`);
});

export default app;
