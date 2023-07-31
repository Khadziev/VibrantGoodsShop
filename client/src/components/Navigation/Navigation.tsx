import { Link } from 'react-router-dom';
import { MdHome, MdShoppingCart, MdViewList } from 'react-icons/md';
import { useGetCartByUserIdQuery } from '../../apiServices/api/apiCart';
import { useAppSelector } from '../../app/providers/store';
import Button from '../../UI/Button/Button';
import { CgProfile } from 'react-icons/cg'

const Navigation = () => {
  const userId = useAppSelector((state) => state.auth.userId);
  const { data: cartData } = useGetCartByUserIdQuery(userId || '', { skip: !userId });

  const cartItemsCount = cartData ? cartData.items.length : 0;

  return (
    <nav className="flex justify-center p-4 text-black">
      <Link to="/" className="mx-4 focus:outline-none text-center">
        <div><MdHome size={32} className="m-auto"/></div>
        <Button text='Главная' color='black'/>
      </Link>
      <Link to="/data/all" className="mx-4 focus:outline-none text-center">
        <div><MdViewList size={32} className="m-auto"/></div>
        <Button text='Все товары' color='black' />
      </Link>
      <Link to="/cart" className="mx-4 focus:outline-none text-center relative">
        <div><MdShoppingCart size={32} className="m-auto"/></div>
        <Button text='Корзина' color='black'/>
        {cartItemsCount > 0 &&
          <div className="absolute top-0 right-0 bg-red-500 rounded-full text-white text-sm w-5 h-5 flex items-center justify-center">
            {cartItemsCount}
          </div>
        }
      </Link>
      <Link to="/users/:id" className="mx-4 focus:outline-none text-center">
        <div><CgProfile size={32} className="m-auto"/></div>
        <Button text='Профиль' color='black' />
      </Link>
    </nav>
  );
}

export default Navigation;
