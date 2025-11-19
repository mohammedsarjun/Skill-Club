import { IAdmin } from 'src/models/interfaces/admin.model.interface';
import BaseRepository from './baseRepositories/base-repository';
import Admin from 'src/models/admin.model';
import { IAdminRepository } from './interfaces/admin-repository.interface';

export class AdminRepository extends BaseRepository<IAdmin> implements IAdminRepository {
  constructor() {
    super(Admin);
  }
}
