import { Injectable, UnauthorizedException } from '@nestjs/common';

/** 
 * This service handles JWT verification using JWKS.
 * It fetches the JWKS from a remote URI and verifies incoming JWTs.
 *
 * It uses the 'jose' library for JWT operations. which is a Node.js library for handling JSON Web Tokens (JWT) and JSON Web Keys (JWK).
 */
@Injectable()
export class JwtService {
    private jwks: ReturnType<Awaited<typeof import('jose')>['createRemoteJWKSet']> | null = null;
    private audience?: string;

    // this constructor initializes the JWKS client
    constructor() {
        this.audience = process.env.SUPABASE_JWT_AUD;
    }

    private async getJWKS() {
        const { createRemoteJWKSet } = await import('jose');
        if (!this.jwks) {
            const jwksUri = process.env.SUPABASE_JWT_URL!;
            this.jwks = createRemoteJWKSet(new URL(jwksUri));
        }
        return this.jwks;
    }

    // this function verifies the JWT and returns the payload if valid
    async verifyToken(token: string) {
        try {
            const { jwtVerify } = await import('jose');
            const jwks = await this.getJWKS();
            const { payload } = await jwtVerify(token, jwks, {
                algorithms: ['RS256'],
                audience: this.audience,
            });
            return payload; 
        } catch (error) {
            throw new UnauthorizedException('Invalid or expired token');
        }
    }
}