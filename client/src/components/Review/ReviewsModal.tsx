import React, { memo } from 'react';
import Reviews from '../Review/Reviews';

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
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50" onClick={handleClose}>
      <div className="bg-white rounded p-8">
        <button onClick={onClose} className="float-right">X</button>
        <Reviews productId={productId} />
      </div>
    </div>
  );
});

export default ReviewsModal;
