import { JobQueryParams } from "../../dto/commonDTO/job-common.dto";

export function mapJobQuery(dto: JobQueryParams): JobQueryParams {
  return {
    search: dto?.search || '',
    page: dto.page ? Number(dto.page) : 1,
    limit: dto.limit ? Number(dto.limit) : 10,
    filters: { category: dto?.filters?.category, status: dto?.filters?.status },
  };
}