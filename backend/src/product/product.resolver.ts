import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Mutation(() => Product)
  async createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ): Promise<Product> {
    return await this.productService.create(createProductInput);
  }

  @Query(() => [Product], { name: 'products' })
  findAll() // @Args('limit', { type: () => Number, nullable: true }) limit?: number,
  // @Args('offset', { type: () => Number, nullable: true }) offset?: number,
  : Promise<Product[]> {
    return this.productService
      .findAll
      // limit, offset
      ();
  }

  @Query(() => Product, { name: 'product' })
  findOne(@Args('id') id: string) {
    return this.productService.findOne(id);
  }

  @Mutation(() => Product)
  updateProduct(
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    return this.productService.update(
      updateProductInput.id,
      updateProductInput,
    );
  }

  @Mutation(() => Product)
  removeProduct(@Args('id') id: string) {
    return this.productService.remove(id);
  }
}
