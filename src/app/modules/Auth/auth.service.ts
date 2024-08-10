import { TLogin } from "./auth.interface";


const loginUser = async(payload:TLogin)=>{
    /* check if the user exists */
    const user = await 
}

export const AuthServices = { loginUser };