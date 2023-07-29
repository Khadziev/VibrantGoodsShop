import React, { memo } from 'react';
import { useGetReviewsQuery } from '../../apiServices/api/reviewApi';
import Loading2 from '../../UI/Loading/Loading2';

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
    return <div>Пока нет отзывов</div>;
  }

  return (
    <div>
      {reviews.map((review, index) => (
        <div key={index}>
          <p>User: {review.userName}</p>
          <p>Rating: {review.rating}</p>
          <p>Text: {review.text}</p>
        </div>
      ))}
    </div>
  );
});

export default Reviews;
