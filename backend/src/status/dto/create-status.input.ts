import { InputType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class CreateStatusInput {
  @Field()
  title: string;

  @Field(() => [String])
  @IsOptional()
  items?: string[];
}
