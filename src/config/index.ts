import dotenv from "dotenv";
dotenv.config();

export const config = {
    port: process.env.PORT ? Number(process.env.PORT) : 3000,
    nodeEnv: process.env.NODE_ENV || "development", 
    db:{
        host: process.env.DB_HOST || "127.0.0.1",
        port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306, 
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD || "", 
        database: process.env.DB_NAME || "tmdb_challenge",
    }, 
    jwt: {
        secret: (process.env.JWT_SECRET || "change_this_secret") as string ,
        expiresIn: (process.env.JWT_EXPIRES_IN || "1h") as string ,
    }, 
    tmdb: {
        key: process.env.TMDB_API_KEY || "", 
        baseUrl: process.env.TMDB_BASE_URL || "https://api.themoviedb.org/3"
    }, 
    redisUrl: process.env.REDIS_URL || "redis://localhost:6379", 
}