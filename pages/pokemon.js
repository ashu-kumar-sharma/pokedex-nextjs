import React from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import '../styles/pokemon.scss';

export default function pokemon({ pokeman }) {
    const colors = {
        grass: "#d2f2c2",
        poison: "#f7cdf7",
        fire: "#ffd1b5",
        flying: "#eae3ff",
        water: "#c2f3ff",
        bug: "#e0e8a2",
        normal: "#e6e6c3",
        electric: "#fff1ba",
        ground: "#e0ccb1",
        fighting: "#fcada9",
        psychic: "#ffc9da",
        rock: "#f0e09c",
        fairy: "#ffdee5",
        steel: "#e6eaf0",
        ice: "#e8feff",
        ghost: "#dbbaff",
        dragon: "#c4bdff",
        dark: "#a9abb0"
    };
    console.log(pokeman)
    const background_color = (type) => {
        let background;
        if (type[1]) {
            background =
                "linear-gradient(150deg," +
                colors[type[0].type.name] +
                " 50%," +
                colors[type[1].type.name] +
                " 50%)";
        } else {
            background = colors[type[0]];
        }

        return background;
    }
    return (
        <div className="pokemon-details">
            <div className="pokemon-card-cont">
                <div className="pokemon-card" style={{ 'background': `${background_color(pokeman.types)}` }}>
                    <div className="poke-img-cont">
                        <img className="poke-img" src={pokeman.image} alt={pokeman.name} />
                    </div>
                    <h1 className="pokemon-title">
                        {pokeman.name}
                    </h1>
                    <span className="pokemon-type">
                        {
                            pokeman.types.map(i => i.type.name).join(' / ')
                        }
                    </span>

                </div>
            </div>
            <div className="pokemon-card-cont">
                <div className="pokemon-card poke-details" style={{ 'background': `${background_color(pokeman.types)}` }}>
                    {
                        pokeman.stats.map(item => {
                            if (item.stat.name) {
                                return <div className="stats-cont">
                                    <span className="stats-title">
                                        {item.stat.name} : <b>{item.base_stat}</b>
                                    </span>
                                    <div className="stats-bar">
                                        <span className="stats-bar-inner" style={{ "width": `${item.base_stat}%` }}></span>
                                    </div>
                                </div>
                            }

                        })
                    }
                </div>
            </div>
        </div>
    );
}

export async function getServerSideProps({ query }) {
    const id = query.id;
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const pokeman = await res.json();
        const paddedId = ('00' + id).slice(-3);
        pokeman.image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`;
        return {
            props: { pokeman },
        };
    } catch (err) {
        console.error(err);
    }
}
