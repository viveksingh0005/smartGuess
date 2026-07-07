import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL ,
    withCredentials: true
})
export default api
export async function register({
    name,email,password
}){
    try{
        const response = await api.post('/api/auth/register',{
            name,email,password
        })
        return response.data
    }
    catch(err){
    console.log("Message:", err.message);
    console.log("Response:", err.response);
    console.log("Data:", err.response?.data);
    console.log("Full Error:", err);
}
}

export async function loginapi({email,password}){
    try{
        const response = await api.post("/api/auth/login",{
            email,password
            
        })
         
        return response.data
        

    }
    catch(err){
        console.log(err)
    }
}


export async function getMe() {

    try {

        const response = await api.get("/api/auth/get-me")

        return response.data

    } catch (err) {
        console.log(err)
    }

}




