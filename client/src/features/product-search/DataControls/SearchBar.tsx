import React, { useState, useEffect, useCallback, memo } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = memo(({ value, onChange, className = '' }) => {
  const [searchValue, setSearchValue] = useState(value);

  useEffect(() => {
    setSearchValue(value);
  }, [value]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(searchValue);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchValue, onChange]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchValue('');
    onChange('');
  }, [onChange]);

  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
        <FaSearch className="text-[rgb(var(--color-text-tertiary))]" size={16} />
      </div>
      <input
        type="text"
        placeholder="Поиск..."
        value={searchValue}
        onChange={handleInputChange}
        className="w-full pl-11 pr-11 py-3 rounded-xl border border-[rgb(var(--color-border))] bg-[rgb(var(--color-bg))] text-[rgb(var(--color-text-base))] placeholder-[rgb(var(--color-text-tertiary))] focus:ring-2 focus:ring-[rgb(var(--color-primary))] focus:border-[rgb(var(--color-primary))] shadow-sm transition-all duration-200"
      />
      {searchValue && (
        <button
          onClick={clearSearch}
          className="absolute inset-y-0 right-0 flex items-center pr-4 text-[rgb(var(--color-text-tertiary))] hover:text-[rgb(var(--color-text-base))] transition-colors"
        >
          <FaTimes size={14} />
        </button>
      )}
    </div>
  );
});

SearchBar.displayName = 'SearchBar';

export default SearchBar;
