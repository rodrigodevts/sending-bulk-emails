import 'dotenv/config';
import 'reflect-metadata';

import express from 'express';
import routes from './api/v1';

import '@shared/adapters';
import '@shared/infra/mongoose/connection';

const app = express();

app.use(express.json());
app.use(routes);

export default app;