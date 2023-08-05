import React, { memo, useState } from 'react';
import { useCreateReviewMutation } from '../../apiServices/api/reviewApi';
import StarRatings from 'react-star-ratings';
import { useAppSelector } from '../../app/providers/store';

interface AddReviewProps {
  productId: string;
}

const AddReview: React.FC<AddReviewProps> = memo(({ productId }) => {
  const [createReview] = useCreateReviewMutation();
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');
  const { userId, name } = useAppSelector((state) => state.auth);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    createReview({ productId, review: { userId, userName: name, rating, text } });
    setText('')
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <StarRatings
        rating={rating}
        starRatedColor="blue"
        changeRating={(value) => setRating(value)}
        numberOfStars={5}
        name='rating'
      />
      <textarea
        value={text}
        onChange={(event) => setText(event.target.value)}
        className="bg-white text-black border-black border mt-4"
        placeholder='Ваш отзыв...'
        style={{ textAlign: 'center' }}
      />
      <div className="mt-4">
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">отправить</button>
      </div>
    </form>
  );

});

export default AddReview;
