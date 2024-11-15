import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CommentService {
  constructor(private readonly httpService: HttpService) {}

  async findAllByPostId(postId: number) {
    const response = await firstValueFrom(
      this.httpService.get(`https://jsonplaceholder.typicode.com/comments`, {
        params: { postId },
      }),
    );
    return response.data;
  }

  async findOne(id: number) {
    const response = await firstValueFrom(
      this.httpService.get(
        `https://jsonplaceholder.typicode.com/comments/${id}`,
      ),
    );
    return response.data;
  }
}
