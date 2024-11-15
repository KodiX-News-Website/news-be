import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.postService.findOne(id);
  }
}
