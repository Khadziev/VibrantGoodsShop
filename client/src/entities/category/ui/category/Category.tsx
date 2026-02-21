import { useGetAllCategoriesQuery } from '@/entities/category/api/apiCategory';
import Loading from '@/shared/ui/Loading/Loading';
import CategoryLgBox from './CategoryLgBox';
import Text from '@/shared/ui/Text/Text';

const Category = () => {
  const { data: categories, isLoading, isError, error } = useGetAllCategoriesQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 py-10">
        Ошибка: {error?.toString() || 'Неизвестная ошибка'}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Text text="Категории товаров" color="black" size="xl" align="center" />
      <div className="mt-10">
        <div className="hidden lg:grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 w-full">
          {categories?.map((categoryItem, index) => (
            <CategoryLgBox item={categoryItem} key={categoryItem.title} isFirstItem={index === 0} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
