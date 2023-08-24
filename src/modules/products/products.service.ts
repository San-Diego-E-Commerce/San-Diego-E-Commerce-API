import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private productsRepository: ProductsRepository) {}

  async create(createProductDto: CreateProductDto) {
    const findName = await this.productsRepository.findOne(
      createProductDto.name,
    );
    if (findName) {
      throw new ConflictException('Produto já existente');
    }
    const product = await this.productsRepository.create(createProductDto);

    return product;
  }

  async findAll() {
    return this.productsRepository.findAll();
  }

  async findOne(id: string) {
    const findProduct = await this.productsRepository.findOne(id);

    if (!findProduct) {
      throw new NotFoundException('Produto não encontrado');
    }

    return this.productsRepository.findOne(id);
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const findProduct = await this.productsRepository.findOne(id);

    if (!findProduct) {
      throw new NotFoundException('Produto não encontrado');
    }

    return this.productsRepository.update(id, updateProductDto);
  }

  async remove(id: string) {
    const findProduct = await this.productsRepository.findOne(id);

    if (!findProduct) {
      throw new NotFoundException('Produto não encontrado');
    }

    return this.productsRepository.delete(id);
  }
}
