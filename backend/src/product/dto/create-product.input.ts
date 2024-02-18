import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  @Field()
  name: string;

  @Field({ nullable: true, defaultValue: '' })
  description: string;

  @Field(() => Int)
  size: number;

  @Field({ defaultValue: false, nullable: true })
  isHazardous: boolean;
}
