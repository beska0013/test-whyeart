import {Body, Controller, Get, Post} from '@nestjs/common';
import {MeilisearchService} from "../../meilisearch.service";

@Controller('meilisearch')
export class MeilisearchController {
  constructor(private srv: MeilisearchService) {}

  @Get()
  get(){
    return 'works';
  }

  @Post('add')
  addDoc(@Body() body: any) {
    return this.srv.addDoc(body);
  }

}
