import styles from "./index.module.scss";
const Chip = ({ title }: { title: string }) => {
  return (
    <div className={styles.container}>
      <span className={styles.title}>{title}</span>
    </div>
  );
};

export default Chip;
