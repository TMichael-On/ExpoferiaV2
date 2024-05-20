import { config } from "dotenv";
config();

export const PORT = process.env.PORT || 4000;
export const DB_HOST = process.env.DB_HOST || "66.225.201.133";
export const DB_USER = process.env.DB_USER || "pxmjpvdl_mgd_expoferia";
export const DB_PASSWORD = process.env.DB_PASSWORD || "18tcS-kI8@pA";
export const DB_DATABASE = process.env.DB_DATABASE || "pxmjpvdl_Expoferia";
export const DB_PORT = process.env.DB_PORT || 3306;
