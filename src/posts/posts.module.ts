import {Module} from "@nestjs/common";
import {PostsController} from "./posts.controller";
import {PostsService} from "./posts.service";
import {SequelizeModule} from "@nestjs/sequelize";
import {Post} from "./posts.model";

@Module({
    providers: [PostsService],
    controllers: [PostsController],
    imports: [
        SequelizeModule.forFeature([Post])
    ]
})
export class PostsModule{}