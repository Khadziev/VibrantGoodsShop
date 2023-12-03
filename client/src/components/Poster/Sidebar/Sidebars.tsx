import styles from "./Sidebar.module.css";

const Sidebars = () => {
  const categories = [
    { name: "Электроника", path: "/data/all" },
    { name: "Мода и одежда", path: "#" },
    { name: "Красота и спорт", path: "#" },
    { name: "Все для дома", path: "#" },
    { name: "Игрушки", path: "#" },
    { name: "Канцелярские товары", path: "#" },
  ];

  return (
    <section className={styles.sidebar}>
      <div className={styles.title}>котегории</div>
      <ul className={styles.categoryList}>
        {categories.map((category, index) => (
          <li key={index}>
            <a href={category.path}>
              {category.name}
              {category.name !== "Электроника" && <span className={styles.unavailable}> - Ожидается</span>}
            </a>
          </li>
        ))}
      </ul>

      <div className={styles.footer}></div>
    </section>
  );
};

export default Sidebars;
