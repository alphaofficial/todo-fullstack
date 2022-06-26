import { CreateStatusInput } from './create-status.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateStatusInput extends PartialType(CreateStatusInput) {
  @Field()
  id: string;
}
