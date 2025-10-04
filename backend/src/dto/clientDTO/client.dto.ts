export interface GetClientDTO {
  companyName: string;
  logo?: string|undefined;
  description?: string;
  website?: string;
}

export interface UpdateClientDto{
    companyName:string,
    logo:string,
    description:string,
    website:string
}