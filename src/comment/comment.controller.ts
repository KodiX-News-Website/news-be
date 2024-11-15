import { Controller, Get, Param } from '@nestjs/common';
import { CommentService } from './comment.service';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get('post/:postId')
  async findAllByPostId(@Param('postId') postId: number) {
    const comments = await this.commentService.findAllByPostId(postId);
    return comments;
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const comment = await this.commentService.findOne(id);
    return comment;
  }
}
