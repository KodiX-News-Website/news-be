import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [HttpModule, AuthModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
