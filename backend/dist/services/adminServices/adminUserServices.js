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
import AppError from '../../utils/AppError.js';
import { HttpStatus } from '../../enums/http-status.enum.js';
import {
  mapUpdateUserStatusToUserModel,
  mapUserModelDtoToAdminUserDto,
  mapUserModelDtoToAdminUserStatsDto,
  mapUserToUserDetailDto,
} from '../../mapper/adminMapper/adminUsers.mapper.js';
let AdminUserServices = class AdminUserServices {
  constructor(userRepository) {
    this._userRepository = userRepository;
  }
  async getUserStats() {
    const totalUsers = await this._userRepository.count();
    const totalFreelancers = await this._userRepository.count({ roles: 'freelancer' });
    const totalClients = await this._userRepository.count({ roles: 'client' });
    const dto = mapUserModelDtoToAdminUserStatsDto({
      totalUsers,
      totalFreelancers,
      totalClients,
    });
    return dto;
  }
  async getUsers(filterData) {
    const page = filterData.page ?? 1;
    const limit = filterData.limit ?? 10;
    const skip = (page - 1) * limit;
    let role;
    let status;
    if (filterData?.filters?.role) {
      role = filterData.filters.role;
    }
    if (filterData?.filters?.status) {
      status = filterData?.filters?.status;
    }
    let filter = {};
    if (filterData?.search) {
      filter.name = filterData.search;
    }
    if (role) {
      filter.role = role;
    }
    const result = await this._userRepository.getUsers(filter, {
      skip,
      limit,
    });
    const total = await this._userRepository.count({
      name: filterData.search || '',
    });
    // Map to DTO
    const data = result.map(mapUserModelDtoToAdminUserDto);
    return {
      data,
      total,
      page,
      limit,
    };
  }
  async getUserDetail(id) {
    // 1. Fetch user by ID
    const user = await this._userRepository.findById(id);
    if (!user) {
      throw new AppError(`User with ID ${id} does not exist`, HttpStatus.NOT_FOUND);
    }
    // 2. Map user entity to DTO
    const userDto = mapUserToUserDetailDto(user);
    // 3. Return the mapped DTO
    return userDto;
  }
  async updateUserStatus(userData) {
    const dto = mapUpdateUserStatusToUserModel(userData);
    const { id, role, status } = dto;
    // 1. Check if user exists
    const user = await this._userRepository.findById(id);
    if (!user) {
      throw new AppError("User with this ID doesn't exist", HttpStatus.NOT_FOUND);
    }
    // 2. Validate role
    if (!user.roles.includes(role)) {
      throw new AppError(`User does not have the role: ${role}`, HttpStatus.BAD_REQUEST);
    }
    // 3. Convert status string → boolean
    const isBlocked = status.toLowerCase() === 'block';
    // 4. Update status based on role
    switch (role) {
      case 'client':
        await this._userRepository.updateClientStatus(id, isBlocked);
        break;
      case 'freelancer':
        await this._userRepository.updateFreelancerStatus(id, isBlocked);
        break;
      default:
        throw new AppError('Invalid role provided', HttpStatus.BAD_REQUEST);
    }
  }
};
AdminUserServices = __decorate(
  [injectable(), __param(0, inject('IUserRepository')), __metadata('design:paramtypes', [Object])],
  AdminUserServices,
);
export { AdminUserServices };
//# sourceMappingURL=adminUserServices.js.map
