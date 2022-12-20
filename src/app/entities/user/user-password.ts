import { AppError } from '@/App.error';

export class UserPassword {
  private readonly password: string;

  get value(): string {
    return this.password;
  }

  private verifyPasswordLenght(password: string): boolean {
    return password.length >= 8 && password.length <= 255;
  }

  constructor(text: string) {
    if (!this.verifyPasswordLenght(text)) {
      throw new AppError(
        'Password must be at least 8 characters long and at most 255 characters long',
      );
    }

    this.password = text;
  }
}
