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

  const handleClose = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleClose}
    >
      <div className="bg-white rounded p-8 w-4/5 h-4/5 overflow-auto max-h-full flex flex-col items-center justify-center relative">
        <div className="close-button-container absolute top-2 right-2">
          <button onClick={onClose}>X</button>
        </div>
        <div className="add-review-container mb-4 w-full">
          <AddReview productId={productId} />
        </div>
        <div className="reviews-container w-full">
          <Reviews productId={productId} />
        </div>
      </div>
    </div>
  );
});

export default ReviewsModal;
