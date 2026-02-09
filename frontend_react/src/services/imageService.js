const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getImageUrl = (path) => {
    return `${BACKEND_URL}${path}`;
}