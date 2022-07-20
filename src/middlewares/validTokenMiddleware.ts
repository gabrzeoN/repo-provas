import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import * as saltUtil from "../utils/saltUtil.js";

export async function validToken(req: Request, res: Response, next: NextFunction) {
    const {authorization} = req.headers;
    if(!authorization) throw {type: "unauthorized", message: "Token not found!"};
    const token = authorization?.replace("Bearer", "").trim();
    if(!token) throw {type: "unauthorized", message: "Token not found!"};
    
    try{
        const data = jwt.verify(token, saltUtil.jwt);
        res.locals.userId = data;
        next();
    }catch(error){
        throw {type: "unauthorized", message: "Token expired!"};
    }
}