import { Injectable, UnauthorizedException } from '@nestjs/common';
import { createRemoteJWKSet, jwtVerify, JWTPayload } from 'jose';

/** 
 * This service handles JWT verification using JWKS.
 * It fetches the JWKS from a remote URI and verifies incoming JWTs.
 *
 * It uses the 'jose' library for JWT operations. which is a Node.js library for handling JSON Web Tokens (JWT) and JSON Web Keys (JWK).
 */
@Injectable()
export class JwtService {
    private jwks: ReturnType<typeof createRemoteJWKSet>;
    private audience?: string;

    // this constructor initializes the JWKS client
    constructor() {
        const jwksUri = new URL(process.env.SUPABASE_DATABASE_URI!);
        this.jwks = createRemoteJWKSet(jwksUri);
        this.audience = process.env.SUPABASE_JWT_AUD;
    }

    // this function verifies the JWT and returns the payload if valid
    async verifyToken(token: string): Promise<JWTPayload> {
        try {
            const { payload } = await jwtVerify(token, this.jwks, {      
                algorithms: ['RS256'],
                audience: this.audience,
            });
            return payload; 
        } catch (error) {
            throw new UnauthorizedException('Invalid or expired token');
        }
    }
}