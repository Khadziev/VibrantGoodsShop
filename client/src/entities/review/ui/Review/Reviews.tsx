import React, { memo } from 'react';
import { useGetReviewsQuery } from '@/shared/api/reviewApi';
import Loading from '@/shared/ui/Loading/Loading';
import Text from '@/shared/ui/Text/Text';

interface Review {
  userId: string;
  userName: string;
  rating: number;
  text: string;
  date?: string;
}

interface ReviewsProps {
  productId: string;
}

const Reviews: React.FC<ReviewsProps> = memo(({ productId }) => {
  const { data: reviews, isLoading, isError } = useGetReviewsQuery(productId);

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loading />
      </div>
    );
  }

  if (isError || !reviews) {
    return (
      <div className="flex justify-center py-8">
        <Text align="center" text="Ошибка загрузки отзывов" color="black" />
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="flex justify-center py-8">
        <Text align="center" text="На этот товар пока нет отзывов" color="black" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto px-4">
      {reviews.map((review: Review, index) => (
        <div
          key={`${review.userId}-${index}`}
          className="border border-gray-200 rounded-lg p-4 w-full mb-4 bg-white shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800">Пользователь: {review.userName}</h3>
            <div className="text-yellow-500 font-bold">★ {review.rating}/5</div>
          </div>
          <p className="text-gray-600 mt-2 italic">"{review.text}"</p>
          {review.date && (
            <p className="text-xs text-gray-400 mt-2 text-right">
              {new Date(review.date).toLocaleDateString('ru-RU')}
            </p>
          )}
        </div>
      ))}
    </div>
  );
});

export default Reviews;
