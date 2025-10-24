import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from './jwt.service';

/**
 * This services validates the token and invokes the controller method if the token is valid.
 * It ensures that only authenticated requests can access protected routes and that the current token is still valid.
 */ 

@Injectable()
export class BearerAuthGuard implements CanActivate {
    constructor(private readonly jwt: JwtService) {}

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        // gets the bearer token from the 'Authorization' header
        const auth = request.headers['authorization'];
        // strip 'Bearer ' prefix if it exists, leaving just the token
        const token = auth?.startsWith('Bearer ') ? auth.slice(7) : null;

        if (!token) {
            throw new UnauthorizedException('No token provided');
        }

        const payload = await this.jwt.verifyToken(token);
        request.user = payload;
        return true;
    }
}