import { useState } from 'react';
import Link from 'next/link';
import { T } from '../common';
import styles from './styles/Games.module.css';

const Game = ({ name, meta, genre, reviews }) => {
    const hasReviews = Array.isArray(reviews) && reviews.length > 0;
    const hasGenre = Boolean(genre);
    const played = Boolean(meta?.played);
    return (
        <div className={styles.game}>

            <strong>{name}</strong>
            <div className={styles.meta}>
                ({hasGenre && `${genre} `}{meta?.device})
            </div>
            <div className={styles.info}>
                <T title="Played?" position="bottom">
                    {played ? '✅' : '❌'}
                </T>
                {hasReviews && reviews.map((r, i) => (
                    <Link
                        key={r.id}
                        href={`/reviews/${r.slug}`}
                        title={`Review # ${i + 1} - ${r.title}`}
                    >
                        ➡️
                    </Link>
                ))}
            </div>
        </div>
    );
};

const renderResults = (games, results) => {
    if (results === 0) return <>Loading...</>;
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
    games = Boolean(name) ? games.filter((g) => g.name.toLowerCase().includes(name.toLowerCase())) : games;
    const results = games?.length || 0;

    return (
        <>
            <h2>Games 🎮</h2>
            {results > 0 && (<input className='bigInput' type="text" autoComplete="off" placeholder="Filter..." value={name} onChange={({ target: { value } }) => setName(value)} />)}
            {results > 0 && (<h4>{results} games</h4>)}
            {renderResults(games, results)}
        </>
    );
};


export default Games;;