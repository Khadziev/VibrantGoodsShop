import { useState, useMemo } from 'react';
import { DataAttributesApi } from '@/entities/product/model/model';

export const useProductData = (data: DataAttributesApi[]) => {
  const [selectedField, setSelectedField] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const sortedData = useMemo(() => {
    let filtered = data;

    if (selectedField) {
      filtered = filtered.filter((item) => item.category === selectedField);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((item) => item.name.toLowerCase().includes(query));
    }

    return [...filtered].sort((a, b) => a.category.localeCompare(b.category));
  }, [data, selectedField, searchQuery]);

  return {
    selectedField,
    setSelectedField,
    searchQuery,
    setSearchQuery,
    sortedData,
  };
};
