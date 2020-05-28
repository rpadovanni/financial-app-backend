import 'reflect-metadata';

import express from 'express';
import cors from 'cors';
import routes from './routes/routes';
import { createConnection } from 'typeorm';

const app = express();
createConnection();

app.use(cors());
app.use(routes);

app.listen(3333);
