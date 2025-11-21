import { getStoreIcon } from "yokupoku-shared";
import type { Meta, Product, ReviewCompact } from "../../libs/types";
import styles from "./Games.module.css";

const hasReviews = (reviews?: ReviewCompact[]): boolean =>
  Array.isArray(reviews) && reviews.length > 0;
const wasPlayed = (meta?: Meta) => Boolean(meta?.played);

export const Game = ({ slug, name, meta, genre, reviews }: Product) => {
  const isReviews = hasReviews(reviews);
  const played = wasPlayed(meta);
  const storeIcon = getStoreIcon(meta.store);
  const hasGenre = Boolean(genre);
  const paid = Boolean(meta?.price);
  return (
    <div className={styles.game}>
      <strong>{name}</strong>
      <img src={storeIcon} alt={meta.store} title={meta.store} />

      <div className={styles.meta}>
        ({hasGenre && `${genre} `}
        {meta?.device})
      </div>
      <div className={styles.info}>
        <div title={played ? "Played" : "Not Played Yet"}>
          {played ? "🎮" : "⏳"}
        </div>
        <div title={paid ? "Paid" : "Freebie"}>{paid ? "💰" : "🆓"}</div>
        {isReviews && (
          <a href={`/products/${slug}`} title={`Reviewed: ${name} Details`}>
            📝
          </a>
        )}
      </div>
    </div>
  );
};
