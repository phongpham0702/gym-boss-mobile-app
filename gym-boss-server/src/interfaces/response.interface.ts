import { Response } from 'express';

export interface IResponse{
    statusCode: number;
    responseMessage: string;
    metadata: object;
    send(res: Response): Response;
}