import { Request, Response, NextFunction } from "express";
import { tmdbService } from "../services/tmdbService";
import { favoriteModel } from "../models/favoriteModel";
import { viewLogModel } from "../models/viewLogModel";
import { paginationFromReq } from "../utils/pagination";

export const movieController = {
    async search(req: Request, res: Response, next: NextFunction){
        try{
            const q = String(req.query.q || "");
            const page = Number(req.query.page || 1);
            const data = await tmdbService.searchMovies(q, page);
            res.json(data);
        } catch (err) {
            next(err);
        }
    },

    async list(req: Request, res: Response, next: NextFunction){
        try{
            const page = Number(req.query.page || 1);
            const data = await tmdbService.listPopular(page);
            res.json(data);
        } catch (err){ 
            next(err)
        }
    }, 

    async details(req: Request, res: Response, next: NextFunction){
        try{
            const id = Number(req.params.id);
            const data = await tmdbService.getDetails(id);

            const userId = (req as any).user?.id ?? null;
            await viewLogModel.create(userId, id, data.title || data.name || "Unknown");

            res.json(data);
        } catch (err) {
            next(err);
        }
    },

    async addFavorite(req: Request, res: Response, next: NextFunction){
        try{
            const userId = (req as any).user.id as number;
            const tmdbId = Number(req.body.tmdbId);
            const title = String(req.body.title || "");

            if(!tmdbId) return res.status(400).json({message: "tmdbId required"});

            const exists = await favoriteModel.exists(userId, tmdbId);
            if(exists) return res.status(409).json({ message: "Already Favorited"});

            await favoriteModel.add(userId, tmdbId, title);
            res.status(201).json({message: "favorited"});
        } catch (err) {
            next(err);
        }
    },

    async listFavorites(req: Request, res: Response, next: NextFunction){
        try{ 
            const userId = (req as any).user.id as number;
            const { limit, offset } = paginationFromReq(req);
            const rows = await favoriteModel.list(userId, limit, offset);
            res.json({data: rows, limit, offset});
        } catch (err) {
            next(err); 
        }
    }, 

    async removeFavorite(req: Request, res: Response, next: NextFunction){
        try{
            const userId = (req as any).user.id as number;
            const tmdbId = Number(req.params.tmdbId);
            await favoriteModel.remove(userId, tmdbId);
            res.json({ message: "Removed" });
        } catch (err){
            next(err);
        }
    }, 

    async recentViews(req: Request, res: Response, next: NextFunction){
        try{
            const limit = Number(req.query.limit || 20);
            const rows = await viewLogModel.listRecente(limit);
            res.json({data: rows});
        } catch (err) {
            next(err)
        }
    },
};