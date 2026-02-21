import React, { memo, useCallback, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import AddToCartButton from '@/features/add-to-cart/AddToCartButton';
import { DataAttributesApi } from '@/entities/product/model/model';
import { Card, Badge } from '@/shared/ui';

interface ProductItemProps {
  item: DataAttributesApi;
}

const ProductItem: React.FC<ProductItemProps> = memo(({ item }) => {
  const formatPrice = useCallback(
    (price: number) => new Intl.NumberFormat('ru-RU').format(Math.round(price)),
    []
  );

  const hasDiscount = useMemo(() => item.discount && item.discount > 0, [item.discount]);
  const finalPrice = useMemo(
    () => (hasDiscount ? item.price * (1 - item.discount / 100) : item.price),
    [hasDiscount, item.price, item.discount]
  );

  if (!item._id) return null;

  return (
    <NavLink to={`/data/${item._id}`} className="block h-full">
      <Card
        variant="default"
        padding="none"
        hover
        className="group flex flex-col h-full overflow-hidden"
      >
        <div className="relative w-full aspect-square bg-[rgb(var(--color-bg-tertiary))] overflow-hidden rounded-t-2xl">
          <img
            src={item.imageURL[0] || '/placeholder.jpg'}
            alt={item.name}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
          />

          {hasDiscount && (
            <div className="absolute top-3 left-3 z-10">
              <Badge variant="danger" size="sm">
                -{item.discount}%
              </Badge>
            </div>
          )}

          <div className="absolute bottom-3 right-3 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20">
            <div
              onClick={(e) => e.preventDefault()}
              className="shadow-lg rounded-full overflow-hidden"
            >
              <AddToCartButton product={item} />
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-grow p-5">
          <div className="text-xs text-[rgb(var(--color-text-tertiary))] uppercase tracking-wider font-medium truncate mb-2">
            {item.category || 'Категория'}
          </div>

          <h3
            className="text-base font-medium text-[rgb(var(--color-text-base))] leading-snug line-clamp-2 mb-4"
            title={item.name}
          >
            {item.name}
          </h3>

          <div className="mt-auto pt-4 border-t border-[rgb(var(--color-border))] flex flex-wrap items-baseline gap-2">
            <span className="text-xl font-semibold text-[rgb(var(--color-text-base))]">
              {formatPrice(finalPrice)} ₽
            </span>

            {hasDiscount && (
              <span className="text-sm text-[rgb(var(--color-text-tertiary))] line-through">
                {formatPrice(item.price)} ₽
              </span>
            )}
          </div>
        </div>
      </Card>
    </NavLink>
  );
});

ProductItem.displayName = 'ProductItem';

export default ProductItem;
