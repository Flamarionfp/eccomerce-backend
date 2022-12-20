import { AppError } from '@/App.error';

export class UserName {
  private readonly name: string;

  get value(): string {
    return this.name;
  }

  constructor(text: string) {
    const splitedName = text.split(' ');

    if (splitedName.some((name) => name.length < 2))
      throw new AppError('Invalid name');

    if (splitedName.length < 2)
      throw new AppError('You must inform your first and last name');

    this.name = text;
  }
}
