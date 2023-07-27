import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataAttributesApi } from "../../redux/model/types";
import { deleteData, getData, updateData } from "../../redux/api/adminApi";
import { RootState, AppDispatch } from "../../redux/store";
import { ProductCard } from "./ProductCard";
import ProductEditModal from "./ProductEditModal";
import Scrollable from "../UI/Scrollable";

const GetProductsAdmin: React.FC = () => {
  const data = useSelector<RootState, DataAttributesApi[]>((state) => state.auth.data);
  const dispatch = useDispatch<AppDispatch>();

  const [selectedProduct, setSelectedProduct] = useState<DataAttributesApi | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    dispatch(deleteData(id));
  };

  const handleEdit = (product: DataAttributesApi) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleUpdate = async (updatedData: DataAttributesApi) => {
    if (selectedProduct) {
      await dispatch(updateData({ id: selectedProduct._id || '', newData: updatedData }));
      dispatch(getData());
    }
    setIsModalOpen(false);
  };

  return (
    <Scrollable>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {data.map((product) => (
          <ProductCard
            key={product._id}
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
    </Scrollable>
  );
};

export default GetProductsAdmin;
