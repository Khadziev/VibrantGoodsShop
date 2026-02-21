import React, { memo } from 'react';
import { useFetchAllProductsQuery } from '@/shared/api/userApi';
import SortingFields from '@/features/product-search/DataControls/SortingFields';
import SearchBar from '@/features/product-search/DataControls/SearchBar';
import { useProductData } from '@/shared/hooks/useProductData';
import ProductItem from '@/entities/product/ui/ProductItem';
import { BackButton, Loading, Alert, Button, Container, Badge, Card } from '@/shared/ui';
import { AiOutlineSearch } from 'react-icons/ai';

const ProductsPage: React.FC = memo(() => {
  const { data, isLoading, isError } = useFetchAllProductsQuery(null);

  const { selectedField, setSelectedField, searchQuery, setSearchQuery, sortedData } =
    useProductData(data || []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[rgb(var(--color-bg))]">
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <Container maxWidth="md">
        <div className="min-h-screen flex flex-col items-center justify-center bg-[rgb(var(--color-bg))] text-center px-4 py-12">
          <Alert variant="error" title="Ошибка загрузки">
            <p className="mt-2">Проверьте соединение с интернетом или попробуйте позже.</p>
            <div className="mt-6">
              <BackButton />
            </div>
          </Alert>
        </div>
      </Container>
    );
  }

  return (
    <section className="min-h-screen bg-[rgb(var(--color-bg))]">
      <div className="bg-[rgb(var(--color-bg))] border-b border-[rgb(var(--color-border))] pt-24 pb-12 px-4 md:px-8">
        <div className="max-w-[1440px] mx-auto relative">
          <div className="absolute -top-16 left-0 md:static md:mb-8">
            <BackButton />
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-medium text-[rgb(var(--color-text-tertiary))] uppercase tracking-wider mb-3 block">
                Каталог
              </span>
              <h1 className="text-4xl md:text-6xl font-semibold text-[rgb(var(--color-text-base))] tracking-tight mb-3">
                Все товары
              </h1>
              <p className="text-base text-[rgb(var(--color-text-secondary))] max-w-lg">
                Ознакомьтесь с нашим полным ассортиментом. Лучшее качество, отобранное специально
                для вас.
              </p>
            </div>

            <div className="hidden md:block">
              <Badge variant="primary" size="lg" className="text-lg px-5 py-2">
                {sortedData.length} позиций
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="sticky top-16 z-30 bg-white/80 backdrop-blur-xl border-b border-[rgb(var(--color-border))] py-4 px-4 md:px-8 transition-all">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="w-full sm:max-w-md">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>

          <div className="w-full sm:w-auto min-w-[200px]">
            <SortingFields selectedField={selectedField} onFieldChange={setSelectedField} />
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-12">
        {sortedData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch">
            {sortedData.map((item) => (
              <div key={item._id} className="h-full">
                <ProductItem item={item} />
              </div>
            ))}
          </div>
        ) : (
          <Card variant="default" padding="lg" className="text-center max-w-md mx-auto">
            <div className="bg-[rgb(var(--color-bg-tertiary))] p-6 rounded-full mb-6 text-[rgb(var(--color-text-tertiary))] w-20 h-20 flex items-center justify-center mx-auto">
              <AiOutlineSearch size={40} />
            </div>
            <h3 className="text-xl font-semibold text-[rgb(var(--color-text-base))] mb-2">
              Ничего не найдено
            </h3>
            <p className="text-base text-[rgb(var(--color-text-secondary))] mb-6">
              По запросу "{searchQuery}" товаров нет.
            </p>
            <Button variant="secondary" size="md" onClick={() => setSearchQuery('')}>
              Сбросить поиск
            </Button>
          </Card>
        )}
      </div>
    </section>
  );
});

ProductsPage.displayName = 'ProductsPage';

export default ProductsPage;
