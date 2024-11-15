import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class PostService {
  constructor(private readonly httpService: HttpService) {}

  findAll(): Observable<any> {
    const apiUrl = `${process.env.API_JSON_PLACEHOLDER}/posts`;
    return this.httpService.get(apiUrl).pipe(map((response) => response.data));
  }

  findOne(id: number): Observable<any> {
    const apiUrl = `${process.env.API_JSON_PLACEHOLDER}/posts/${id}`;
    return this.httpService.get(apiUrl).pipe(map((response) => response.data));
  }
}
