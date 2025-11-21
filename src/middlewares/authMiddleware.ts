import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config";
import { userModel } from "../models/userModel";

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try{
        const header = req.headers.authorization;
        if(!header) return res.status(401).json({message: "Authorization required"});

        const parts = header.split(" ");
        if(parts.length !== 2 || parts[0] !== "Bearer") return res.status(401).json({message: "Invalid token"});

        const token = parts[1];
        const payload = jwt.verify(token, config.jwt.secret) as any;
        const user = await userModel.findById(Number(payload.sub));
        if(!user) return res.status(401).json({message: "Invalid token"});

        (req as any).user = {id: user.id, email: user.email, name: user.name};
        next();
    } catch (err){
        return res.status(401).json({message: "Invalid or expired token"});
    }
}