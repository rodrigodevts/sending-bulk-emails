import 'dotenv/config';
import 'reflect-metadata';

import express from 'express';
import routes from 'routes';

import '@libs/mongoose/connection';

const app = express();

app.use(express.json());
app.use(routes);

export default app;