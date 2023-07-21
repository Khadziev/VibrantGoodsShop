import React, { useState } from 'react';
import { useFetchAllProductsQuery } from '../../redux/api/userApi';
import { Modal } from './UI/Modal';
import Pagination from './Pagination';
import SortingFields from './SortingFields';
import SearchBar from './SearchBar';
import { DataAttributesApi } from '../../redux/types/types';
import Loading from '../CommonComponents/Loading';

const UserGetData: React.FC = () => {
  const { data, isLoading } = useFetchAllProductsQuery(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<DataAttributesApi | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [selectedField, setSelectedField] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleFieldChange = (field: string) => {
    setSelectedField(field);
    setCurrentPage(1);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  if (!data) {
    return <div>Данные недоступны</div>;
  }

  //const { length: totalItems } = data;
  const filteredData = selectedField ? data.filter((item: DataAttributesApi) => item.category === selectedField) : data;

  const searchedData = searchQuery
    ? filteredData.filter((item: DataAttributesApi) => item.name.toLowerCase().startsWith(searchQuery.toLowerCase()))
    : filteredData;

  const sortedData = [...searchedData].sort((a, b) => a.category.localeCompare(b.category));

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <SortingFields selectedField={selectedField} onFieldChange={handleFieldChange} />
      <div className="mt-10">
        <SearchBar value={searchQuery} onChange={handleSearch} />
      </div>
      <div className="flex flex-wrap justify-center mt-10">
        {currentItems.length > 0 ? (
          currentItems.map((item: DataAttributesApi) => (
            <div key={item._id} className="mx-20 mb-5">
              <div
                className="fondo2 cursor-pointer w-56 h-60 rounded-lg relative border"
                onClick={() => openModal(item)}
              >
                <figure className="relative mb-2 w-full h-4/5">
                  <span className="absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-xs m-2 px-3 py-0.5 flex justify-center items-center">
                    {item.category}
                  </span>
                  <img
                    src={item.imageURL}
                    alt={`imageURL ${item.title}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </figure>
                <p className="flex justify-between px-1">
                  <span className="text-sm font-light">{item.name}</span>
                  <span className="text-lg font-medium">${item.price}</span>
                </p>
              </div>
            </div>
          ))
        ) : (
          <div>Такого товара нету</div>
        )}
        {modalOpen && <Modal product={selectedProduct} onClose={closeModal} />}
        <div className="flex justify-center mt-5 w-full">
          <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
        </div>
      </div>
    </>
  );
};

export default UserGetData;
