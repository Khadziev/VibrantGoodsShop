import React from 'react';
import { useFetchAllProductsQuery } from '../../redux/user/userApi';

const UserGetData: React.FC = () => {
  const { data, isLoading } = useFetchAllProductsQuery(null);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div >
      {data?.map((item) => (
        <div>
          <div className='fondo2 cursor-pointer w-56 h-60 rounded-lg relative border'>
            <figure
              className='relative mb-2 w-full h-4/5'
            >
              <span className='absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-xs m-2 px-3 py-0.5 flex justify-center items-center'>
                {item.category}
              </span>
              <img src={item.imageURL} alt={`imageURL ${item.title}`} className='w-full h-full object-contain rounded-lg' />
            </figure>
            <p className='flex justify-between px-1'>
              <span className='text-sm font-light'>
                { item.name}
              </span>
              <span className='text-lg font-medium'>${item.price}</span>
            </p>

          </div>
        </div>
      ))}
    </div>

  );
};

export default UserGetData;

