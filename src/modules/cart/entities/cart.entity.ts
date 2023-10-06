import { randomUUID } from 'crypto';

export class Cart {
  readonly id: string;
  readonly user_id: string;

  constructor() {
    this.id = randomUUID();
  }
}
