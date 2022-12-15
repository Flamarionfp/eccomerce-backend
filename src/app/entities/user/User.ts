import { randomUUID } from 'crypto';
import { Replace } from 'src/helpers/Replace';

interface UserProps {
  name: string;
  email: string;
  password: string;
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

  public set email(email: string) {
    this.props.email = email;
  }

  public get email(): string {
    return this.props.email;
  }

  public set password(password: string) {
    this.props.password = password;
  }

  public get password(): string {
    return this.props.password;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get name(): string {
    return this.props.email;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }
}
