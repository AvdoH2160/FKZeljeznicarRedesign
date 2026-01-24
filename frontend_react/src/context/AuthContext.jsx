import {createContext, useState, useEffect} from 'react';
import {login, register, refreshToken} from '../services/authService.js';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
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
        } catch (err) {
            // if (err?.response?.status === 401) {
            //     handleLogout();
            // }
            setUser(null);
            localStorage.removeItem("auth"); 
        }
        setLoading(false);
    }, []);


    useEffect(() => {
        if (!user?.jwtToken || !user?.refreshToken) return;

        const decoded = parseJwt(user.jwtToken);
        if(!decoded?.exp) return;

        const expiresAt = decoded.exp * 1000;
        const refreshAt = expiresAt - 60_000;
        const timeout = refreshAt - Date.now();

        const refreshNow = async () => {
            try {
                const data  = await refreshToken(user.id, user.refreshToken);
                const updatedUser = {
                    ...user,
                    jwtToken: data.jwtToken,
                    refreshToken: data.refreshToken
                };
                setUser(updatedUser);
                localStorage.setItem("auth", JSON.stringify(updatedUser));
            } catch {
                handleLogout();
            }
        };
        if (timeout <= 0) {
            refreshNow();
            return;
        }
        const timer = setTimeout(refreshNow, timeout);
        return () => clearTimeout(timer);
    }, [user?.jwtToken]);

    const handleRegister = async (credentials) => {
        await register(credentials);    
    };

    const handleLogin = async (credentials) => {
        try {
            const data = await login(credentials);

            const rolesArray = Array.isArray(data.roles)
                ? data.roles
                : data.roles ? [data.roles] : [];

            const authUser = {
                id: data.id,
                username: data.username,
                roles: rolesArray,
                jwtToken: data.jwtToken,
                refreshToken: data.refreshToken
            };

            setUser(authUser);
            localStorage.setItem("auth", JSON.stringify(authUser));
        } catch (err) {
            throw err; 
        }
    };

    const handleLogout = () => {
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
