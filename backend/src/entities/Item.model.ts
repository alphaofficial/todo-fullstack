import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Field, ObjectType } from '@nestjs/graphql';
import { v4 } from 'uuid';
import { Status } from './Status.model';
import { User } from './User.model';

@Entity()
@ObjectType()
export class Item {
  @Field()
  @PrimaryKey()
  id: string = v4();

  @Field()
  @Property()
  title: string;

  @Field()
  @ManyToOne()
  status: Status;

  @Field()
  @ManyToOne({ nullable: true })
  user: User;

  @Field()
  @Property({ defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt: Date;

  @Field()
  @Property({
    onUpdate: () => `CURRENT_TIMESTAMP`,
    nullable: true,
  })
  updatedAt?: Date;

  @Field()
  @Property({ nullable: true })
  deletedAt?: Date;
}
