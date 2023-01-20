import {Module, OnModuleInit} from '@nestjs/common';
import {MeilisearchService} from './meilisearch.service';
import { MeilisearchController } from './controller/meilisearch/meilisearch.controller';
import {HttpModule} from "@nestjs/axios";


@Module({
  imports: [HttpModule],
  controllers: [MeilisearchController],
  providers: [MeilisearchService]
})
export class MeilisearchModule implements OnModuleInit {
constructor(private srv: MeilisearchService) {}
  onModuleInit(): any {
    return this.srv.init();
  }

}
