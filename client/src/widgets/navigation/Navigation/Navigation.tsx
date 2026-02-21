import { memo } from 'react';
import { Link } from 'react-router-dom';
import { MdHome, MdShoppingCart, MdViewList } from 'react-icons/md';
import { useGetCartByUserIdQuery } from '@/entities/cart/api/apiCart';
import { useAppSelector } from '@/app/providers/store';
import { logger } from '@/shared/lib/logger';
import { CgProfile } from 'react-icons/cg';
import { AiOutlineMessage } from 'react-icons/ai';
import { useGetMessagesQuery } from '@/shared/api/apiMessage';

const Navigation = memo(() => {
  const userId = useAppSelector((state) => state.auth.userId);
  const { data: cartData } = useGetCartByUserIdQuery(userId || '', { skip: !userId });
  const { data: messagesData } = useGetMessagesQuery();

  const cartItemsCount = cartData ? cartData.items.length : 0;
  const messagesCount = messagesData ? messagesData.length : 0;

  logger.debug('Navigation re-rendered', { cartItemsCount, messagesCount });

  return (
    <nav className="flex justify-center items-center gap-1 p-2 bg-[rgb(var(--color-bg-tertiary))] rounded-full">
      <Link
        to="/"
        className="px-4 py-2 rounded-full text-center flex items-center gap-2 text-[rgb(var(--color-text-secondary))] hover:text-[rgb(var(--color-text-base))] hover:bg-white transition-all duration-200 focus:outline-none"
      >
        <MdHome size={20} />
        <span className="text-sm font-medium hidden sm:inline">Главная</span>
      </Link>
      <Link
        to="/data/all"
        className="px-4 py-2 rounded-full text-center flex items-center gap-2 text-[rgb(var(--color-text-secondary))] hover:text-[rgb(var(--color-text-base))] hover:bg-white transition-all duration-200 focus:outline-none"
      >
        <MdViewList size={20} />
        <span className="text-sm font-medium hidden sm:inline">Товары</span>
      </Link>
      <Link
        to="/cart"
        className="px-4 py-2 rounded-full text-center flex items-center gap-2 relative text-[rgb(var(--color-text-secondary))] hover:text-[rgb(var(--color-text-base))] hover:bg-white transition-all duration-200 focus:outline-none"
      >
        <MdShoppingCart size={20} />
        <span className="text-sm font-medium hidden sm:inline">Корзина</span>
        {cartItemsCount > 0 && (
          <div className="absolute -top-1 -right-1 bg-[rgb(var(--color-primary))] rounded-full text-white text-xs w-5 h-5 flex items-center justify-center font-medium">
            {cartItemsCount}
          </div>
        )}
      </Link>
      <Link
        to={userId ? `/users/${userId}` : '/login'}
        className="px-4 py-2 rounded-full text-center flex items-center gap-2 text-[rgb(var(--color-text-secondary))] hover:text-[rgb(var(--color-text-base))] hover:bg-white transition-all duration-200 focus:outline-none"
      >
        <CgProfile size={20} />
        <span className="text-sm font-medium hidden sm:inline">Профиль</span>
      </Link>
      <Link
        to="/message"
        className="px-4 py-2 rounded-full text-center flex items-center gap-2 relative text-[rgb(var(--color-text-secondary))] hover:text-[rgb(var(--color-text-base))] hover:bg-white transition-all duration-200 focus:outline-none"
      >
        <AiOutlineMessage size={20} />
        <span className="text-sm font-medium hidden sm:inline">Сообщения</span>
        {messagesCount > 0 && (
          <div className="absolute -top-1 -right-1 bg-[rgb(var(--color-primary))] rounded-full text-white text-xs w-5 h-5 flex items-center justify-center font-medium">
            {messagesCount}
          </div>
        )}
      </Link>
    </nav>
  );
});

Navigation.displayName = 'Navigation';

export default Navigation;
