import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Warehouse {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Field()
  @Column({
    type: 'varchar',
    length: 63,
    nullable: false,
    default: '',
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

  @Field(() => Int)
  @Column({
    type: 'int',
    nullable: false,
  })
  public size: number;
}
