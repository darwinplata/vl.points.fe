import points from "./points";

const getEnvPath = () => {
    return import.meta.env.VITE_APP_PATH;
};

const apiBase = getEnvPath();

const api = {
    points: points(apiBase)
};

export default api;