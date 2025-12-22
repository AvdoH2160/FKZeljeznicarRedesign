import {createContext, useState, useEffect, use} from 'react';
import {login, register, refreshToken} from '../services/authService.js';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    // const [user, setUser] = useState(() => {
    //     const saved = localStorage.getItem("auth");
    //     return saved ? JSON.parse(saved) : null;
    // });
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);   

    const parseJwt = (token) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        return JSON.parse(atob(base64));
    } catch {
        return null;
    }
    };

    useEffect(() => {
        const stored = localStorage.getItem("auth");
        if(!stored) {
            handleLogout();
            setLoading(false);
            return;
        }

        try {
            const parsed = JSON.parse(stored);
            if(!parsed.jwtToken || !parsed.refreshToken) {
                handleLogout();
            } else {
                setUser(parsed);
            }
        } catch {
            handleLogout();
        }
        setLoading(false);
    }, []);


    useEffect(() => {
        if (!user?.refreshToken || !user?.id) return;

        const interval = setInterval(async () => {
            try {
                const data = await refreshToken(user.id, user.refreshToken);

                const updatedUser = {
                    ...user,
                    jwtToken: data.jwtToken,
                    refreshToken: data.refreshToken
                };

            setUser(updatedUser);
            localStorage.setItem("auth", JSON.stringify(updatedUser));
            } catch (err) {
                console.error("Error refreshing token:", err);
                handleLogout();
            }
        }, 1000 * 60 * 10);

    return () => clearInterval(interval);
    }, [user]);

    useEffect(() => {
        if (!user?.jwtToken) return;
        const decoded = parseJwt(user.jwtToken);
        if(!decoded?.exp) return;

        const expiredAt = decoded.exp * 1000;
        const timeout= expiredAt - Date.now();

        if(timeout <= 0) {
            handleLogout();
            return;
        }

        const timer = setTimeout(() => {
            handleLogout();
        }, timeout);
        return () => clearTimeout(timer);
    }, [user?.jwtToken]);

    const handleRegister = async (credentials) => {
        await register(credentials);    
    };

    const handleLogin = async (credentials) => {
        const data = await login(credentials);

        const authUser = {
            id: data.id,
            username: data.username,
            jwtToken: data.jwtToken,
            refreshToken: data.refreshToken
        };

        setUser(authUser);
        localStorage.setItem("auth", JSON.stringify(authUser));
    };

    const handleLogout =  async (credentials) => {
        setUser(null);
        localStorage.removeItem("auth"); 
    }

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated: !!user?.jwtToken,
            login: handleLogin,
            register: handleRegister,
            loading,
            logout: handleLogout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
