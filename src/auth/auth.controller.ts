import {Body, Controller, Post} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {userData} from "../users/users-types";

@Controller("/auth")
export class AuthController {
    constructor(
        private authService: AuthService
    ) {}
    @Post("/login")
    login(@Body() data: userData) {
        return this.authService.login(data)
    }

    @Post("/registration")
    registration(@Body() data: userData) {
        return this.authService.reg(data)
    }
}