import { Link } from 'react-router-dom';
import { MdHome, MdShoppingCart, MdViewList } from 'react-icons/md';
import { useGetCartByUserIdQuery } from '../../apiServices/api/apiCart';
import { useAppSelector } from '../../app/providers/store';
import Button from '../../UI/Button/Button';
import { CgProfile } from 'react-icons/cg';
import { AiOutlineMessage } from 'react-icons/ai'
import { useGetMessagesQuery } from '../../apiServices/api/apiMessage';

const Navigation = () => {
  const userId = useAppSelector((state) => state.auth.userId);
  const { data: cartData } = useGetCartByUserIdQuery(userId || '', { skip: !userId });
  const { data: messagesData } = useGetMessagesQuery();

  const cartItemsCount = cartData ? cartData.items.length : 0;
  const messagesCount = messagesData ? messagesData.length : 0;

  return (
    <nav className="flex justify-center p-4 text-black">
      <Link to="/" className="mx-4 focus:outline-none text-center flex flex-col items-center">
        <MdHome size={32} className="m-auto"/>
        <Button text='Главная' color='black'/>
      </Link>
      <Link to="/data/all" className="mx-4 focus:outline-none text-center flex flex-col items-center">
        <MdViewList size={32} className="m-auto"/>
        <Button text='Все товары' color='black' />
      </Link>
      <Link to="/cart" className="mx-4 focus:outline-none text-center flex flex-col items-center relative">
        <MdShoppingCart size={32} className="m-auto"/>
        <Button text='Корзина' color='black'/>
        {cartItemsCount > 0 &&
          <div className="absolute top-0 right-0 bg-red-500 rounded-full text-white text-sm w-5 h-5 flex items-center justify-center">
            {cartItemsCount}
          </div>
        }
      </Link>
      <Link to="/users/:id" className="mx-4 focus:outline-none text-center flex flex-col items-center">
        <CgProfile size={32} className="m-auto"/>
        <Button text='Профиль' color='black' />
      </Link>
      <Link to="/message" className="mx-4 focus:outline-none text-center flex flex-col items-center relative">
        <AiOutlineMessage size={32} className="m-auto"/>
        <Button text='сообщения' color='black' />
        {messagesCount > 0 &&
          <div className="absolute top-0 right-0 bg-red-500 rounded-full text-white text-sm w-5 h-5 flex items-center justify-center">
            {messagesCount}
          </div>
        }
      </Link>
    </nav>
  );
}

export default Navigation;
