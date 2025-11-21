import { Request } from "express";

export function paginationFromReq(req: Request){
    const limit = Math.min(Number(req.query.limit || 10), 100);
    const page = Math.max(Number(req.query.page || 1), 1);
    const offset = (page - 1) * limit;
    return {limit, offset, page};
}