import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateWarehouseInput {
  @Field({ nullable: true, defaultValue: '' })
  name: string;

  @Field({ nullable: true, defaultValue: '' })
  description: string;

  @Field(() => Int)
  size: number;
}
