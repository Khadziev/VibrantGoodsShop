import React, { memo, useState, useCallback, useMemo } from 'react';
import { useFetchProductByIdQuery } from '@/shared/api/userApi';
import { useParams } from 'react-router-dom';
import AddToCartButton from '@/features/add-to-cart/AddToCartButton';
import ReviewsModal from '@/entities/review/ui/Review/ReviewsModal';
import BackButton from '@/shared/ui/BackButton/BackButton';
import SimilarProducts from '@/entities/product/ui/SimilarProducts';
import Loading from '@/shared/ui/Loading/Loading';
import Text from '@/shared/ui/Text/Text';

const ProductDetailsPage: React.FC = memo(() => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, isError } = useFetchProductByIdQuery(id || '');
  const [selectedImage, setSelectedImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageChange = useCallback((index: number) => {
    setSelectedImage(index);
  }, []);

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const specifications = useMemo(() => {
    if (!product) return [];
    return [
      { label: 'Камера', value: product.specifications?.camera || 'Не указано' },
      { label: 'Память', value: product.specifications?.memory || 'Не указано' },
      { label: 'Процессор', value: product.specifications?.processor || 'Не указано' },
      { label: 'Экран', value: product.specifications?.screen || 'Не указано' },
      { label: 'Хранилище', value: product.specifications?.storage || 'Не указано' },
    ];
  }, [product]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="text-center py-20 text-[rgb(var(--color-error))]">
        {isError ? 'Ошибка при получении данных' : 'Товар не найден'}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[rgb(var(--color-bg))] pb-16">
      <div className="max-w-[1440px] mx-auto px-4 pt-24">
        <BackButton />
        <div className="flex flex-col lg:flex-row bg-[rgb(var(--color-bg-card))] rounded-2xl shadow-lg overflow-hidden mt-6">
          <div className="w-full lg:w-1/2 p-6">
            <h1 className="text-3xl font-bold text-[rgb(var(--color-text-base))] mb-4">
              {product.title}
            </h1>
            <div className="flex flex-col items-center">
              <img
                src={product.imageURL[selectedImage]}
                alt={product.name}
                className="object-contain w-full h-96 rounded-xl shadow-lg border border-[rgb(var(--color-border))]"
              />
              <div className="flex space-x-3 mt-4 overflow-x-auto py-2">
                {product.imageURL.map((img, index) => (
                  <div
                    key={index}
                    className={`flex-shrink-0 h-20 w-20 rounded-lg border-2 cursor-pointer transition-all ${
                      index === selectedImage
                        ? 'border-[rgb(var(--color-primary))] shadow-lg'
                        : 'border-[rgb(var(--color-border))]'
                    }`}
                    onClick={() => handleImageChange(index)}
                  >
                    <img
                      src={img}
                      alt={`product ${index}`}
                      className="object-cover w-full h-full rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 p-8 bg-[rgb(var(--color-bg-tertiary))]">
            <div className="font-bold text-2xl text-[rgb(var(--color-text-base))] mb-4">
              {product.name}
            </div>
            <h2 className="font-semibold text-xl mb-6 text-[rgb(var(--color-text-secondary))]">
              Характеристики
            </h2>
            <div className="space-y-3 mb-6">
              {specifications.map((spec, i) => (
                <div
                  key={i}
                  className="flex justify-between border-b border-[rgb(var(--color-border))] pb-2"
                >
                  <span className="text-[rgb(var(--color-text-secondary))] font-medium">
                    {spec.label}
                  </span>
                  <span className="text-[rgb(var(--color-text-base))] font-semibold">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
            <div className="text-2xl font-bold text-[rgb(var(--color-primary))] mb-6">
              Цена: {product.price} ₽
            </div>
            <AddToCartButton product={product} />
            <div className="mt-8 flex justify-center">
              <button
                onClick={handleOpenModal}
                className="bg-[rgb(var(--color-primary))] text-white px-6 py-3 rounded-full shadow-md hover:opacity-90 transition-opacity"
              >
                Просмотреть отзывы
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-[rgb(var(--color-bg-card))] rounded-2xl shadow-lg p-8">
          <Text text="Описание" size="xl" color="black" className="font-bold mb-4" />
          <p className="text-[rgb(var(--color-text-secondary))] leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="mt-12">
          <ReviewsModal productId={id || ''} isOpen={isModalOpen} onClose={handleCloseModal} />
          <SimilarProducts productId={id || ''} />
        </div>
      </div>
    </div>
  );
});

ProductDetailsPage.displayName = 'ProductDetailsPage';

export default ProductDetailsPage;
