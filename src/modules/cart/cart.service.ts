import { Injectable, NotFoundException } from '@nestjs/common';
import { CartRepository } from './cart.repository';
import { CreateCartDto } from './dto/create-cart.dto';

@Injectable()
export class CartService {
  constructor(private cartRepository: CartRepository) {}

  async create(createCartDto: CreateCartDto) {
    return this.cartRepository.create(createCartDto);
  }

  async findOne(user_id: string) {
    const findCart = await this.cartRepository.findOne(user_id);

    if (!findCart) {
      throw new NotFoundException('Carrinho não encontrado');
    }
    return this.cartRepository.findOne(user_id);
  }
}
