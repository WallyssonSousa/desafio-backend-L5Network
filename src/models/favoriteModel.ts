import { pool } from "../db";

export type Favorite = {
    id: number;
    user_id: number;
    tmdb_id: number;
    title: string;
    created_at: Date;
}

export const favoriteModel = {
    async add(userId: number, tmdbId: number, title: string) {
        await pool.query(`INSERT INTO favorites(user_id, tmdb_id, titles) VALUES (?, ?, ?)`, [userId, tmdbId, title]);
    },

    async remove(userId: number, tmdbId: number) {
        await pool.query(`DELETE FROM favorites WHERE user_id = ? AND tmdb_id = ?`, [userId, tmdbId]);
    },

    async list(userId: number, limit = 10, offset = 0){
        const [rows] = await pool.query(
            `SELECT id, user_id, tmdb_id, title, created_at FROM favorites WHERE user_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?`,
           [userId, limit, offset] 
        );
        return rows as Favorite[];
    },

    async exists(userId: number, tmdbId: number){
        const [rows] = await pool.query(`SELECT 1 FROM favorites WHERE user_id = ? AND tmdb_id = ? LIMIT`, [
            userId, tmdbId,
        ]);
        return (rows as any[]).length > 0;
    }
}