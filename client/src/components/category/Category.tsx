import SectionTitle from '@/UI/SectionTitle/SectionTitle';
import { useGetAllCategoriesQuery } from '@/apiServices/api/apiCategory';
import CategoryLgBox from './CategoryLgBox';

const Category = () => {
  const { data: categories, isLoading, isError, error } = useGetAllCategoriesQuery();

  return (
    <div className="flex flex-col items-center my-4 md:my-8">
      <SectionTitle title="Категория товаров" />
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error: {error + 'ошибка'}</div>}

      <div className="hidden lg:grid  gap-4 grid-rows-9 grid-cols-2 md:grid-cols-9 w-full xl:max-w-[2100px] mx-auto">
        {categories?.map((categoryItem, index) => (
          <CategoryLgBox
            item={categoryItem}
            key={categoryItem.title}
            isFirstItem={index === 0}
          />
        ))}
      </div>
    </div>
  );
};

export default Category;
