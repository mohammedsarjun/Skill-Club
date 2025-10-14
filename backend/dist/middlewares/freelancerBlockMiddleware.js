import { HttpStatus } from "../enums/http-status.enum.js";
export function freelancerBlockMiddleware(req, res, next) {
    try {
        const user = req.user;
        if (!user) {
            return res
                .status(HttpStatus.UNAUTHORIZED)
                .json({ message: "Unauthorized: No user found in request" });
        }
        if (user.isFreelancerBlocked) {
            return res
                .status(HttpStatus.FORBIDDEN)
                .json({ message: "Freelancer account is blocked. Access denied." });
        }
        next();
    }
    catch (err) {
        console.error("Freelancer Block Middleware Error:", err);
        return res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({ message: "Something went wrong while verifying freelancer block status" });
    }
}
//# sourceMappingURL=freelancerBlockMiddleware.js.map