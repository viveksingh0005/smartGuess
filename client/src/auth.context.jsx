import { createContext, useState, useEffect, useContext } from "react"
import api from "./services/auth.api"  // 👈 adjust path if needed

export const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) throw new Error("useAuth must be used inside AuthProvider")
    return context
}

export const AuthProvider = ({ children }) => {
    const [user, setUser]                       = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading]                 = useState(true)

    useEffect(() => {
        const checkUser = async () => {
            const token = localStorage.getItem("token")
            if (token) {
                try {
                    const res = await api.get("/api/auth/get-me", {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                   
                    setUser(res.data.user || res.data)
                    setIsAuthenticated(true)
                } catch (error) {
                    setUser(null)
                    setIsAuthenticated(false)
                }
            }
            setLoading(false)
        }
        checkUser()
    }, [])

    useEffect(() => {
    console.log("AUTH USER:", user);
}, [user]);

    const login = (userData, token) => {
        localStorage.setItem("token", token)
        
        setUser(userData)
        setIsAuthenticated(true)
    }

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem('user');
        setUser(null)
        setIsAuthenticated(false)
    }

  



    return (
        <AuthContext.Provider value={{
            user,
            setUser,
            isAuthenticated,
            loading,
            login,
            logout,
        
        }}>
            {children}
        </AuthContext.Provider>
    )
}