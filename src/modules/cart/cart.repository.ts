import { CreateCartDto } from './dto/create-cart.dto';
import { Cart } from './entities/cart.entity';

export abstract class CartRepository {
  abstract create(data: CreateCartDto): Promise<Cart>;
  abstract findOne(userId: string): Promise<Cart>;
}
