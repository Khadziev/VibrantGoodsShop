import styles from "./Home.module.css";

import bannerImg from "../../../images/homes/shop.jpg";

const Banner = () => (
  <section className={styles.banner}>
    <div className={styles.left}>
      <p className={styles.content}>
        СКОРО
        <span>АКЦИЯ</span>
      </p>
      {/* <button className={styles.more}>Подробнее</button> */}
    </div>

    <div className={styles.right} style={{ backgroundImage: `url(${bannerImg})` }}>
      <p className={styles.discount}>
        Сэкономьте до <span>50%</span>
      </p>
    </div>
  </section>
);

export default Banner;
