import Link from 'next/link';
import Layout from '../components/Layout';
import loader from '../components/loader';
import '../styles/Home.module.scss';

export default function Home({ pokemon, userName }) {
    if (!pokemon) {
        return <loader />
    }
    else
        return (
            <Layout title="NextJS Pokedex">
                <h3 className="main-heading">Welcome {userName}</h3>
                <ul className="listing">
                    {pokemon.map((pokeman, index) => (
                        <li key={index} className="card-cont" >
                            <Link href={`/pokemon?id=${index + 1}`}>
                                <div className="card">
                                    <img
                                        src={pokeman.image}
                                        alt={pokeman.name}
                                        className="w-20 h-20 mr-3"
                                    />
                                    <span className="pokemon-title">
                                        {pokeman.name}
                                    </span>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </Layout>
        );
}

// export async function getStaticProps(context) {
//     console.log(context)

// }
export async function getServerSideProps({ query }) {
    const userName = query.userName;
    try {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
        const { results } = await res.json();
        const pokemon = results.map((pokeman, index) => {
            const paddedId = ('00' + (index + 1)).slice(-3);

            const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`;
            return { ...pokeman, image };
        });
        return {
            props: { pokemon, userName },
        };
    } catch (err) {
        console.error(err);
    }
    // return {
    //     props: { userName },
    // };
}
