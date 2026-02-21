import React, { memo } from 'react';
import Reviews from '../Review/Reviews';
import AddReview from './AddReview';

interface ReviewsModalProps {
  productId: string;
  isOpen: boolean;
  onClose: () => void;
}

const ReviewsModal: React.FC<ReviewsModalProps> = memo(({ productId, isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Отзывы о товаре</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-light"
          >
            &times;
          </button>
        </div>
        <div className="overflow-y-auto flex-1 p-4 bg-gray-50">
          <div className="mb-6">
            <AddReview productId={productId} />
          </div>
          <div>
            <Reviews productId={productId} />
          </div>
        </div>
      </div>
    </div>
  );
});

export default ReviewsModal;
