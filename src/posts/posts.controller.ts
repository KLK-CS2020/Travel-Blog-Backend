import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete, UseInterceptors, UploadedFile, Query
} from "@nestjs/common";
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { LikePostDto } from './dto/like-post.dto';
import { FileInterceptor } from "@nestjs/platform-express";

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  /**
   * returns a list of all posts created by the user
   * @param id
   */
  @Get('own/userId/:id')
  async findAll(@Param('id') id: string) {
    return await this.postsService.findAll(id);
  }

  /**
   * returns a list of all posts liked by the user
   * @param id
   */
  @Get('liked/userId/:id')
  async findAllSaved(@Param('id') id: string) {
    return await this.postsService.findAllSaved(id);
  }

  @Get('getOne/:id')
  async findOne(@Param('id') id: string) {
    return await this.postsService.findOne(id);
  }

  @Get('search')
  async search(@Query('keyword') keyword: string,
               @Query('location') location: string) {
    return await this.postsService.search(keyword, location);
  }

  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    return await this.postsService.create(createPostDto);
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post('file/:postId')
  async uploadFile(@Param('postId') postId: string, @UploadedFile() file: Express.Multer.File) {
    return await this.postsService.addPhoto(file ? file.buffer : null, postId);
  }

  /**
   * performs an action of user adding the post to favourites
   * @param likePostDto
   */
  @Post('like')
  async savePost(@Body() likePostDto: LikePostDto) {
    return await this.postsService.favourite(likePostDto);
  }

  /**
   * performs an action of giving a thumb up
   * @param likePostDto
   */
  @Post('up')
  async likePost(@Body() likePostDto: LikePostDto) {
    return await this.postsService.like(likePostDto);
  }
  
  /**
   * performs an action of giving a thumb down
   * @param likePostDto
   */
  @Post('down')
  async dislikePost(@Body() likePostDto: LikePostDto) {
    return await this.postsService.dislike(likePostDto);
  }

  /**
   * checks if the post is already saved by the user
   * @param likePostDto
   */
  @Post('isfavourite')
  async isFavourite(@Body() likePostDto: LikePostDto) {
    return await this.postsService.checkFavourite(likePostDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }
}
