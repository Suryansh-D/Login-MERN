const {axiosInstance} = require('./index')


//Register new User
export const RegisterUser = async(value) =>{
    try{
        const responce = await axiosInstance.post("api/users/register" , value);
        return responce.data;
    }catch(error){
        console.log(error);
    }
}

//Login User
export const LoginUser = async(value)=>{
    try{
        const responce = await axiosInstance.post("api/users/login", value);
        return response.date;
    }catch(error){
        console.log(error)
    }
}