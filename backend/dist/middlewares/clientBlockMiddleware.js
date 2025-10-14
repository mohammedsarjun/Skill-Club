import { HttpStatus } from "../enums/http-status.enum.js";
export function clientBlockMiddleware(req, res, next) {
    try {
        const user = req.user;
        if (!user) {
            return res
                .status(HttpStatus.UNAUTHORIZED)
                .json({ message: "Unauthorized: No user found in request" });
        }
        if (user.isClientBlocked) {
            return res
                .status(HttpStatus.FORBIDDEN)
                .json({ message: "Client account is blocked. Access denied." });
        }
        next();
    }
    catch (err) {
        console.error("Client Block Middleware Error:", err);
        return res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({ message: "Something went wrong while verifying client block status" });
    }
}
//# sourceMappingURL=clientBlockMiddleware.js.map