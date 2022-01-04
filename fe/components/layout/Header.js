import Head from 'next/head';

const Header = ({ current = '' }) => {
    const additionalLabel = `${current !== '' ? ' ' : ''}${current}${current !== '' ? ' - ' : ''}`;
    return (
        <Head>
            <title>Yokupoku -{additionalLabel} Reviews for people with short attention spans</title>
            <meta lang="en" />
            <meta charSet="utf-8" />
            <meta name="description" content={`Yokupoku -${additionalLabel} reviews for people with short attention spans`} />
            <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
            <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        </Head>
    );
};

export default Header;