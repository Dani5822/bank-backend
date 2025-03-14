import { CanActivate,ExecutionContext,Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class AuthGuard implements CanActivate {
    
    constructor(private jwtService:JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authorization = request.headers.authorization;
        if(!authorization){
            throw new UnauthorizedException();
        }
        const token = authorization.split(' ')[1];
        if(!token){
            throw new UnauthorizedException();
        }

        try{
            var tokenpayload=await this.jwtService.verify(token);
            request.user={
                id:tokenpayload.id,
                email:tokenpayload.email,
                role:tokenpayload.role
            }
            return true;
        }catch(e){
            throw new UnauthorizedException();
        }
    }

}