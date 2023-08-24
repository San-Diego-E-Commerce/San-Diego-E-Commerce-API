import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductsRepository } from './products.repository';
import { PrismaService } from 'src/database/prisma.service';
import { ProductsPrismaRepository } from './repositories/prisma/products.prisma.repository';

@Module({
  controllers: [ProductsController],
  providers: [
    ProductsService,
    PrismaService,
    {
      provide: ProductsRepository,
      useClass: ProductsPrismaRepository,
    },
  ],
  exports: [ProductsService],
})
export class ProductsModule {}
