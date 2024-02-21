import { useState } from "react";
import { AiOutlineCaretLeft, AiOutlineCaretRight } from "react-icons/ai";
import { useFetchDiscountedProductsQuery } from "@/apiServices/api/userApi";
import Frame from "@/UI/Frame/Frame";
import SectionTitle from "@/UI/SectionTitle/SectionTitle";
import Loading2 from "@/UI/Loading/Loading2";
import Text from "@/UI/Text/Text";
import styles from "./Categories.module.css";
import { NavLink } from "react-router-dom";


const DiscountedItems = () => {
  const { data: products, isLoading, error } = useFetchDiscountedProductsQuery(null);
  const [currentPage, setCurrentPage] = useState(1);

  if (isLoading || !products) {
    if (error) console.error(error);
    return <Loading2 />;
  }

  const itemsPerPage = 5;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const nextPage = () => {
    setCurrentPage((prevPage) => (prevPage % totalPages) + 1);
  };

  const previousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  return (
    <Frame>
      <div style={{ marginTop: 0 }}>
        <SectionTitle title="действует скидка" />
      </div>
      <section className={styles.section}>
        <div className={styles.arrows}>
          <button onClick={previousPage} className={styles.arrow}>
            <AiOutlineCaretLeft size={40} />
          </button>
        </div>
        <div className={styles.list}>
          {currentProducts.map((item) => (
            <NavLink to={`/data/${item._id}`} key={item._id} className={styles.item}>
              <div>
                <img src={item.imageURL[0]} alt={item.name} className={styles.image} />
              </div>
              <div>
                <Text text={item.name} align="center" color="white" />
                <Text text={`${item.price} $`} align="center" color="white" />
                <Text
                  text={`новая цена : ${item.price * (1 - item.discount / 100)} $`}
                  color="green"
                  align="center"
                />
                <Text text={`Скидка: ${item.discount}%`} align="center" isBlinking color="green" />
              </div>

            </NavLink>
          ))}
        </div>
        <div className={styles.arrows}>
          <button onClick={nextPage} className={styles.arrow}>
            <AiOutlineCaretRight size={40} />
          </button>
        </div>
      </section>
    </Frame>
  );
};

export default DiscountedItems;
