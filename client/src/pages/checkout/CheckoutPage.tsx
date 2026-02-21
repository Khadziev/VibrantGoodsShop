import React, { useState } from 'react';
import BackButton from '@/shared/ui/BackButton/BackButton';
import { toast } from 'react-toastify';
import {
  AiOutlineCreditCard,
  AiOutlineCheckCircle,
  AiOutlineLock,
  AiOutlineQuestionCircle,
} from 'react-icons/ai';
import { FaCcVisa, FaCcMastercard, FaApplePay, FaTruck, FaBoxOpen } from 'react-icons/fa';

const CheckoutPage = () => {
  const [shippingMethod, setShippingMethod] = useState<'courier' | 'pickup'>('courier');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple' | 'cash'>('card');

  const [isProcessing, setIsProcessing] = useState(false);
  const cartTotal = 45000;
  const shippingCost = shippingMethod === 'courier' ? 500 : 0;
  const finalTotal = cartTotal + shippingCost;

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      toast.success('Заказ успешно оплачен!');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-8">
          <BackButton />
          <h1 className="text-3xl font-extrabold text-gray-900">Оформление заказа</h1>
        </div>

        <form onSubmit={handlePayment} className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="w-full lg:w-2/3 space-y-8">
            <section className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="flex items-center justify-center w-8 h-8 bg-black text-white rounded-full text-sm">
                  1
                </span>
                Личные данные
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputGroup label="Имя" placeholder="ваше имя" />
                <InputGroup label="Фамилия" placeholder="ваша фамилия" />
                <InputGroup label="Телефон" placeholder="+7 (999) 000-00-00" type="tel" />
                <InputGroup label="Email" placeholder="@example.com" type="email" />
              </div>
            </section>
            <section className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="flex items-center justify-center w-8 h-8 bg-black text-white rounded-full text-sm">
                  2
                </span>
                Доставка
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <SelectionCard
                  selected={shippingMethod === 'courier'}
                  onClick={() => setShippingMethod('courier')}
                  icon={<FaTruck size={24} />}
                  title="Курьером"
                  desc="1-2 дня, до двери"
                  price="500 ₽"
                />
                <SelectionCard
                  selected={shippingMethod === 'pickup'}
                  onClick={() => setShippingMethod('pickup')}
                  icon={<FaBoxOpen size={24} />}
                  title="Самовывоз"
                  desc="Сегодня, из магазина"
                  price="Бесплатно"
                />
              </div>
              {shippingMethod === 'courier' && (
                <div className="mt-6 grid grid-cols-1 gap-6 animate-fade-in">
                  <InputGroup label="Город" placeholder="Москва" />
                  <InputGroup
                    label="Улица, дом, квартира"
                    placeholder="ваш адрес, дом или квартира"
                  />
                  <div className="grid grid-cols-2 gap-6">
                    <InputGroup label="Подъезд" placeholder="" />
                    <InputGroup label="Этаж" placeholder="" />
                  </div>
                </div>
              )}
            </section>

            <section className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="flex items-center justify-center w-8 h-8 bg-black text-white rounded-full text-sm">
                  3
                </span>
                Оплата
              </h2>

              <div className="space-y-3">
                <PaymentOption
                  id="card"
                  title="Банковская карта"
                  icons={
                    <div className="flex gap-2 text-gray-600">
                      <FaCcVisa size={24} />
                      <FaCcMastercard size={24} />
                    </div>
                  }
                  selected={paymentMethod === 'card'}
                  onClick={() => setPaymentMethod('card')}
                />
                {paymentMethod === 'card' && (
                  <div className="p-6 bg-gray-50 rounded-xl border border-gray-200 grid grid-cols-1 gap-4 animate-fade-in">
                    <InputGroup
                      label="Номер карты"
                      placeholder="0000 0000 0000 0000"
                      icon={<AiOutlineCreditCard />}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <InputGroup label="Срок действия" placeholder="MM/YY" />
                      <InputGroup
                        label="CVC/CVV"
                        placeholder="123"
                        icon={<AiOutlineQuestionCircle />}
                      />
                    </div>
                    <div className="flex items-center gap-2 text-xs text-green-600 font-medium mt-2">
                      <AiOutlineLock /> Данные защищены SSL-шифрованием
                    </div>
                  </div>
                )}

                <PaymentOption
                  id="apple"
                  title="Apple Pay / Google Pay"
                  icons={<FaApplePay size={28} />}
                  selected={paymentMethod === 'apple'}
                  onClick={() => setPaymentMethod('apple')}
                />

                <PaymentOption
                  id="cash"
                  title="При получении"
                  icons={<span className="text-sm text-gray-500">Наличные или карта</span>}
                  selected={paymentMethod === 'cash'}
                  onClick={() => setPaymentMethod('cash')}
                />
              </div>
            </section>
          </div>
          <div className="w-full lg:w-1/3 sticky top-24">
            <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Ваш заказ</h3>
              <div className="max-h-60 overflow-y-auto pr-2 mb-6 space-y-4 scrollbar-hide">
                {[1, 2].map((i) => (
                  <div key={i} className="flex gap-3 items-center">
                    <div className="w-14 h-14 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                      <img
                        src="/placeholder.jpg"
                        className="w-full h-full object-cover mix-blend-multiply"
                        alt="product"
                      />
                    </div>
                    <div className="flex-grow">
                      <p className="text-sm font-medium text-gray-900 line-clamp-1">
                        Супер Товар {i}
                      </p>
                      <p className="text-xs text-gray-500">Красный, XL</p>
                    </div>
                    <span className="text-sm font-semibold">22 500 ₽</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-4 space-y-2 mb-6">
                <div className="flex justify-between text-gray-500">
                  <span>Товары</span>
                  <span>{cartTotal.toLocaleString()} ₽</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Доставка</span>
                  <span className={shippingCost === 0 ? 'text-green-600' : ''}>
                    {shippingCost === 0 ? 'Бесплатно' : `${shippingCost} ₽`}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-end mb-6 pt-4 border-t border-gray-100">
                <span className="text-lg font-bold text-gray-900">К оплате</span>
                <span className="text-3xl font-extrabold text-gray-900">
                  {finalTotal.toLocaleString()} ₽
                </span>
              </div>

              <button
                disabled={isProcessing}
                className="w-full py-4 bg-black text-white rounded-xl font-bold text-lg shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <AiOutlineCheckCircle size={20} />
                    Оплатить заказ
                  </>
                )}
              </button>

              <p className="text-center text-xs text-gray-400 mt-4 px-4">
                Нажимая кнопку, вы соглашаетесь с условиями обработки персональных данных
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const InputGroup = ({ label, placeholder, type = 'text', icon }: any) => (
  <div className="flex flex-col gap-1.5 w-full">
    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">
      {label}
    </label>
    <div className="relative">
      <input
        type={type}
        placeholder={placeholder}
        className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-medium placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all"
      />
      {icon && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">{icon}</div>
      )}
    </div>
  </div>
);
const SelectionCard = ({ selected, onClick, icon, title, desc, price }: any) => (
  <div
    onClick={onClick}
    className={`cursor-pointer p-4 rounded-2xl border-2 transition-all duration-200 flex items-center gap-4
            ${
  selected
    ? 'border-black bg-gray-900 text-white shadow-lg'
    : 'border-gray-100 bg-white text-gray-900 hover:border-gray-300'
  }`}
  >
    <div
      className={`p-3 rounded-full ${selected ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'}`}
    >
      {icon}
    </div>
    <div className="flex-grow">
      <p className="font-bold text-sm md:text-base">{title}</p>
      <p className={`text-xs ${selected ? 'text-gray-300' : 'text-gray-500'}`}>{desc}</p>
    </div>
    <span className={`font-bold text-sm ${selected ? 'text-white' : 'text-gray-900'}`}>
      {price}
    </span>
  </div>
);
const PaymentOption = ({ id, title, icons, selected, onClick }: any) => (
  <div
    onClick={onClick}
    className={`cursor-pointer w-full p-4 rounded-xl border transition-all flex items-center justify-between
            ${
  selected
    ? 'border-black ring-1 ring-black bg-white shadow-md'
    : 'border-gray-200 bg-white hover:bg-gray-50'
  }`}
  >
    <div className="flex items-center gap-3">
      <div
        className={`w-5 h-5 rounded-full border flex items-center justify-center ${selected ? 'border-black' : 'border-gray-300'}`}
      >
        {selected && <div className="w-2.5 h-2.5 bg-black rounded-full" />}
      </div>
      <span className="font-semibold text-gray-900">{title}</span>
    </div>
    <div className="text-gray-500">{icons}</div>
  </div>
);

export default CheckoutPage;
