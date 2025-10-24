import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { BearerAuthGuard } from './bearer-auth.guard';

// sets the API route to 'auth'
@Controller('auth')
export class AuthController {
    // declares which guard to use for this controller
    @UseGuards(BearerAuthGuard)
    // defines a GET endpoint at 'auth/me' to return the authenticated user's info
    @Get('me')
    
    me(@Req() req: any) {
        const { id, email, role } = req.user || {};
        return { user: { id, email, role } };
    }
}