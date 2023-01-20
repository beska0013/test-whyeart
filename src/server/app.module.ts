import { Module } from '@nestjs/common';
import { AngularUniversalModule } from '@nestjs/ng-universal';
import { join } from 'path';
import { AppServerModule } from '../main.server';
import { MeilisearchModule } from './meilisearch/meilisearch.module';
import {ConfigModule} from "@nestjs/config";




@Module({
  imports: [
    AngularUniversalModule.forRoot({
      bootstrap: AppServerModule,
      viewsPath: join(process.cwd(), 'dist/why-earth-UI/browser')
    }),
    MeilisearchModule,
    ConfigModule.forRoot({envFilePath: '.env'}),
  ]
})
export class AppModule {}
