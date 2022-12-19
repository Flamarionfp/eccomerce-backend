export class UserEmail {
  private readonly email: string;

  get value(): string {
    return this.email;
  }

  private verifyEmailPattern(email: string): boolean {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return regex.test(email);
  }

  constructor(text: string) {
    const isValidEmail = this.verifyEmailPattern(text);

    if (!isValidEmail) throw new Error('Invalid email');

    this.email = text;
  }
}
