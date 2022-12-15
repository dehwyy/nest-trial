import {Injectable} from "@nestjs/common";
import {Role} from "./roles.model";
import {InjectModel} from "@nestjs/sequelize";
import {createRole} from "./roles-types";


@Injectable({})
export class RolesService {
    constructor(
        @InjectModel(Role) private userRole: typeof Role
    ) {}
    async createRole(data: createRole) {
        const role = await this.userRole.create(data)
        return role
    }

    async getRoleByValue(value: string) {
        const role = await this.userRole.findOne({where: {value}})
        return role
    }
}