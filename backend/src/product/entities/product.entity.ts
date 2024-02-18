import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Product {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Field()
  @Column({
    type: 'varchar',
    length: 63,
    nullable: false,
  })
  public name: string;

  @Field()
  @Column({
    type: 'varchar',
    length: 256,
    nullable: false,
    default: '',
  })
  public description: string;

  @Field()
  @Column({
    type: 'boolean',
    nullable: false,
  })
  public isHazardous: boolean;

  @Field(() => Int)
  @Column({
    type: 'int',
    nullable: false,
  })
  public size: number;
}
