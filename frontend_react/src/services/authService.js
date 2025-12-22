import api from "./api.js";

export const login = data => 
    api.post("/Auth/login", data).then(r => r.data);
export const register = data => 
    api.post("/Auth/register", data).then(r => r.data);
export const refreshToken = (userId, refreshToken) =>
    api.post("/Auth/refresh", { userId, refreshToken }).then(r => r.data);