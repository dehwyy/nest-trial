import {Body, Controller, Get, Param, Post} from "@nestjs/common";
import {RolesService} from "./roles.service";
import {createRole} from "./roles-types";
import {validateEach} from "@nestjs/common/utils/validate-each.util";

@Controller("/roles")
export class RolesController {
    constructor(
        private rolesService: RolesService
    ) {}

    @Post("/create")
    async create(@Body() data: createRole) {
        const newRole = await this.rolesService.createRole(data)
        return newRole
    }

    @Get("/:value")
    async getByValue(@Param("value") value: string) {
        return this.rolesService.getRoleByValue(value)
    }
}