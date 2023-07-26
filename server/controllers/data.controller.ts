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
const getDiscountedData = (req: Request, res: Response) => {
  Data.find({ discount: { $gt: 0 } }) 
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.error('Ошибка при поиске данных со скидкой:', error);
      res.status(500).json({ error: error.message });
    });
};


const getDataById = (req: Request, res: Response) => {
  const { id } = req.params;
  Data.findById(id)
    .then((data) => {
      if (data) {
        res.json(data); 
      } else {
        res.status(404).json({ error: 'Данные не найдены' });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: 'Произошла ошибка' });
    });
};


const addData = (req: Request, res: Response) => {
  const { name, ...otherData } = req.body;
  const newData = new Data({ name, ...otherData });
  newData
    .save()
    .then(() => {
      res.json({ message: 'Данные успешно добавлены' });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Произошла ошибка' });
    });
};

const deleteData = (req: Request, res: Response) => {
  const { id } = req.params;
  Data.findByIdAndDelete(id)
    .then(() => {
      res.json({ message: 'Данные успешно удалены' });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Произошла ошибка' });
    });
};

const updateData = (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;
  Data.findByIdAndUpdate(id, updatedData)
    .then(() => {
      res.json({ message: 'Данные успешно обновлены' });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Произошла ошибка' });
    });
};


export { getAllData, addData, deleteData, updateData, getDataById, getDiscountedData };