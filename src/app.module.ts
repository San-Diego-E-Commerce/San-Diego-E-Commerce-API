import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { UsersService } from './modules/users/users.service';
import { AuthModule } from './modules/auth/auth.module';
import { ProductsModule } from './modules/products/products.module';
import { CartModule } from './modules/cart/cart.module';

@Module({
  imports: [UsersModule, AuthModule, ProductsModule, CartModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
