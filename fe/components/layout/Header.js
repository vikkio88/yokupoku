import Head from 'next/head';
import { NextSeo } from 'next-seo';

const Header = ({ current = '', url = '/', description = null }) => {
    const additionalLabel = `${current !== '' ? ' ' : ''}${current}${current !== '' ? ' - ' : ''}`;
    description = description || `Yokupoku -${additionalLabel} reviews for people with short attention spans`;
    const title = `Yokupoku -${additionalLabel} Reviews for people with short attention spans`;
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta lang="en" />
                <meta charSet="utf-8" />
                <meta name="description" content={description} />
                <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
                <link rel="icon" href="/favicon.ico" type="image/x-icon" />
            </Head>
            <NextSeo
                title={title}
                description={description}
                openGraph={{
                    url: `${url}`,
                    title: `Yokupoku - ${additionalLabel}`,
                    description: description,
                    images: [
                        {
                            url: `https://yokupoku.website/backdrop.png`,
                            width: 640,
                            height: 480,
                            alt: 'Yokupoku',
                            type: 'image/png',
                        }],
                }}
                twitter={{ image: `https://yokupoku.website/backdrop.png` }}
            />
        </>
    );
};

export default Header;