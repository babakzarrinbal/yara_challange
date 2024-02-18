import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { Product } from 'src/product/entities/product.entity';
import { Warehouse } from 'src/warehouse/entities/warehouse.entity';

@ObjectType()
@Entity()
export class Inventory {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Field()
  @Column({
    type: 'timestamp with time zone',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  public timestamp: Date;

  @Field(() => Int)
  @Column({
    type: 'int',
    nullable: false,
  })
  public qty: number;

  @Field(() => Product)
  @ManyToOne(() => Product)
  @JoinColumn({ name: 'productId' })
  public product: Product;

  @Field(() => Warehouse)
  @ManyToOne(() => Warehouse)
  @JoinColumn({ name: 'warehouseId' })
  public warehouse: Warehouse;

  @Field()
  @Column({
    type: 'enum',
    enum: ['import', 'export'],
    nullable: false,
  })
  public type: 'import' | 'export';
}
