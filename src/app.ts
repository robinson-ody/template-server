import 'express-async-errors';

import cors from 'cors';
import { config } from 'dotenv';
import express from 'express';
import { Settings } from 'luxon';
import morgan from 'morgan';
import { NotFoundError } from './errors/not-found';
import { current_user } from './middlewares/current-user';
import { error_handler } from './middlewares/error-handler';
import { router_v1 } from './routes/v1';

Settings.defaultZone = 'UTC+7';

config();
const app = express();
const is_production = process.env.NODE_ENV === 'production';
const is_test = process.env.NODE_ENV === 'test';

if (!is_production && !is_test) app.use(morgan('dev'));
app.use(express.json());
app.use(current_user);
app.use(cors());

app.use('/api/v1', router_v1);
app.all('/api/**', () => {
  throw new NotFoundError('route not found');
});

app.use('/images', express.static('./images'));
app.use(error_handler);

export { app };
