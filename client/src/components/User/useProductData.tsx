import { useState } from 'react';
import { DataAttributesApi } from "@/components/Admin/product/model/model";

export const useProductData = (data: DataAttributesApi[]) => {
  const [selectedField, setSelectedField] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = selectedField
    ? data.filter((item: DataAttributesApi) => item.category === selectedField)
    : data;

  const searchedData = searchQuery
    ? filteredData.filter((item: DataAttributesApi) =>
      item.name.toLowerCase().startsWith(searchQuery.toLowerCase())
    )
    : filteredData;

  const sortedData = [...searchedData].sort((a, b) => a.category.localeCompare(b.category));

  return {
    selectedField,
    setSelectedField,
    searchQuery,
    setSearchQuery,
    sortedData,
  };
};
