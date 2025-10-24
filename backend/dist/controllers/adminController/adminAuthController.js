var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
            ? (desc = Object.getOwnPropertyDescriptor(target, key))
            : desc,
      d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return (c > 3 && r && Object.defineProperty(target, key, r), r);
  };
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
      return Reflect.metadata(k, v);
  };
var __param =
  (this && this.__param) ||
  function (paramIndex, decorator) {
    return function (target, key) {
      decorator(target, key, paramIndex);
    };
  };
import { injectable, inject } from 'tsyringe';
import '../../config/container.js';
import { HttpStatus } from '../../enums/http-status.enum.js';
import { jwtService } from '../../utils/jwt.js';
let AdminAuthController = class AdminAuthController {
  constructor(adminAuthServices) {
    this.adminAuthServices = adminAuthServices;
  }
  async login(req, res) {
    try {
      const result = this.adminAuthServices.login(req.body);
      // 🔹 Create tokens
      const payload = { userId: 'admin_1', roles: ['admin'], activeRole: 'admin' };
      const accessToken = jwtService.createToken(payload, '15m');
      const refreshToken = jwtService.createToken(payload, '7d');
      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: false, // 🔹 must be false on localhost (no HTTPS)
        sameSite: 'lax', // 🔹 "strict" blocks cross-site cookies
        maxAge: 15 * 60 * 1000,
      });
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.status(HttpStatus.OK).json({
        success: true,
        message: 'Admin Logged In Successfully',
        data: payload,
      });
    } catch (error) {
      throw error;
    }
  }
};
AdminAuthController = __decorate(
  [
    injectable(),
    __param(0, inject('IAdminAuthServices')),
    __metadata('design:paramtypes', [Object]),
  ],
  AdminAuthController,
);
export { AdminAuthController };
//# sourceMappingURL=adminAuthController.js.map
