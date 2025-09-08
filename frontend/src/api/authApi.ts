import { axiosClient } from "./axiosClient"

export interface SignUpData{
    firstName:string,
    lastName:string,
    email:string,
    password:string,
    agreement:string|boolean
}


export const authApi={
    signUp:(data:SignUpData)=>{
        axiosClient.post("/auth/signup",data)
    }
}