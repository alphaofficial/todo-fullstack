import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { ItemsService } from './items.service';
import { ItemsResolver } from './items.resolver';
import { Item } from '../entities/Item.model';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Item] })],
  providers: [ItemsResolver, ItemsService],
})
export class ItemsModule {}
