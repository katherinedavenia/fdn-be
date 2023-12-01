import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Response } from 'express';

interface ErrorResponse {
  message: string[];
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let responseBody: { errors: string[] };
    let httpStatus: number;

    if (exception instanceof HttpException) {
      httpStatus = exception.getStatus();
      const message = (exception.getResponse() as ErrorResponse).message;
      responseBody = {
        errors: typeof message === 'string' ? [message] : message,
      };
    } else {
      httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
      responseBody = {
        errors: ['internal server error'],
      };

      this.logger.error(exception);
    }

    httpAdapter.reply(response, responseBody, httpStatus);
  }
}
