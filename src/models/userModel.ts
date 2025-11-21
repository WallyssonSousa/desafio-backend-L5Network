import { pool } from "../db";
import { OkPacketParams, RowDataPacket } from "mysql2";

export type User = {
    id: number;
    name: string;
    email: string;
    password: string;
    created_at: Date;
};

export const userModel = {
    async create(name: string, email: string, password: string){
        const [res] = await pool.query<OkPacketParams & RowDataPacket[]>(
            `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
            [name, email, password]
        );
        return {id: res.insertId};
    },

    async findByEmail(email: string){
        const [rows] = await pool.query<RowDataPacket[]>(
            `SELECT id, name, email, password, created_at FROM users WHERE email = ? LIMIT 1`, [email]
        );
        return rows[0] as User | undefined;
    }, 

    async findById(id: number){
        const [rows] = await pool.query<RowDataPacket[]>(
            `SELECT id, name, email, password, created_at FROM users WHERE id = ? LIMIT 1`, [id]
        );
        return rows[0] as User | undefined;
    },

    async createLoginLog(userId: number, ip: string | null){
        await pool.query(`INSERT INTO login_logs (user_id, ip) VALUES (?, ?)`, [userId, ip]);
    },
};