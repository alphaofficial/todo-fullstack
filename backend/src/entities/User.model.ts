import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { ObjectType } from '@nestjs/graphql';
import { v4 } from 'uuid';

@Entity()
@ObjectType()
export class User {
  @PrimaryKey()
  id: string = v4();

  @Property()
  email: string;

  @Property()
  password: string;

  @Property({ defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt: Date;

  @Property({
    onUpdate: () => `CURRENT_TIMESTAMP`,
    nullable: true,
  })
  updatedAt?: Date;

  @Property({ nullable: true })
  deletedAt?: Date;
}
