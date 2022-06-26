import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppService } from './app.service';
import { ItemsModule } from './items/items.module';
import { StatusModule } from './status/status.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { join } from 'path';

const isProduction = process.env.NODE_ENV === 'production';
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: !isProduction,
      debug: !isProduction,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    MikroOrmModule.forRoot(),
    ItemsModule,
    StatusModule,
  ],
  providers: [AppService],
})
export class AppModule {}
