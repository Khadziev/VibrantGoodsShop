import React from "react";
import { DataAttributesApi } from "@/components/Admin/product/model/model";
import styles from './Products.module.css';
import { NavLink } from "react-router-dom";

interface ProductItemProps {
    item: DataAttributesApi;
}

const ProductItemHome: React.FC<ProductItemProps> = ({ item }) => {
  return (
    <section className={styles.products}>
      <div className={styles.list}>
        <NavLink to={`/data/${item._id}`} className={styles.product}>
          <div>
            <img src={item.imageURL[0]} alt=""
              className={styles.image} />
          </div>
          <div className={styles.wrapper}>
            <h3 className={styles.title}>{item.name}</h3>
            <div className={styles.cat}>{item.category}</div>
            <div className={styles.info}>
              <div className={styles.prices}>
                <div className={styles.price}>{item.price}$</div>
              </div>
              <div className={styles.purchases}>
                {Math.floor(Math.random() * 20 + 1)} куплен
              </div>
            </div>
          </div>
        </NavLink>
      </div>
    </section>
  );
};

export default ProductItemHome;
