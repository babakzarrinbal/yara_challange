import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(createProductInput: CreateProductInput) {
    const product = await this.productRepository.create(createProductInput);
    return await this.productRepository.save(product);
  }

  async findAll() {
    // limit: number = 10, offset: number = 0
    return await this.productRepository.find({
      // take: limit,
      // skip: offset,
    });
  }

  async findOne(id: string) {
    return await this.productRepository.findOne({ where: { id } });
  }

  async update(id: string, updateProductInput: UpdateProductInput) {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new Error(`Product with id ${id} not found`);
    }
    Object.assign(product, updateProductInput);
    return await this.productRepository.save(product);
  }

  async remove(id: string) {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new Error(`Product with id ${id} not found`);
    }

    await this.productRepository.remove(product);
    return product;
  }
}
