import {createContext, useState, useEffect} from 'react';
import {login, refreshToken} from '../services/authService.js';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem("auth");
        return saved ? JSON.parse(saved) : null;
    });

    useEffect(() => {
        if (!user) return;

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
    }, [user?.id]);

    const handleLogin = async (credentials) => {
        const data = await login(credentials);

        const authUser = {
            id: data.id,
            username: data.username,
            jwtToken: data.jwtToken,
            refreshToken: data.refreshToken,
            roles: data.roles
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
            isAuthenticated: !!user,
            login: handleLogin,
            logout: handleLogout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
