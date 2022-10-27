import { useState } from 'react';
import Link from 'next/link';
import { T, Spinner } from '../common';
import styles from './styles/Games.module.css';

const hasReviews = ({ reviews }) => Array.isArray(reviews) && reviews.length > 0;
const wasPlayed = ({ meta }) => Boolean(parseFloat(meta?.played));

const Game = ({ slug, name, meta, genre, reviews }) => {
    const isReviews = hasReviews({ reviews });
    const played = wasPlayed({ meta });
    const hasGenre = Boolean(genre);
    const paid = Boolean(parseFloat(meta?.price));
    return (
        <div className={styles.game}>

            <strong>{name}</strong>
            <div className={styles.meta}>
                ({hasGenre && `${genre} `}{meta?.device})
            </div>
            <div className={styles.info}>
                <T title={played ? 'Played' : 'Not Played Yet'} position="bottom">
                    {played ? '✅' : '❌'}
                </T>
                <T title={paid ? 'Paid' : 'Freebie'} position="bottom">
                    {paid ? '💰' : '🆓'}
                </T>
                {isReviews && (
                    <Link
                        href={`/products/${slug}`}
                        title={`Product Details`}
                    >
                        ➡️
                    </Link>
                )}
            </div>
        </div>
    );
};

const renderResults = (games, results) => {
    if (results === 0) return <h1>😲</h1>;
    if (results > 0) return (
        <div className={styles.results} >
            {
                games.map(g => {
                    return <Game key={g.id} {...g} />;
                })
            }
        </div>
    );
};

const Games = ({ games = [] }) => {
    const [name, setName] = useState('');
    const [playedOnly, setPlayedOnly] = useState(false);
    const [reviewedOnly, setReviewedOnly] = useState(false);
    const totalGames = games?.length || 0;

    let filteredGames = Boolean(name) ? games.filter((g) => g.name.toLowerCase().includes(name.toLowerCase())) : games;
    filteredGames = playedOnly ? filteredGames.filter(wasPlayed) : filteredGames;
    filteredGames = reviewedOnly ? filteredGames.filter(hasReviews) : filteredGames;
    const results = filteredGames?.length || 0;

    return (
        <>
            <h2>Games 🎮</h2>
            {(totalGames === 0) && <Spinner />}
            {totalGames > 0 && (
                <div className={styles.filters}>
                    <input className='bigInput' type="text" autoComplete="off" placeholder="Filter..." value={name} onChange={({ target: { value } }) => setName(value)} />
                    <T title="Show Only Played Games">
                        <div>
                            <label for="playedOnly">🎮</label>
                            <input id="playedOnly" type="checkbox" value={playedOnly} onChange={() => setPlayedOnly(!playedOnly)} />
                        </div>
                    </T>
                    <T title="Show Only Reviewed Games">
                        <div>
                            <label for="reviewedOnly">✍️</label>
                            <input id="reviewedOnly" type="checkbox" value={reviewedOnly} onChange={() => setReviewedOnly(!reviewedOnly)} />
                        </div>
                    </T>
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


export default Games;;;