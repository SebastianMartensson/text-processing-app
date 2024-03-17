import express from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import cors from 'cors';

import routes from './routes/index';
import * as middlewares from './middlewares';

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use('/api/v1', routes);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;