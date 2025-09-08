export interface IAuthService{
    signup(userData:any):Promise<any>;
    login(userData:any):Promise<any>;
}