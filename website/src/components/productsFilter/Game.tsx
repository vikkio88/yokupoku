import type { GAMES_STORES } from "yokupoku-shared";
import type { Meta, Product, ReviewCompact } from "../../libs/types";
import styles from "./Games.module.css";

export const GAMES_STORES_ICONS: Record<(typeof GAMES_STORES)[number], string> =
  {
    steam: "steam",
    gog: "gogdotcom",
    origin: "origin",
    epic: "epicgames",
    "battle.net": "battledotnet",
    ubi: "ubisoft",
    "itch.io": "itchdotio",
    "nintendo:eshop": "nintendo",
    "playstation:store": "playstation",
    "xbox:store": "xbox",
    amazon: "amazon",
    "amazon:used": "amazon",
    physicalsupport: "box",
    other: "gamepad",
  };

type GameStore = keyof typeof GAMES_STORES_ICONS;

const hasReviews = (reviews?: ReviewCompact[]): boolean =>
  Array.isArray(reviews) && reviews.length > 0;
const wasPlayed = (meta?: Meta) => Boolean(meta?.played);

function getStoreIcon(store?: string): string {
  const key = (
    store && GAMES_STORES_ICONS[store as GameStore] ? store : "other"
  ) as keyof typeof GAMES_STORES_ICONS;
  return `https://simpleicons.org/icons/${GAMES_STORES_ICONS[key]}.svg`;
}

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
