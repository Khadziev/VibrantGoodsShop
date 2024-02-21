import { Request, Response } from "express";
import Category, { ICategory } from "../model/categoryModel";

export const getAllCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories: ICategory[] = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const addCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, title, description,   imgSrc,  } = req.body;
    const newCategory: ICategory = new Category({
      name,
      title,
      description,
      imgSrc,
    });
    const savedCategory: ICategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const updateCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const categoryId: string = req.params.id;
    const { name, title, description, styles, href, imgSrc, imgWidth, imgHeight } = req.body;
    const updatedCategory: ICategory | null = await Category.findByIdAndUpdate(
      categoryId,
      {
        name,
        title,
        description,
        styles,
        href,
        imgSrc,
        imgWidth,
        imgHeight,
      },
      { new: true }
    );
    if (updatedCategory) {
      res.json(updatedCategory);
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const categoryId: string = req.params.id;
    const deletedCategory: ICategory | null = await Category.findByIdAndDelete(categoryId);
    if (deletedCategory) {
      res.json(deletedCategory);
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
