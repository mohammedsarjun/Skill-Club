
import { FreelancerClientMinimalDTO } from '../../dto/freelancerDTO/freelancer-client.dto';
import {
  FreelancerJobDetailResponseDto,
  FreelancerJobFiltersDto,
  FreelancerJobResponseDto,
} from '../../dto/freelancerDTO/freelancer-job.dto';
import { IJobDetail, IJobResponse } from '../../models/interfaces/job.model.interface';

export function mapJobModelToFreelancerJobDetailResponseDTO(
  jobDetailDto: IJobDetail,
  clientData: FreelancerClientMinimalDTO,
): FreelancerJobDetailResponseDto {
  return {
    jobId: jobDetailDto?._id?.toString() as string,
    title: jobDetailDto?.title,
    description: jobDetailDto?.description,
    category: jobDetailDto?.category?.name,
    specialities: jobDetailDto.specialities.map((spec) => spec.name),
    skills: jobDetailDto.skills.map((skill) => skill.name),
    rateType: jobDetailDto.rateType,
    hourlyRate: jobDetailDto.rateType == 'hourly' ? jobDetailDto.hourlyRate : null,
    fixedRate: jobDetailDto.rateType == 'fixed' ? jobDetailDto.fixedRate : null,
    postedAt: jobDetailDto.createdAt.toString(),
    proposalReceived: 0,
    client: {
      companyName: clientData.companyName,
      country: clientData?.country,
      rating: clientData.rating,
      totalJobsPosted: clientData.totalJobsPosted,
    },
  };
}

export function mapFreelancerJobRawFilterToFreelancerJobFiltersDto(
  rawFilter: FreelancerJobFiltersDto,
): Partial<FreelancerJobFiltersDto> {
  return {
    searchQuery: rawFilter?.searchQuery,
    selectedCategory: rawFilter?.selectedCategory,
    selectedSpecialty: rawFilter?.selectedSpecialty.toString(),
    selectedSkills: rawFilter?.selectedSkills?.map((id) => id.toString()),
    rateType: rawFilter?.rateType,
    minHourlyRate: rawFilter?.minHourlyRate,
    maxHourlyRate: rawFilter?.maxHourlyRate,
    minFixedRate: rawFilter?.minFixedRate,
    maxFixedRate: rawFilter?.maxFixedRate,
    selectedCountry: rawFilter?.selectedCountry,
    // selectedRating: rawFilter?.selectedRating,
    // selectedProposalRanges:rawFilter?.selectedProposalRanges,
  };
}

export function mapFreelancerJobFilterDtoToJobAggregationQuery(
  filters: Partial<FreelancerJobFiltersDto>,
): Record<string, unknown> {
  const matchStage: Record<string, unknown> = {
    status: 'open',
  };

  // Search query (title and description)
  if (filters.searchQuery) {
    matchStage.$or = [
      { title: { $regex: filters.searchQuery, $options: 'i' } },
      { description: { $regex: filters.searchQuery, $options: 'i' } },
    ];
  }

  // Category filter
  if (filters.selectedCategory) {
    matchStage.category = filters.selectedCategory;
  }

  // Specialty filter
  if (filters.selectedSpecialty) {
    matchStage.specialities = filters.selectedSpecialty;
  }

  // Skills filter
  
  if (filters.selectedSkills && filters.selectedSkills.length > 0) {
    matchStage.skills = {
      $in: filters.selectedSkills.map((id: string) => id),
    };
  }

  // Rate type filter
  if (filters.rateType) {
    matchStage.rateType = filters.rateType;
  }

  // Hourly rate filters
  if (filters.rateType === 'hourly' || !filters.rateType) {
    if (filters.minHourlyRate && filters.minHourlyRate) {
      matchStage['hourlyRate.min'] = {
        ...((matchStage['hourlyRate.min'] as Record<string, unknown>) || {}),
        $gte: filters.minHourlyRate,
      };
    }

    if (filters.maxHourlyRate && filters.maxHourlyRate) {
      matchStage['hourlyRate.max'] = {
        ...((matchStage['hourlyRate.max'] as Record<string, unknown>) || {}),
        $lte: filters.maxHourlyRate,
      };
    }
  }

  // Fixed rate filters
  if (filters.rateType === 'fixed' || !filters.rateType) {
    if (filters.minFixedRate && filters.minFixedRate) {
      matchStage['fixedRate.min'] = {
        ...((matchStage['fixedRate.min'] as Record<string, unknown>) || {}),
        $gte: filters.minFixedRate,
      };
    }

    if (filters.maxFixedRate && filters.maxFixedRate) {
      matchStage['fixedRate.max'] = {
        ...((matchStage['fixedRate.max'] as Record<string, unknown>) || {}),
        $lte: filters.maxFixedRate,
      };
    }
  }
  console.log(matchStage);
  return matchStage;
}

export function mapJobModelToFreelancerJobResponseDTO(
  jobDetailDto: IJobResponse,
): FreelancerJobResponseDto {
  return {
    jobId: jobDetailDto?._id?.toString() as string,
    jobTitle: jobDetailDto.title,
    description: jobDetailDto.description,
    category: jobDetailDto.category.name,
    specialities: jobDetailDto.specialities.map((spec) => spec.name),
    skills: jobDetailDto.skills.map((skill) => skill.name),
    jobRateType: jobDetailDto.rateType,
    minHourlyRate: jobDetailDto.rateType == 'hourly' ? jobDetailDto.hourlyRate?.min : undefined,
    maxHourlyRate: jobDetailDto.rateType == 'hourly' ? jobDetailDto.hourlyRate?.max : undefined,
    minFixedRate: jobDetailDto.rateType == 'fixed' ? jobDetailDto.fixedRate?.min : undefined,
    maxFixedRate: jobDetailDto.rateType == 'fixed' ? jobDetailDto.fixedRate?.max : undefined,
    postedAt: jobDetailDto.createdAt.toString(),
    totalProposalReceived: 0,
    client: {
      companyName: jobDetailDto?.client?.companyName,
      country: jobDetailDto?.client?.country as string,
      rating: 0,
    },
  };
}
