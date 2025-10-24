"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtService = exports.JwtService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class JwtService {
    constructor() {
        this.secret = process.env.JWT_SECRET;
        if (!this.secret) {
            throw new Error('JWT_SECRET not found in environment variables');
        }
    }
    createToken(payload, expiresIn) {
        const options = { expiresIn };
        return jsonwebtoken_1.default.sign(payload, this.secret, options);
    }
    verifyToken(token) {
        return jsonwebtoken_1.default.verify(token, this.secret);
    }
    decodeToken(token) {
        return jsonwebtoken_1.default.decode(token);
    }
}
exports.JwtService = JwtService;
exports.jwtService = new JwtService();
//# sourceMappingURL=jwt.js.map