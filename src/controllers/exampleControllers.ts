import { RequestHandler } from "express";
import Example from "../model/Example";
import createHttpError from "http-errors";

export const getExample: RequestHandler = (req, res, next) => {
    res.json({message: "hello ici"});
}

export const getExampleData: RequestHandler = async (req, res, next) => {
    const { name, id }: IExampleData = req.body;

    try {
        const example = await Example.findOne({name});
        if(example) return next(createHttpError(406, "Cet exemple existe déjà.."));

        const newExample = new Example({name, id});
        
        await newExample.save();

        res.json({name, id})
    } catch (error) {
        return next(createHttpError.InternalServerError)
    }
}