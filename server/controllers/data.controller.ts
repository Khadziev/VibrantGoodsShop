import { Request, Response } from 'express';
import Data from '../model/Data.model';

const getAllData = (req: Request, res: Response) => {
  Data.find()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Произошла ошибка' });
    });
};

const addData = (req: Request, res: Response) => {
  const { title, ...otherData } = req.body;
  const newData = new Data({ title, ...otherData });
  newData.save()
    .then(() => {
      res.json({ message: 'Данные успешно добавлены' });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Произошла ошибка' });
    });
};

export { getAllData, addData };
