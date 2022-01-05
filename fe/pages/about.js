import { Footer, Header, Navbar, Title } from '../components/layout';

import styles from '../styles/Home.module.css';
import stylesAbout from '../styles/About.module.css';



export default function About() {

    return (
        <div className="container">
            <Header current="About" />

            <main className="main">
                <Title />
                <Navbar current='/about' />

                <div className={stylesAbout.content}>
                    <h3>What?</h3>
                    <p className={stylesAbout.pWrapper}>
                        <strong>Yokupoku</strong> is just a website containing small reviews of <strong>Games</strong>, <strong>Books</strong>,<strong>Movies</strong> made by someone who has a short attention span.
                        <p>Reading <strong>reviews</strong> online gets quite boring, all of those review video on <strong>Youtube</strong>.<br />
                            25 minutes with ads in the middle to tell you whether a game is worth it or not.</p>
                        <p>My plan is to make short and sweet reviews of:<br /> <strong>games</strong> I play (<strong>books</strong> I read, <strong>movies</strong> I watch... etc.), not ads, no filler, just few words and whether they are worth consuming or not.</p>
                    </p>

                    <h3>Who?</h3>
                    <p className={stylesAbout.pWrapper}>
                        I am just a <a href="//vikkio.me" target="_blank">guy</a> who likes videogames and other nerdy stuff, but also one who gets bored of them quite quickly.
                    </p>

                    <h3>Why?</h3>
                    <p className={stylesAbout.pWrapper}>
                        Because I had a giant library of <strong>Video Games</strong> and I could not remember which one I liked or didn't like.
                        <p>
                            So I decided to force myself to try them (the aim is to try them all), and leave a review ocne I got bored of them.
                        </p>
                        <p>
                            Since I was developing this small platform, I thought I might as well make it extendable so I could review other medium I enjoy.
                        </p>
                        <p>In here you will read reviews for: <strong>Video Games</strong>, <strong>Books</strong>, <strong>Movies</strong>, <strong>Tv Series</strong>, <strong>Music</strong>,  and the likes.</p>
                    </p>

                    <h3>How?</h3>
                    <p className={stylesAbout.pWrapper}>
                        This is just a small <strong>NextJs</strong> website (soon I will release the sourcecode too).
                        <p>I have a database of products I consume and whenever I feel like it I will publish a review.</p>
                        <p>One of the metrics I will use is the <strong>B.S.I.</strong> (Boredom Speed Index 🥱).</p>
                        <p>the BSI, is in percentage, and the lower the better. It will indicate how fast a certain thing gets boring, it can be an amazingly crafted product, but if it get you to boredom quickly, then it is no good.</p>
                    </p>


                    <h3>Disclaimer</h3>
                    <p className={stylesAbout.pWrapper}>
                        Opinions are mine, and your personal experience on the same medium may be different than mine and I could not give a flying fuck about it.
                    </p>
                </div>
            </main>

            <Footer className={styles.footer} />
        </div>
    );
};