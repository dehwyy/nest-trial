import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {Post} from "./posts.model";
import {postData} from "./posts-types";

@Injectable()
export class PostsService {
    constructor(
        @InjectModel(Post) private postRepo: typeof Post
    ) {}

    async createPost(data: postData) {
        const post = await this.postRepo.create(data)
        return post
    }

    async getPosts() {
        const posts = await this.postRepo.findAll()
        return posts
    }

}