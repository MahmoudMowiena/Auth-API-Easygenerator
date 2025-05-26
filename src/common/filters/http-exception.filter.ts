import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { ErrorResponse } from '../errors/error-response';
import { ErrorMessages } from '../errors/error-messages';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = ErrorMessages.INTERNAL_ERROR;

    if (exception instanceof HttpException) {
      status = exception.getStatus();

      const res = exception.getResponse();
      if (typeof res === 'string') {
        message = res;
      } else if (typeof res === 'object' && res !== null) {
        const resObj = res as any;

        if (Array.isArray(resObj.message)) {
          message = resObj.message.join(', ');
        } else {
          message = resObj.message || message;
        }
      }
    } else {
      Logger.error(
        `Unhandled exception at ${request.method} ${request.url}`,
        exception instanceof Error && exception.stack ? exception.stack : undefined,
        'AllExceptionsFilter',
      );
    }

    const errorResponse: ErrorResponse = {
      statusCode: status,
      message,
    };

    response.status(status).json(errorResponse);
  }
}
