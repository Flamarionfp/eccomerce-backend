import {
  Controller,
  Delete,
  HttpStatus,
  Param,
  Req,
  Res,
} from '@nestjs/common';
import { DeleteUser } from '@/app/use-cases';
import { Request, Response } from 'express';
import { HttpError } from '../../HttpError';

interface DeleteUserParams {
  id: string;
}

@Controller('user')
export class DeleteUserController {
  constructor(private readonly deleteUser: DeleteUser) {}

  @Delete(':id')
  async handle(
    @Param() params: DeleteUserParams,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    try {
      const { id } = params;

      await this.deleteUser.execute(id);

      return response
        .status(HttpStatus.OK)
        .json({ message: 'User deleted successfully' });
    } catch (err) {
      return new HttpError(err).emit(request, response);
    }
  }
}
