/* eslint-disable prettier/prettier */
import mongoose from 'mongoose';
import { NODE_ENV, DB_URL } from '@config';
import { logger } from '@/utils/logger';

const CONNECT_STATUS ={
  CONNECTED: 'connected',
  DISCONNECTED: 'disconnected',
  RECONNECT: 'reconnected',
  ERROR: 'error',
};

const handleEventConnection = connection => {
  connection.on(CONNECT_STATUS.CONNECTED, function () {
    logger.silly(`Connect Database: ${this.name} connected`);
  }),

  connection.on(CONNECT_STATUS.DISCONNECTED, function () {
    logger.error(`Connect Database: ${this.name} disconnected`);
  }),

  connection.on(CONNECT_STATUS.RECONNECT, () => {
    logger.warn(`Connect Database: Reconnecting`);
  }),
  
  connection.on(CONNECT_STATUS.ERROR, err => {
    logger.error(`Connect Database: Error ${err}`);
  })

}


export const connectDB = async () => {
  const connectionConfig = {
    url: `${DB_URL}`,
    options: {},
  };

  if (NODE_ENV !== 'production') {
    mongoose.set('debug', true);
  }

  handleEventConnection(mongoose.connection);

  try {
    await mongoose.connect(connectionConfig.url, connectionConfig.options);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }

  
};
