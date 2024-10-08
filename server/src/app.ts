import express from 'express';
import router from './routes';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors())

app.use('/api', router);

export default app;