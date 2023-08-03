import React, { useState } from "react";
import { ProductCard } from "./ProductCard";
import ProductEditModal from "./ProductEditModal";
import Scrollable from "../../UI/Scroll/Scrollable";
import { useGetDataQuery, useDeleteDataMutation, useUpdateDataMutation } from "../../apiServices/api/adminApi";
import { DataAttributesApi } from "../../apiServices/model/ProductTypes";

const GetProductsAdmin: React.FC = () => {
  const { data = [], refetch } = useGetDataQuery();
  const [deleteData] = useDeleteDataMutation();
  const [updateData] = useUpdateDataMutation();

  const [selectedProduct, setSelectedProduct] = useState<DataAttributesApi | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async (id: string) => {
    await deleteData(id);
    refetch();
  };

  const handleEdit = (product: DataAttributesApi) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleUpdate = async (updatedData: DataAttributesApi) => {
    if (selectedProduct) {
      await updateData({ id: selectedProduct._id || '', newData: updatedData });
      refetch();
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
