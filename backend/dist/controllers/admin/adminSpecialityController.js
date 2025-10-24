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
import { MESSAGES } from '../../contants/contants.js';
let AdminSpecialityController = class AdminSpecialityController {
  constructor(adminSpecialityService) {
    this._adminSpecialityService = adminSpecialityService;
  }
  async addSpeciality(req, res) {
    const specialityDto = req.body;
    const result = await this._adminSpecialityService.addSpeciality(specialityDto);
    res.status(HttpStatus.CREATED).json({
      success: true,
      message: MESSAGES.SPECIALITY.CREATED,
      data: result,
    });
  }
  async editSpeciality(req, res) {
    const result = await this._adminSpecialityService.editSpeciality(req.body);
    res.status(HttpStatus.OK).json({
      success: true,
      message: MESSAGES.SPECIALITY.UPDATED,
      data: result,
    });
  }
  async getAllSpeciality(req, res) {
    const filter = req.query?.filter;
    const dto = {
      search: typeof req.query.search === 'string' ? req.query.search : '',
      page: Number(req?.query?.page) || 1,
      limit: Number(req?.query?.limit) || 10,
      categoryFilter: filter?.category ? String(filter?.category) : '',
      mode: typeof req.query.mode === 'string' ? req.query.mode : '',
    };
    const result = await this._adminSpecialityService.getSpeciality(dto);
    res.status(HttpStatus.OK).json({
      success: true,
      message: MESSAGES.SPECIALITY.FETCH_SUCCESS,
      data: result,
    });
  }
};
AdminSpecialityController = __decorate(
  [
    injectable(),
    __param(0, inject('IAdminSpecialityServices')),
    __metadata('design:paramtypes', [Object]),
  ],
  AdminSpecialityController,
);
export { AdminSpecialityController };
//# sourceMappingURL=adminSpecialityController.js.map
