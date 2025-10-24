export const mapCreateSpecialityDtoToSpecialityModel = (dto) => {
  return {
    name: dto.name,
    category: dto.category,
    status: dto.status,
  };
};
export const mapUpdateSpecialityDtoToSpecialityModel = (
  dto, // <- make it partial
) => {
  const updatedData = {};
  if (dto.name !== undefined) updatedData.name = dto.name;
  if (dto.category !== undefined) updatedData.category = dto.category;
  if (dto.status !== undefined) updatedData.status = dto.status;
  return updatedData;
};
export function mapSpecialityQuery(dto) {
  return {
    search: dto.search || '',
    page: dto.page ? Number(dto.page) : 1,
    limit: dto.limit ? Number(dto.limit) : 10,
    categoryFilter: dto?.filter?.category ? dto.filter.category : null,
    mode: dto.mode,
  };
}
export const mapSpecialityModelToSpecialityDto = (speciality) => {
  return {
    id: speciality._id.toString(),
    name: speciality.name,
    category: speciality.category?._id?.toString() ?? speciality.category?.toString() ?? '',
    categoryName: speciality.category ? speciality.category.name : '',
    status: speciality.status,
  };
};
//# sourceMappingURL=speciality.mapper.js.map
