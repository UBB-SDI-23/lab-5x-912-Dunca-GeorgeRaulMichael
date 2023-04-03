const PROD_BACKEND_API_URL = "/";
const DEV_BACKEND_API_URL = "13.50.246.37";

export const BACKEND_API_URL =
	process.env.NODE_ENV === "development" ? DEV_BACKEND_API_URL : PROD_BACKEND_API_URL;