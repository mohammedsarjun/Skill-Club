import jwt, { JwtPayload } from "jsonwebtoken";
import type { StringValue } from "ms";
export declare class JwtService {
    private secret;
    constructor();
    /** Create a token (access or refresh) */
    createToken(payload: object, expiresIn: number | StringValue): string;
    /** Verify a token and return typed payload */
    verifyToken<T extends JwtPayload>(token: string): T;
    /** Decode token without verification */
    decodeToken(token: string): string | jwt.JwtPayload | null;
}
export declare const jwtService: JwtService;
//# sourceMappingURL=jwt.d.ts.map