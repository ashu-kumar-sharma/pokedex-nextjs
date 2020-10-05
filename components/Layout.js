import Head from 'next/head';

export default function Home({ children, title }) {
    return (
        <div className="main-cont">
            <Head>
                <title>{title}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="container">
                <div className="title-cont">
                    <img src="/assests/logo.png" alt="heading"/>
                </div>
                {children}
            </main>
        </div>
    );
}
