import {Body, Controller, Get, Post as PostMethod} from "@nestjs/common";
import {PostsService} from "./posts.service";
import {postData} from "./posts-types";
import {Post} from "./posts.model";

@Controller("/posts")
export class PostsController {
    constructor(
        private postService: PostsService
    ) {}
    @Get("/get")
    getPosts() {
        return this.postService.getPosts()
    }
    @PostMethod("/create")
    async createPost(@Body() data: postData) {
        const dt = await this.postService.createPost(data)
        return dt
    }

}