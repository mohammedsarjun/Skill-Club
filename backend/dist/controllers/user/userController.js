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
import { MESSAGES } from '../../contants/contants.js';
let UserController = class UserController {
  constructor(userService) {
    this._userService = userService;
  }
  async selectRole(req, res) {
    const { role } = req.body;
    const userId = req.user?.userId;
    const user = await this._userService.selectRole(userId, role);
    // Issue new JWT with updated roles
    const payload = user;
    const accessToken = jwtService.createToken(payload, '15m');
    res.cookie('accessToken', accessToken, {
      httpOnly: process.env.NODE_ENV === 'production',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 15 * 60 * 1000,
    });
    res.status(HttpStatus.OK).json({
      success: true,
      message: MESSAGES.USER.ROLE_SELECTED,
      data: user,
    });
  }
  async me(req, res) {
    const userId = req.user?.userId;
    const user = await this._userService.me(userId);
    const payload = user;
    const accessToken = jwtService.createToken(payload, '15m');
    res.cookie('accessToken', accessToken, {
      httpOnly: process.env.NODE_ENV === 'production',
      secure: process.env.NODE_ENV === 'production', // 🔹 must be false on localhost (no HTTPS)
      sameSite: 'lax', // 🔹 "strict" blocks cross-site cookies
      maxAge: 15 * 60 * 1000,
    });
    res.status(HttpStatus.OK).json({
      success: true,
      message: MESSAGES.USER.VERIFIED,
      data: user,
    });
  }
  async createFreelancerProfile(req, res) {
    const userId = req.user?.userId;
    const user = await this._userService.createFreelancerProfile(userId, req.body);
    res.status(HttpStatus.OK).json({
      success: true,
      message: MESSAGES.Freelancer.UPDATED,
      data: user,
    });
  }
  async createClientProfile(req, res) {
    const userId = req.user.userId;
    const user = await this._userService.createClientProfile(userId, req.body);
    res.status(HttpStatus.OK).json({
      success: true,
      message: MESSAGES.CLIENT.UPDATED,
      data: user,
    });
  }
  async switchRole(req, res) {
    const userId = req.user.userId;
    const user = await this._userService.switchRole(userId);
    const payload = user;
    const accessToken = jwtService.createToken(payload, '15m');
    const refreshToken = jwtService.createToken(payload, '7d');
    res.cookie('accessToken', accessToken, {
      httpOnly: process.env.NODE_ENV === 'production',
      secure: process.env.NODE_ENV === 'production', // 🔹 must be false on localhost (no HTTPS)
      sameSite: 'lax', // 🔹 "strict" blocks cross-site cookies
      maxAge: 15 * 60 * 1000,
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: process.env.NODE_ENV === 'production',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(HttpStatus.OK).json({
      success: true,
      message: MESSAGES.USER.ROLE_SWITCHED,
      data: user,
    });
  }
  async getProfile(req, res) {
    const userId = req.user?.userId;
    const user = await this._userService.getProfile(userId);
    res.status(HttpStatus.OK).json({
      success: true,
      message: MESSAGES.USER.FETCH_SUCCESS,
      data: user,
    });
  }
  async getAddress(req, res) {
    const userId = req.user?.userId;
    const user = await this._userService.getAddress(userId);
    res.status(HttpStatus.OK).json({
      success: true,
      message: 'User Address Fetched Successfully',
      data: user,
    });
  }
  async createActionVerification(req, res) {
    const userId = req.user?.userId;
    const { actionType, actionData } = req.body;
    const user = await this._userService.createActionVerification(userId, actionType, actionData);
    res.status(HttpStatus.OK).json({
      success: true,
      message: 'User Address Fetched Successfully',
      data: user,
    });
  }
};
UserController = __decorate(
  [injectable(), __param(0, inject('IUserServices')), __metadata('design:paramtypes', [Object])],
  UserController,
);
export { UserController };
//# sourceMappingURL=userController.js.map
