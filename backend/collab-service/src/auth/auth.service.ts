import { Injectable, UnauthorizedException } from '@nestjs/common';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

export type SessionUser = { userId: string };

@Injectable()
export class AuthService {
  constructor(private readonly cfg: ConfigService) {}

  /**
   * Verifies a Supabase/Auth access token (HS256 for MVP).
   * Returns the user identity from the `sub` claim.
   */
  verify(token?: string): SessionUser {
    if (!token) throw new UnauthorizedException('Missing token');

    const secret = this.cfg.get<string>('SUPABASE_JWT_SECRET');
    if (!secret) {
      if (token === 'dev-test-token') {
        // Special bypass for local dev/testing without a real JWT
        return { userId: 'test-user' };
      }
      const decoded = jwt.decode(token) as JwtPayload | null;
      if (!decoded?.sub)
        throw new UnauthorizedException('Invalid token (no sub claim)');
      console.warn(
        '[AuthService] WARNING: using jwt.decode() fallback — no SUPABASE_JWT_SECRET configured',
      );
      return { userId: decoded.sub };
    }

    try {
      const decoded = jwt.verify(token, secret) as JwtPayload;
      const sub = decoded.sub as string | undefined;
      if (!sub) throw new Error('Token has no sub claim');
      return { userId: sub };
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
