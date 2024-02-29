import globalAxios from "axios";

export const axios = globalAxios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}`,
});

axios.interceptors.request.use(
  function (config) {
    const user = localStorage.getItem(
      process.env.NEXT_PUBLIC_CURRENTUSER_LOCAL_KEY
    );
    const parsed = user ? JSON.parse(user) : undefined;
    const token = parsed?.state?.currentUser?.token;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
axios.defaults.headers.common["ngrok-skip-browser-warning"] = "home";
