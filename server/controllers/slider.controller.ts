import { Request, Response } from "express";
import Slider from "../model/Slider.model";


export const getAllSlider = (req: Request, res: Response) => {
    Slider.find()
    .then((data) => {
        res.json(data)
    })
    .catch((error) => {
        res.status(500).json({error: 'непредвиденная ошибка'})
    })
}

export const addSlider = (req: Request, res: Response) => {
    const {title, ...otherData} = req.body
    const newData = new Slider({title, ...otherData})
    newData
        .save()
        .then(() => {
            res.json({message: 'успешно добавенно'})
        })
        .catch((error) => {
            res.status(500).json({error: 'ошибка при добавлении'})
        })
}

export const updateSlider = (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedData = req.body;
    Slider.findByIdAndUpdate(id, updatedData, { new: true }) 
      .then((updatedSlider) => {
        res.json({ message: 'Данные успешно обновлены', updatedSlider });
      })
      .catch((error) => {
        res.status(500).json({ error: 'Произошла ошибка' });
      });
};
