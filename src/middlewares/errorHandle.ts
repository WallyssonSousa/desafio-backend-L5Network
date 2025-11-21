import { Request, Response, NextFunction } from "express";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction){
    console.error(err);
    if(err?.name === "ZodError") {
        return res.status(400).json({message: "Validation error", issues: err.errors});
    }
    res.status(err?.status || 500).json({message: err?.message || "Internal server error"});
}