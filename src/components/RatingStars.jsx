import React from 'react';
import { Star } from 'lucide-react';

export const RatingStars = ({ rating = 5, reviewsCount = null, size = 16, showScore = true }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.4;

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center text-amber-400">
        {[1, 2, 3, 4, 5].map((starIndex) => {
          const isFilled = starIndex <= fullStars;
          const isHalf = starIndex === fullStars + 1 && hasHalfStar;

          return (
            <Star
              key={starIndex}
              size={size}
              className={`${
                isFilled || isHalf
                  ? 'fill-amber-400 text-amber-400'
                  : 'text-slate-200 fill-slate-100'
              } transition-colors`}
            />
          );
        })}
      </div>
      {showScore && (
        <span className="font-semibold text-surface-text text-sm ml-0.5">
          {Number(rating).toFixed(1)}
        </span>
      )}
      {reviewsCount !== null && (
        <span className="text-surface-muted text-xs">
          ({reviewsCount})
        </span>
      )}
    </div>
  );
};

export default RatingStars;

