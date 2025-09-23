import { jwtService } from "../utils/jwt.js";
import { HttpStatus } from "../enums/http-status.enum.js";
export function authMiddleware(req, res, next) {
    try {
        const token = req.cookies.accessToken; // or get from headers if you prefer
        if (!token) {
            return res.status(HttpStatus.UNAUTHORIZED).json({ message: "Unauthorized: No token provided" });
        }
        // Verify token
        const decoded = jwtService.verifyToken(token);
        // Attach to request object
        req.user = decoded;
        next();
    }
    catch (err) {
        console.error("Auth Middleware Error:", err);
        return res.status(HttpStatus.FORBIDDEN).json({ message: "Forbidden: Invalid or expired token" });
    }
}
// Optional Role Guard Middleware
export function roleGuard(requiredRole) {
    return (req, res, next) => {
        console.log(req.user, requiredRole, req.user?.roles?.includes(requiredRole));
        if (!req.user?.roles?.includes(requiredRole)) {
            return res.status(HttpStatus.FORBIDDEN).json({ message: "Forbidden: Insufficient role" });
        }
        next();
    };
}
//# sourceMappingURL=authMiddleware.js.map