import { InputType, Int, Field } from '@nestjs/graphql';
import { Product } from 'src/product/entities/product.entity';
import { Warehouse } from 'src/warehouse/entities/warehouse.entity';
import { OneToOne } from 'typeorm';

@InputType()
export class InventoryInput {
  @Field(() => Int)
  public qty: number;

  @Field(() => Product)
  @OneToOne(() => Product)
  public product: Product;

  @Field(() => Warehouse)
  @OneToOne(() => Warehouse)
  public warehouse: Warehouse;
}
