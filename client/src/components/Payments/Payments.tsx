import React, { useState } from 'react';
import { useCreatePaymentMutation } from '@/apiServices/api/paymentsApi';



export const Payments: React.FC = () => {
  //const { data = [], isLoading } = useGetAllPaymentsQuery();
  const [createPayment, { isLoading: isCreating }] = useCreatePaymentMutation();

  const [quantity, setQuantity] = useState<number>(0);
  const [street, setStreet] = useState<string>('');
  const [houseNumber, setHouseNumber] = useState<string>('');
  const [apartmentNumber, setApartmentNumber] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [zip, setZip] = useState<string>('');

  const pricePerItem = 100;

  const handleCreatePayment = () => {
    const amount = quantity * pricePerItem;
    const description = `Покупка ${quantity} единиц товара`;

    createPayment({ amount, description, street, houseNumber, apartmentNumber, city, zip });
    setQuantity(0);
    setStreet('');
    setHouseNumber('');
    setApartmentNumber('');
    setCity('');
    setZip('');
  };

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div>
      <h1>Платежи</h1>
      <div>
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Город" />
        <input type="text" value={street} onChange={(e) => setStreet(e.target.value)} placeholder="Улица" />
        <input type="text" value={houseNumber} onChange={(e) => setHouseNumber(e.target.value)} placeholder="Номер дома" />
        <input type="text" value={apartmentNumber} onChange={(e) => setApartmentNumber(e.target.value)} placeholder="Номер квартиры" />
        <input type="text" value={zip} onChange={(e) => setZip(e.target.value)} placeholder="Почтовый индекс" />
      </div>
      <div>
        <button onClick={handleCreatePayment} disabled={isCreating}>
          оплатить
        </button>
      </div>
    </div>
  );
};
