import { Controller, Get, HttpStatus, Query, Req, Res } from '@nestjs/common';
import { ListUsers } from '@/app/use-cases';
import { UserQueryProps } from '@/types';
import { Request, Response } from 'express';
import { HttpError } from '../../HttpError';

@Controller('user')
export class ListUsersController {
  constructor(private readonly listsUsers: ListUsers) {}

  @Get()
  async handle(
    @Query() query: UserQueryProps,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    try {
      const users = await this.listsUsers.execute(query);

      return response.status(HttpStatus.OK).json({ users });
    } catch (err) {
      return new HttpError(err).emit(request, response);
    }
  }
}
