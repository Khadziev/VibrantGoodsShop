import { Request, Response } from "express"
import Brand from "../model/Brand.model"

export const getAllBrand = (req: Request, res: Response) => {
    Brand.find()
    .then((data) => {
        res.json(data)
    })
    .catch((error) => {
        res.status(500).json({error: 'непредвиденная ошибка'})
    })
}