"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const db_1 = require("./config/db");
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const error_handlers_middleware_1 = require("./middlewares/error-handlers-middleware");
const qs_1 = __importDefault(require("qs"));
const auth_router_1 = __importDefault(require("./routes/auth-router"));
const admin_router_1 = __importDefault(require("./routes/admin-router"));
const user_router_1 = __importDefault(require("./routes/user-router"));
const freelancer_router_1 = __importDefault(require("./routes/freelancer-router"));
const client_router_1 = __importDefault(require("./routes/client-router"));
const morgan_1 = __importDefault(require("morgan"));
const logger_1 = require("./utils/logger");
dotenv_1.default.config();
const PORT = process.env.PORT;
(0, db_1.connectDB)();
const app = (0, express_1.default)();
if (process.env.NODE_ENV === 'production') {
    app.use((0, morgan_1.default)('combined', { stream: logger_1.accessLogStream }));
}
else {
    app.use((0, morgan_1.default)('dev'));
}
app.set('query parser', (str) => qs_1.default.parse(str));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use('/api/auth', auth_router_1.default);
app.use('/api/admin', admin_router_1.default);
app.use('/api/user', user_router_1.default);
app.use('/api/freelancer', freelancer_router_1.default);
app.use('/api/client', client_router_1.default);
app.use(error_handlers_middleware_1.errorHandler);
app.listen(PORT, () => {
    logger_1.appLogger.info(`Server is running on port: ${PORT}`);
});
//# sourceMappingURL=server.js.map