import jwt, { JwtPayload } from 'jsonwebtoken';
import type { StringValue } from 'ms';
export declare class JwtService {
    private secret;
    constructor();
    createToken(payload: object, expiresIn: number | StringValue): string;
    verifyToken<T extends JwtPayload>(token: string): T;
    decodeToken(token: string): string | jwt.JwtPayload | null;
}
export declare const jwtService: JwtService;
//# sourceMappingURL=jwt.d.ts.map