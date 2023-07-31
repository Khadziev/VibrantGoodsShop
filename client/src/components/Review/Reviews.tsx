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
    return <div><Loading2/></div>;
  }

  if (isError || !reviews) {
    return <div>Error...</div>;
  }

  if (reviews.length === 0) {
    return <div><Text align='center' text='на этот товар пока нет отзывов'/></div>;
  }

  return (
    <div>
      {reviews.map((review, index) => (
        <div key={index} className="border-t border-gray-200 pt-4">
          <h3 className="text-lg font-bold">пользователь: {review.userName}</h3>
          <p className="text-sm text-gray-500">оценка: {review.rating}</p>
          <p className="text-gray-800">{review.text}</p>
          <HorizontalLine/>
        </div>
      ))}
    </div>
  );
});

export default Reviews;
