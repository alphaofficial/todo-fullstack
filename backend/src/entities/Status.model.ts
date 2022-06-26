import {
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Field, ObjectType } from '@nestjs/graphql';
import { v4 } from 'uuid';
import { Item } from './Item.model';

@Entity()
@ObjectType()
export class Status {
  @Field()
  @PrimaryKey()
  id: string = v4();

  @Field()
  @Property()
  title: string;

  @Field(() => [Item])
  @OneToMany({ entity: () => Item, mappedBy: 'status' })
  items? = new Collection<Item>(this);

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
