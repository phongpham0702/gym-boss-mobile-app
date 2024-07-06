import { ReasonMessage } from './../constants/HttpStatusCode/reasonMessage';
import { StatusCode } from './../constants/HttpStatusCode/statusCode';
import { Response } from 'express';
import { IResponse } from './../interfaces/response.interface';


class SuccessResponse implements IResponse{
    public statusCode: number;
    public responseMessage: string;
    public metadata: object;

    constructor(statusCode: number, responseMessage: string, metadata: object) {
        this.statusCode = statusCode;
        this.responseMessage = responseMessage;
        this.metadata = metadata;
    }
    
    static OK(metadata: object) : SuccessResponse {
        return new SuccessResponse(StatusCode.OK, ReasonMessage.OK, metadata);
    }

    static CREATED(metadata: object) : SuccessResponse {
        return new SuccessResponse(StatusCode.CREATED, ReasonMessage.CREATED, metadata);
    }

    send(res: Response): Response {
        return res.status(this.statusCode).json(this)
    }
}


export default SuccessResponse;