import AppError from "../utils/AppError.js";
export const errorHandler = (err, req, res, next) => {
    console.error("❌ Error:", err);
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
        });
    }
    // For unexpected errors
    res.status(500).json({
        success: false,
        message: "Something went wrong on the server.",
        error: err.message,
    });
};
//# sourceMappingURL=ErrorHandlers.js.map