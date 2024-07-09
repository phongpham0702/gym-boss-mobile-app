import { ReasonMessage } from "@/constants/HttpStatusCode/reasonMessage";
import { StatusCode } from "@/constants/HttpStatusCode/statusCode";

export class HttpException extends Error {
  public status: number;
  public message: any;

  constructor(status: number, message: any) {
    super(message);
    this.status = status;
    this.message = message;
  }

  static BAD_REQUEST( message : any = ReasonMessage.BAD_REQUEST): HttpException{
    return new HttpException(StatusCode.BAD_REQUEST, message);
  }

  static SERVER_ERROR():HttpException{
    return new HttpException(StatusCode.INTERNAL_SERVER_ERROR, ReasonMessage.INTERNAL_SERVER_ERROR);
  }

  static AUTH_ERROR(message: any = ReasonMessage.UNAUTHORIZED):HttpException{
    return new HttpException(StatusCode.UNAUTHORIZED,message);
  }

}
