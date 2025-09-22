import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export class JwtService {
    constructor() {
        this.secret = process.env.JWT_SECRET;
        if (!this.secret) {
            throw new Error("JWT_SECRET not found in environment variables");
        }
    }
    /** Create a token (access or refresh) */
    createToken(payload, expiresIn) {
        const options = { expiresIn };
        return jwt.sign(payload, this.secret, options);
    }
    /** Verify a token and return typed payload */
    verifyToken(token) {
        return jwt.verify(token, this.secret);
    }
    /** Decode token without verification */
    decodeToken(token) {
        return jwt.decode(token);
    }
}
// Optional: export a singleton instance
export const jwtService = new JwtService();
//# sourceMappingURL=jwt.js.map