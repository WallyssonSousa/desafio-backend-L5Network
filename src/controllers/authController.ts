import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { userModel } from "../models/userModel";
import { config } from "../config";

const registerSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
});

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export const authController = {
    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const parsed = registerSchema.parse(req.body);
            const existing = await userModel.findByEmail(parsed.email);
            if (existing) return res.status(409).json({ message: "Email already registered" });

            const salt = await bcrypt.genSalt(10);
            const password_hash = await bcrypt.hash(parsed.password, salt);
            const { id } = await userModel.create(parsed.name, parsed.email, password_hash);
            res.status(201).json({ id, name: parsed.name, email: parsed.email });
        } catch (err) {
            next(err);
        }
    },

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const parsed = loginSchema.parse(req.body);
            const user = await userModel.findByEmail(parsed.email);
            if (!user) return res.status(401).json({ message: "Invalid credentials" });

            const ok = await bcrypt.compare(parsed.password, user.password);
            if (!ok) return res.status(401).json({ message: "Invalid credentials" });

            const token = jwt.sign(
                { sub: user.id, email: user.email },
                config.jwt.secret,
                {
                    expiresIn: config.jwt.expiresIn,
                }
            );

            const ip = req.ip || null;
            await userModel.createLoginLog(user.id, ip);

            res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
        } catch (err) {
            next(err);
        }
    },
};
