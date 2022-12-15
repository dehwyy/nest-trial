import {Body, Controller, Get, Post, UseGuards} from "@nestjs/common";
import {UsersService} from "./users.service";
import {banData, roleData, userData} from "./users-types";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "./users.model";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";

@ApiTags("users")
@Controller("/users")
export class UsersController {
    constructor(
        private readonly userService: UsersService
    ) {}

    @ApiOperation({summary: "Создание пользователя"})
    @ApiResponse({status: 200, type: User})
    @Post("/reg")
    async createUser(@Body() dto: userData) {
        const resp = await this.userService.createUser(dto)
        return resp
    }

    @ApiOperation({summary: "получение пользователей"})
    @ApiResponse({status: 200, type: [User]})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Get("/get")
    async getUsers() {
        const resp = await this.userService.getALlUser()
        return resp
    }

    @ApiOperation({summary: "добавления роли пользователю / admins only"})
    @ApiResponse({status: 200, type: [User]})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post("/addRole")
    async addRole(@Body() data: roleData) {
        const user = await this.userService.addRole(data)
        return user
    }

    @ApiOperation({summary: "бан пользователя / admins only"})
    @ApiResponse({status: 200, type: [User]})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post("/banUser")
    async banUser(@Body() data: banData) {
        const user = await this.userService.banUser(data)
        return user
    }
}
