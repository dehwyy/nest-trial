import {Table, Model, Column, DataType, BelongsToMany, HasMany, ForeignKey} from "sequelize-typescript";
import {ApiOperation, ApiProperty, ApiResponse} from "@nestjs/swagger";
import {userData} from "./users-types";
import {UserRoles} from "../roles/users-roles.model";
import {Role} from "../roles/roles.model";
import {Post} from "../posts/posts.model";


@Table({
    tableName: "users"
})
export class User extends Model<User, userData> {
    @ApiProperty({example: "1", description: "ID"})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ApiProperty({example: "vova@mail.ru", description: "email"})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string

    @ApiProperty({example: "randompass123", description: "password"})
    @Column({type: DataType.STRING, allowNull: false})
    password: string

    @ApiProperty({example: "isBanned", description: "false"})
    @Column({type: DataType.BOOLEAN, defaultValue: false})
    banned: boolean

    @ApiProperty({example: "", description: "zabanili"})
    @Column({type: DataType.STRING, allowNull: true})
    banReason: string

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[]

    @HasMany(() => Post)
    posts: Post[]
}