import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { PrismaService } from 'src/database/prisma.service';
import { CartRepository } from './cart.repository';
import { CartPrismaRepository } from './repositories/prisma/cart.prisma.repository';

@Module({
  controllers: [CartController],
  providers: [
    CartService,
    PrismaService,
    {
      provide: CartRepository,
      useClass: CartPrismaRepository,
    },
  ],
  exports: [CartService],
})
export class CartModule {}
