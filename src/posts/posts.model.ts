import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "../users/users.model";
import {postData} from "./posts-types";

interface createPost {
    title: string
    content: string
    userId: number
}

@Table({tableName: "posts"})
export class Post extends Model<Post, createPost> {
    @Column({type: DataType.INTEGER, autoIncrement: true, unique: true, allowNull: false, primaryKey: true})
    id: number

    @Column({type: DataType.STRING})
    title: string

    @Column({type: DataType.STRING})
    content: string

    @BelongsTo(() => User)
    author: User

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number
}