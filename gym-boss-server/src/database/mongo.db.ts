import mongoose, { Mongoose } from 'mongoose';
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

export class MongoDatabase{
  private connectURL: string = `${DB_URL}`;
  private connectOption: object = {}
  private connection: Mongoose;
  private static instance: MongoDatabase;

  private constructor() {
    handleEventConnection(mongoose.connection);
    if (NODE_ENV !== 'production') {
      mongoose.set('debug', true);
    }
  }
  
  public static getInstance(): MongoDatabase{
    if(!this.instance){
      this.instance = new MongoDatabase()
    }
    return this.instance;
  }

  public async connectDB() {
    try {
      this.connection = await mongoose.connect(this.connectURL,this.connectOption);
    } 
    catch (error) {
      logger.error(error);
      process.exit(1);
    }
    
  }

  public getConnection():Mongoose{
    return this.connection;
  }
}

