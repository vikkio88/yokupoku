import { useEffect, useState } from "react";
import styles from "./Games.module.css";
import type { Meta, Product, ReviewCompact } from "../../libs/types";

const Spinner = () => <div className={styles.loader} />;

const hasReviews = (reviews?: ReviewCompact[]): boolean =>
  Array.isArray(reviews) && reviews.length > 0;
const wasPlayed = (meta?: Meta) => Boolean(meta?.played);

const Game = ({ slug, name, meta, genre, reviews }: Product) => {
  const isReviews = hasReviews(reviews);
  const played = wasPlayed(meta);
  const hasGenre = Boolean(genre);
  const paid = Boolean(meta?.price);
  return (
    <div className={styles.game}>
      <strong>{name}</strong>
      <div className={styles.meta}>
        ({hasGenre && `${genre} `}
        {meta?.device})
      </div>
      <div className={styles.info}>
        <div title={played ? "Played" : "Not Played Yet"}>
          {played ? "✅" : "❌"}
        </div>
        <div title={paid ? "Paid" : "Freebie"}>{paid ? "💰" : "🆓"}</div>
        {isReviews && (
          <a href={`/products/${slug}`} title={`${name} Details`}>
            ➡️
          </a>
        )}
      </div>
    </div>
  );
};

const renderResults = (games: Product[], results: number) => {
  if (results === 0) return <h1>😲</h1>;
  if (results > 0)
    return (
      <div className={styles.results}>
        {games.map((g) => {
          return <Game key={g.id} {...g} />;
        })}
      </div>
    );
};

const Games = () => {
  const [games, setGames] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [playedOnly, setPlayedOnly] = useState(false);
  const [reviewedOnly, setReviewedOnly] = useState(false);
  const totalGames = games?.length || 0;
  useEffect(() => {
    const getGames = async () => {
      const resp = await fetch("/data/games.json");
      const gs = (await resp.json()) as Product[];
      setGames(gs);
    };
    getGames();
  }, [setGames]);

  let filteredGames = Boolean(name)
    ? games.filter((g) => g.name.toLowerCase().includes(name.toLowerCase()))
    : games;
  filteredGames = playedOnly
    ? filteredGames.filter(({ meta }) => wasPlayed(meta))
    : filteredGames;
  filteredGames = reviewedOnly
    ? filteredGames.filter(({ reviews }) => hasReviews(reviews))
    : filteredGames;
  const results = filteredGames?.length || 0;

  return (
    <>
      <h2>Games 🎮</h2>
      {totalGames === 0 && <Spinner />}
      {totalGames > 0 && (
        <div className={styles.filters}>
          <input
            type="text"
            autoComplete="off"
            placeholder="Filter Game..."
            value={name}
            onChange={({ target: { value } }) => setName(value)}
          />
          <div className={styles.checks}>
            <div className={styles.filter} title="Show Only Played Games">
              <label htmlFor="playedOnly">🎮</label>
              <input
                id="playedOnly"
                type="checkbox"
                checked={playedOnly}
                onChange={() => setPlayedOnly(!playedOnly)}
              />
            </div>

            <div className={styles.filter} title="Show Only Reviewed Games">
              <label htmlFor="reviewedOnly">✍️</label>
              <input
                id="reviewedOnly"
                type="checkbox"
                checked={reviewedOnly}
                onChange={() => setReviewedOnly(!reviewedOnly)}
              />
            </div>
          </div>
        </div>
      )}
      {totalGames > 0 && (
        <>
          <h4>{results} games</h4>
          {renderResults(filteredGames, results)}
        </>
      )}
    </>
  );
};

export default Games;
