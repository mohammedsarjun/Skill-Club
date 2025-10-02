import { injectable, inject } from 'tsyringe';
import AppError from '../../utils/AppError.js';
import { HttpStatus } from '../../enums/http-status.enum.js';
import { IAdminUserServices } from './interfaces/IAdminUserServices.js';
import type { IUserRepository } from '../../repositories/interfaces/IUserRepository.js';
import { AdminUserDto, AdminUserStatsDto, GetUserDto } from '../../dto/adminDTO/adminUsers.dto.js';
import { mapUserModelDtoToAdminUserDto, mapUserModelDtoToAdminUserStatsDto } from '../../mapper/adminMapper/adminUsers.mapper.js';

@injectable()
export class AdminUserServices implements IAdminUserServices {
  private _userRepository: IUserRepository;

  constructor(
    @inject('IUserRepository')
    userRepository: IUserRepository,
  ) {
    this._userRepository = userRepository;
  }

  async getUserStats(): Promise<any> {
    const totalUsers = await this._userRepository.count();
    const totalFreelancers = await this._userRepository.count({ roles: 'freelancer' });
    const totalClients = await this._userRepository.count({ roles: 'client' });

    const dto: AdminUserStatsDto = mapUserModelDtoToAdminUserStatsDto({
      totalUsers,
      totalFreelancers,
      totalClients,
    });
    return dto;
  }

  async getUsers(filterData: GetUserDto): Promise<any> {
    const page = filterData.page ?? 1;
    const limit = filterData.limit ?? 10;
    const skip = (page - 1) * limit;
    let role: "freelancer" | "client" | undefined;
    let status:boolean|undefined



    if(filterData?.filters?.role){
      role=filterData.filters.role
    }
    if(filterData?.filters?.status){
      status=filterData?.filters?.status
    }

   let filter:{name?:string,role?:string} = {};
    if (filterData?.search) {
      filter.name=filterData.search ;
    }
    if (role) {
      filter.role=role ;
    }



    const result = await this._userRepository.getUsers(filter, {
      skip,
      limit,
    });


    const total = await this._userRepository.count({
      name: filterData.search || '',
    });

    // Map to DTO
    

    const data: AdminUserDto[] = result!.map(mapUserModelDtoToAdminUserDto);
    return {
      data,
      total,
      page,
      limit,
    };
  }
}
