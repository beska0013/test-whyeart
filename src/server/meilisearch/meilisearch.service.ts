import {Injectable} from '@nestjs/common';
import {MeiliSearch} from "meilisearch";
import {HttpService} from "@nestjs/axios";
import {defer, tap} from 'rxjs';
@Injectable()
export class MeilisearchService {
  constructor(private readonly http: HttpService) {}

  private readonly host = process.env['MS_HOST'] as string;
  private readonly masterAPI = process.env['MS_MASTER_API_KEY'] as string;
  private readonly adminAPI = process.env['MS_ADMIN_API'] as string;
  private readonly searchAPI = process.env['MS_SEARCH_API_KEY'] as string;

  init() {
    const client = new MeiliSearch({
      host: this.host,
      apiKey: this.adminAPI,
      headers: { Authorization: `Bearer ${this.masterAPI}`},
    });
    return defer(async () => await client.getIndexes())
      .pipe(
        tap(res => console.log(res))
      ).subscribe()
    // return client.getIndexes()
    //   .then((indexes) => Promise.all(indexes.results.map((index) => client.deleteIndex(index.uid))))
    //     .then(res => console.log(res) )

 }
  async addDoc(data: any) {
    return 'data'
  }




}
