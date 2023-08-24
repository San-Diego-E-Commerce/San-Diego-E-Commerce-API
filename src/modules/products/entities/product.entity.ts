import { randomUUID } from 'crypto';

export class Product {
  readonly id: string;
  name: string;
  category: string;
  description: string;
  price: string;

  constructor() {
    this.id = randomUUID();
  }
}
