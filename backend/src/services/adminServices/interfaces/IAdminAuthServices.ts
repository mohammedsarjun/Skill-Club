export interface IAdminAuthServices{
    login(adminData:{email:String,password:string}):void
}