import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateItemInput {
  @Field()
  title: string;

  @Field()
  status: string;

  @Field({ nullable: true })
  user?: string;
}
