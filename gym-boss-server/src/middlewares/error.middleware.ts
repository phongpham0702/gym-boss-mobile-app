import { NextFunction, Request, Response } from 'express';
import { HttpException } from '@/exceptions/httpException';
import { logger } from '@utils/logger';

export const ErrorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
  try {
    const status: number = error.status || 500;
    const message: string = error.message || 'Something went wrong :(';
    logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);
    return res.status(status).json({
      status: 'Error',
      code: status,
      message,
    });
  } catch (error) {
    next(error);
    return res.status(500).json({
      status: 'Error',
      code: status,
      message: error.message,
    });
  }
};
