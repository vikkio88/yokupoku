import { useEffect, useState } from "react";
import type { Meta, Product, ReviewCompact } from "../../libs/types";
import { Game } from "./Game";
import styles from "./Games.module.css";

const Spinner = () => <div className={styles.loader} />;

const hasReviews = (reviews?: ReviewCompact[]): boolean =>
  Array.isArray(reviews) && reviews.length > 0;
const wasPlayed = (meta?: Meta) => Boolean(meta?.played);

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
  const reviewedGames =
    games?.filter(({ reviews }) => hasReviews(reviews)) || [];
  const playedGames = games?.filter(({ meta }) => wasPlayed(meta)) || [];

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
        <>
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
          <div className={styles.progressBars}>
            <div
              className={styles.progressBarWrapper}
              title={`Played ${playedGames.length} / ${totalGames} games`}
            >
              <div
                className={`${styles.progressBar} ${styles.played}`}
                style={{ width: `${(playedGames.length / totalGames) * 100}%` }}
              >
                <span className={styles.progressText}>
                  🎮 Played {playedGames.length} / {totalGames}
                </span>
              </div>
            </div>
            <div
              className={styles.progressBarWrapper}
              title={`Reviewed ${reviewedGames.length} / ${playedGames.length} games`}
            >
              <div
                className={`${styles.progressBar} ${styles.reviewed}`}
                style={{
                  width: `${
                    (reviewedGames.length / playedGames.length) * 100
                  }%`,
                }}
              >
                <span className={styles.progressText}>
                  ✍️ Reviewed {reviewedGames.length} / {playedGames.length}
                </span>
              </div>
            </div>
          </div>
        </>
      )}

      {totalGames > 0 && (
        <>
          <h4 className={styles.count}>
            displaying: {results} / {totalGames} games
          </h4>
          {renderResults(filteredGames, results)}
        </>
      )}
    </>
  );
};

export default Games;
