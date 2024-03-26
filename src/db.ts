import mongoose from 'mongoose';
import { randomLightChalk } from 'ody-utils';

const DB_NAME = process.env.DB_NAME;
mongoose.connect(`mongodb://127.0.0.1:27017/${DB_NAME}`);

mongoose.connection.on('connected', () => {
  randomLightChalk(`🔗 connected to mongodb: ${DB_NAME}`);
});

mongoose.connection.on('error', error => {
  console.error('mongodb connection error', error);
});

mongoose.connection.on('disconnected', () => {
  randomLightChalk('\n❌ mongodb disconnected');
});

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  randomLightChalk('❗️ mongodb terminated');
  process.exit(0);
});
