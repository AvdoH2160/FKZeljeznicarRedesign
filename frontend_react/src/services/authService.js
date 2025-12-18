import api from "./api.js";

export const login = data => 
    api.post("/auth/login", data).then(r => r.data);
export const register = data => 
    api.post("/auth/register", data).then(r => r.data);
export const refreshToken = (userId, refreshToken) =>
    api.post("/auth/refresh-token", { userId, refreshToken }).then(r => r.data);