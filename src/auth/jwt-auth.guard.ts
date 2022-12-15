import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException
} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService
    ) {}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()
        try {
            const auth = req.headers.authorization
            const Bearer = auth.split(" ")[0]
            const token = auth.split(" ")[1]
            if (Bearer !== "Bearer" || !token) {
                throw new UnauthorizedException({message: "user is not authed"})
            }
            const userData = this.jwtService.verify(token)
            req.user = userData
            return true
        } catch (e) {
            throw new UnauthorizedException({message: "user is not authed"})
        }
    }

}