import { Request, Response } from 'express';
import PayModel, { IPay } from '../model/Pay.model';

export const getAllPayments = async (req: Request, res: Response): Promise<void> => {
  try {
    const payments = await PayModel.find();
    res.json(payments);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Неожиданная ошибка' });
    }
  }
};

export const createPayment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { amount, description, street, houseNumber, apartmentNumber, city, zip } = req.body;
    const newPayment: IPay = new PayModel({ amount, description, street, houseNumber, apartmentNumber, city, zip });
    
    const savedPayment = await newPayment.save();

    res.status(201).json(savedPayment);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Неожиданная ошибка' });
    }
  }
};

