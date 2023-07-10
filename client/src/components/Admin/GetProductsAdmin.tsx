import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataAttributes } from "../../redux/types/types";
import { deleteData, getData, updateData } from "../../redux/admin/admin";
import { RootState, AppDispatch } from "../../redux/store";
import { ProductCard } from "./ProductCard";
import ProductEditModal from "./ProductEditModal";

const GetProductsAdmin: React.FC = () => {
  const data = useSelector<RootState, DataAttributes[]>((state) => state.auth.data);
  const dispatch = useDispatch<AppDispatch>();

  const [selectedProduct, setSelectedProduct] = useState<DataAttributes | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    dispatch(deleteData(id));
  };

  const handleEdit = (product: DataAttributes) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleUpdate = async (updatedData: DataAttributes) => {
    if (selectedProduct) {
      await dispatch(updateData({ id: selectedProduct._id || '', newData: updatedData }));
      dispatch(getData());
    }
    setIsModalOpen(false);
  };

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {data.map((product) => (
        <ProductCard
          key={product.name}
          product={product}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      ))}

      <ProductEditModal
        selectedProduct={selectedProduct}
        isModalOpen={isModalOpen}
        setSelectedProduct={setSelectedProduct}
        setIsModalOpen={setIsModalOpen}
        onUpdate={handleUpdate}
      />
    </div>
  );
};

export default GetProductsAdmin;
