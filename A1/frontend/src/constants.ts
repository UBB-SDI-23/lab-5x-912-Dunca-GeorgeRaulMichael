const PROD_BACKEND_API_URL = "/";
const DEV_BACKEND_API_URL = "172.31.4.129";

export const BACKEND_API_URL =
	process.env.NODE_ENV === "development" ? DEV_BACKEND_API_URL : PROD_BACKEND_API_URL;