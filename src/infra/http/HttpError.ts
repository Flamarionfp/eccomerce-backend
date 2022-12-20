import { AppError } from '@/App.error';
import { Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

export class HttpError {
  private statusCode: number;
  private message: string;

  constructor(error: AppError) {
    this.statusCode = error.statusCode;
    this.message = error.message;
  }

  public emit(@Req() request: Request, @Res() response: Response) {
    response.status(this.statusCode).json({
      statusCode: this.statusCode,
      message: this.message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
