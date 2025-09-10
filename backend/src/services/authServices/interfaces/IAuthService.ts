export interface IAuthService{
    signup(userData:any):Promise<{
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}>;
    login(userData:any):Promise<any>;
}