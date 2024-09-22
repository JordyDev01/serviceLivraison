import express from 'express';
import Routes from './routes/serviceLivraison.js';
import { config } from 'dotenv';

config();

const app = express();

app.use(express.json());

app.use('/api', Routes);



export default app;