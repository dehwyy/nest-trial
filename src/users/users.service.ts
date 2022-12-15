import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./users.model";
import {banData, roleData, userData} from "./users-types";
import {RolesService} from "../roles/roles.service";


@Injectable({})
export class UsersService {
    constructor(
        @InjectModel(User) private userRepo: typeof User,
        private roleService: RolesService
    ) {}

    async createUser(dto: userData) {
        const user = await this.userRepo.create(dto)
        const role = await this.roleService.getRoleByValue("USER")
        await user.$set("roles", [role.id])
        user.roles = [role]
        return user
    }

    async getALlUser() {
        const users = await this.userRepo.findAll({include: {all: true}})
        return users
    }

    async findUserByEmail(email: string) {
        const user = await this.userRepo.findOne({where: {email}, include: {all: true}})
        return user
    }

    async addRole(data: roleData) {
        const user = await this.userRepo.findByPk(data.userId)
        const role = await this.roleService.getRoleByValue(data.role)
        if (user && role) {
            await user.$add("roles", role.id)
            return user
        }
        throw new HttpException(`error in setting role to the user with id ${user.id}`, HttpStatus.NOT_FOUND)
    }

    async banUser(data: banData) {
        const user = await this.userRepo.findByPk(data.userId)
        if (user) {
            user.banned = true
            user.banReason = data.reason
            await user.save()
            return user
        }
        throw new HttpException(`error in banning user with id ${user.id}`, HttpStatus.NOT_FOUND)
    }
}