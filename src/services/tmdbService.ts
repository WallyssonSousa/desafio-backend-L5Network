import axios from "axios";
import IORedis from "ioredis";
import { config } from "../config";

const redis = new IORedis(config.redisUrl);

const CACHE_TTL = 60 * 5;

export const tmdbService = {
    async searchMovies(query: string, page = 1){
        const key = `tmdb:search:${query}:page:${page}`;
        const cached = await redis.get(key);
        if (cached) return JSON.parse(cached);

        const res = await axios.get(`${config.tmdb.baseUrl}/search/movie`, {
            params: {
                api_key: config.tmdb.key, 
                query,
                page
            },
        });
        await redis.set(key, JSON.stringify(res.data), "EX", CACHE_TTL);
        return res.data;
    },

    async listPopular(page=1){
        const key = `tmdb:list:popular:page${page}`;
        const cached = await redis.get(key);
        if(cached) return JSON.parse(cached);

        const res = await axios.get(`${config.tmdb.baseUrl}/movie/popular`, {
            params:{
                api_key: config.tmdb.key,
                page,
            },
        });
        await redis.set(key, JSON.stringify(res.data), "EX", CACHE_TTL);
        return res.data;
    },

    async getDetails(tmdbId: number){
        const key = `tmdb:details:${tmdbId}`;
        const cached = await redis.get(key);
        if(cached) return JSON.parse(cached);

        const res = await axios.get(`${config.tmdb.baseUrl}/movie/${tmdbId}`, {
            params: {
                api_key: config.tmdb.key,
            },
        });
        await redis.set(key, JSON.stringify(res.data), "EX", CACHE_TTL);
        return res.data;
    },
};