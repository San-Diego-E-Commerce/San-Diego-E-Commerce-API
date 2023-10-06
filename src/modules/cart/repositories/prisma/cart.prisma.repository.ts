import { Injectable } from '@nestjs/common';
import { CartRepository } from '../../cart.repository';
import { PrismaService } from 'src/database/prisma.service';
import { Cart } from '../../entities/cart.entity';
import { plainToInstance } from 'class-transformer';
import { CreateCartDto } from '../../dto/create-cart.dto';

@Injectable()
export class CartPrismaRepository implements CartRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCartDto) {
    const cart = new Cart();
    Object.assign(cart, {
      ...data,
    });
    return cart;
  }
  async findOne(user_id: string): Promise<Cart> {
    const cart = await this.prisma.cart.findUnique({
      where: { user_id },
    });
    return plainToInstance(Cart, cart);
  }
}
