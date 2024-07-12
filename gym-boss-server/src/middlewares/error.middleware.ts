
import { NextFunction, Request, Response } from 'express';
import { HttpException } from '@/exceptions/HttpException';
import { logger } from '@utils/logger';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ErrorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(error);
    const status: number = error.status || 500;
    const message: string =  (status === 500 || !status) ? 'Something went wrong :(' : error.message ;
    logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);
    return res.status(status).json({
      status: 'Error',
      code: status,
      message,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Error',
      message: error.message,
    });
  }
};
