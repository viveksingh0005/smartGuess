import { useContext } from "react"
import { AuthContext } from "../auth.context"
import { loginapi, register } from "../services/auth.api"

export const useAuth = () => {
    const context = useContext(AuthContext)
    const {
        user,
        setUser,
        login,
        isAuthenticated,
        loading,
    } = context

    const handleLogin = async ({ email, password }) => {
        try {
            const data = await loginapi({ email, password })
            console.log("LOGIN RESPONSE:", data);
            login(data, data.token)
            
            return { success: true }
        } catch (err) {
            return { 
                success: false, 
                message: err.response?.data?.message || "Login failed" 
            }
        }
    }

    const handleRegister = async ({ name, email, password }) => {
        try {
            const data = await register({ name, email, password })
        } catch (err) {
            console.log("Error:", err)
        }
    }

   

    return {
        user,
        isAuthenticated,
        loading,
        handleLogin,
        handleRegister,
      
    }
}