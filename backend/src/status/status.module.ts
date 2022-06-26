import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { StatusService } from './status.service';
import { StatusResolver } from './status.resolver';
import { Status } from '../entities/Status.model';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Status] })],
  providers: [StatusResolver, StatusService],
})
export class StatusModule {}
