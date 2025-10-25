export interface CreateJobDto {
  title: string;
  description: string;
  category: string;
  specialities: string[]; 
  skills: string[];
  rateType: 'hourly' | 'fixed';


  hourlyRate?: {
    min: number;
    max?: number;
  };
  fixedRate?: {
    min: number;
    max?: number;
  };

  clientId: string;
  slots: number; 
  applyUntil: Date;
}

export interface JobResponseDto {
  title: string;
  description: string;
  category: string;
  specialities: string[];
  skills: string[];
  rateType: 'hourly' | 'fixed';
  hourlyRate?: {
    min: number;
    max?: number;
  };
  fixedRate?: {
    min: number;
    max?: number;
  };
  clientId: string;
  slots?: number;
  applyUntil?: Date;
  status: string;
  createdAt: Date;
}
