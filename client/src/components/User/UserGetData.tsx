import React, { useState } from 'react';
import { useFetchAllProductsQuery } from '../../redux/api/userApi';
import { Modal } from './UI/Modal';
import Pagination from './Pagination';
import SortingFields from './SortingFields';
import SearchBar from './SearchBar';
import { DataAttributesApi } from '../../redux/types/types';
import Loading from '../CommonComponents/Loading';
import { useProductData } from './useProductData';
import ProductItem from './ProductItem';
import AddToCartComponent from '../Basket/AddToCartComponent';



const UserGetData: React.FC = () => {
  const { data, isLoading } = useFetchAllProductsQuery(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<DataAttributesApi | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { selectedField, setSelectedField, searchQuery, setSearchQuery, sortedData } =
    useProductData(data || []);

  if (isLoading || !data) {
    return <div><Loading/></div>;
  }

  const openModal = (product: DataAttributesApi) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setModalOpen(false);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <SortingFields selectedField={selectedField} onFieldChange={setSelectedField} />
      <div className="mt-10">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>
      <div className="flex flex-wrap justify-center mt-10">
        {sortedData.length > 0 ? (
          sortedData
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((item: DataAttributesApi) => (
              <div key={item._id} className="mx-20 mb-5">
                <ProductItem item={item} onOpenModal={openModal} />
                <AddToCartComponent product={item} />
              </div>
            ))
        ) : (
          <div>Такого товара нету</div>
        )}
        {modalOpen && <Modal product={selectedProduct} onClose={closeModal} />}
        <div className="flex justify-center mt-5 w-full">
          <Pagination
            totalPages={Math.ceil(sortedData.length / itemsPerPage)}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
};

export default UserGetData;
