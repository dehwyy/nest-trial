import {HttpException, HttpStatus, Injectable, UnauthorizedException} from "@nestjs/common";
import {UsersService} from "../users/users.service";
import {userData} from "../users/users-types";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from "bcryptjs"
import {User} from "../users/users.model";

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) {}

    async login(data: userData) {
        const user = await this.validateUser(data)
        return this.generateToken(user)
    }

    async reg(data: userData) {
        const candidate = await this.userService.findUserByEmail(data.email)
        if (candidate) {
            throw new HttpException(`there already is a user with email ${data.email}`, HttpStatus.BAD_REQUEST)
        }
        const hashPassword = bcrypt.hashSync(data.password, 5)
        const newUser = await this.userService.createUser({...data, password: hashPassword})
        return this.generateToken(newUser)
    }

    generateToken(user: User) {
        const payload = {email: user.email, id: user.id, roles: user.roles}
        const token = this.jwtService.sign(payload)
        return token
    }

    private async validateUser(data: userData) {
        const user = await this.userService.findUserByEmail(data.email)
        const decodedPassword = bcrypt.compareSync(data.password, user?.password)
        if (user && decodedPassword) {
            return user
        }
        throw new UnauthorizedException({message: "invalid password or email"})

    }
}