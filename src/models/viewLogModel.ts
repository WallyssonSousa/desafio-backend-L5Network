import { create } from "domain";
import { pool } from "../db";

export const viewLogModel = {
    async create(userId: number | null, tmdbId: number, title: string){
        await pool.query(`INSERT INTO view_logs (user_id, tmdb_id, title) VALUES (?, ?, ?)`, [
            userId, 
            tmdbId, 
            title
        ]);
    }, 

    async listRecente(limit = 20){
        const [rows] = await pool.query(
            `SELECT id, user_id, tmdb_id, title, created_at FROM view_log ORDER BY created_at DESC LIMIT ?`,
            [limit] 
        );
        return rows;
    },
};