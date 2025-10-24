"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtConfig = void 0;
exports.jwtConfig = {
    accessTokenMaxAge: Number(process.env.ACCESS_TOKEN_MAX_AGE) || 900,
    refreshTokenMaxAge: Number(process.env.REFRESH_TOKEN_MAX_AGE) || 604800,
};
//# sourceMappingURL=jwt.config.js.map