/* eslint-disable no-unused-vars */
import React from 'react';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (_pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    const l = Math.max(1, currentPage - delta);
    const r = Math.min(totalPages, currentPage + delta);

    if (l > 1) {
      range.push(1);
      if (l > 2) rangeWithDots.push('...');
    }

    for (let i = l; i <= r; i++) {
      range.push(i);
    }

    if (r < totalPages) {
      if (r < totalPages - 1) rangeWithDots.push('...');
      range.push(totalPages);
    }

    return rangeWithDots.length ? [...new Set([...range, ...rangeWithDots])] : range;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex justify-center mt-6">
      <nav className="flex items-center space-x-1">
        {visiblePages.map((page, index) => (
          <React.Fragment key={index}>
            {page === '...' ? (
              <span className="px-3 py-1 text-gray-500">...</span>
            ) : (
              <button
                onClick={() => onPageChange(page as number)}
                className={`
                  w-10 h-10 flex items-center justify-center rounded-full
                  ${
              currentPage === page
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-700 hover:bg-gray-100'
              }
                  transition-colors
                `}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}
      </nav>
    </div>
  );
};

export default Pagination;
