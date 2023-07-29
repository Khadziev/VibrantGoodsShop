import React, { useState, useEffect } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  const [searchValue, setSearchValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(searchValue);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [searchValue, onChange]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="flex justify-center">
      <input
        type="text"
        placeholder="Поиск..."
        value={searchValue}
        onChange={handleInputChange}
        className="border px-4 py-2 rounded-lg w-64"
      />
    </div>
  );
};

export default SearchBar;
