import { randomUUID } from 'crypto';
import { Replace } from '../../../helpers';
import { UserEmail } from './user-email';
import { UserName } from './user-name';
import { UserPassword } from './user-password';

interface UserProps {
  email: UserEmail;
  password: UserPassword;
  name: UserName;
  createdAt: Date;
}

export class User {
  private _id: string;
  private props: UserProps;

  constructor(props: Replace<UserProps, { createdAt?: Date }>) {
    this._id = randomUUID();

    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public set id(id: string) {
    this._id = id;
  }

  public get id(): string {
    return this._id;
  }

  public set email(email: UserEmail) {
    this.props.email = email;
  }

  public get email(): UserEmail {
    return this.props.email;
  }

  public set password(password: UserPassword) {
    this.props.password = password;
  }

  public get password(): UserPassword {
    return this.props.password;
  }

  public set name(name: UserName) {
    this.props.name = name;
  }

  public get name(): UserName {
    return this.props.name;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }
}
