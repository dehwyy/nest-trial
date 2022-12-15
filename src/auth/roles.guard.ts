import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException
} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";
import {Reflector} from "@nestjs/core";
import {RolesKey} from "./roles-auth.decorator";

@Injectable()
export class RolesGuard implements CanActivate{
    constructor(
        private jwtService: JwtService,
        private reflector: Reflector
    ) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try {
            const requiredRoles = this.reflector.getAllAndOverride<string[]>(RolesKey, [
                context.getHandler(),
                context.getClass()
            ])
            if (!requiredRoles) {
                return true
            }
            const req = context.switchToHttp().getRequest()
            const auth = req.headers.authorization.split(" ")
            const Bearer = auth[0]
            const token = auth[1]
            if (Bearer !== "Bearer" || !token) {
                throw new UnauthorizedException({message: "user not logged in"})
            }
            const userData = this.jwtService.verify(token)
            req.user = userData
            const hasAllRoles = userData.roles.some(role => requiredRoles.includes(role.value))
            if (!hasAllRoles) {
                throw new HttpException("no access to this endpoint", HttpStatus.FORBIDDEN)
            }
            return hasAllRoles
        } catch (e) {
            throw new UnauthorizedException({message: "no access to this endpoint", status: 403})
        }
    }
}