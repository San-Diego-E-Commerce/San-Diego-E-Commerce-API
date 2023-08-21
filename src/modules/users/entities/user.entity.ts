import { Exclude } from 'class-transformer';
import { randomUUID } from 'node:crypto';

export class User {
  readonly id: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;

  @Exclude()
  password: string;

  constructor() {
    this.id = randomUUID();
  }
}
