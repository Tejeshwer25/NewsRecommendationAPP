import styles from "./Card.module.css";

function Card({ link, media, title, article }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <a href={link} target="_blank" rel="noreferrer">
          {media ? <img src={media} alt="" /> : <></>}
        </a>
      </div>

      <div className={styles.cardBody}>
        <h3>{title}</h3>
        <p>{article}</p>
      </div>
    </div>
  );
}

export default Card;
