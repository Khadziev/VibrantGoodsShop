import React, { memo } from 'react';
import { useGetReviewsQuery } from '../../apiServices/api/reviewApi';
import Loading2 from '../../UI/Loading/Loading2';
import HorizontalLine from '../../UI/HorizontalLine/HorizontalLine';
import Text from '../../UI/Text/Text';

interface ReviewsProps {
  productId: string;
}

const Reviews: React.FC<ReviewsProps> = memo(({ productId }) => {
  const { data: reviews, isLoading, isError } = useGetReviewsQuery(productId);

  if (isLoading) {
    return <div className="flex justify-center"><Loading2/></div>;
  }

  if (isError || !reviews) {
    return <div className="flex justify-center">Error...</div>;
  }

  if (reviews.length === 0) {
    return <div className="flex justify-center"><Text align='center' text='на этот товар пока нет отзывов'/></div>;
  }

  return (
    <div className="flex flex-col items-center">
      {reviews.map((review, index) => (
        <div key={index} className="border-t border-gray-200 pt-4 w-full">
          <h3 className="text-lg font-bold text-center">пользователь: {review.userName}</h3>
          <div className="text-sm text-gray-500 text-center my-2">оценка: {review.rating}</div>
          <p className="text-gray-800 text-center">{review.text}</p>
          <HorizontalLine/>
        </div>
      ))}
    </div>
  );
});

export default Reviews;
