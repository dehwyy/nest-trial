import {BelongsToMany, Column, DataType, Table, Model} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {UserRoles} from "./users-roles.model";
import {User} from "../users/users.model";

interface createRole {
    value: string
    password: string
}

@Table({tableName: "roles"})
export class Role extends Model<Role, createRole> {
    @ApiProperty({description: "ID", example: "1"})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ApiProperty({description: "name of the role", example: "ADMIN"})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    value: string

    @ApiProperty({description: "description of the role", example: "admin allows to manage other roles"})
    @Column({type: DataType.STRING, allowNull: false})
    description: string

    @BelongsToMany( () => User, () => UserRoles)
    users: User[]
}