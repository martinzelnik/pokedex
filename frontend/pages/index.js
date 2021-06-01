import styles from '../styles/Home.module.scss';
import { gql } from '@apollo/client';
import client from '../apollo-client';
import PokemonTile from '../components/PokemonTile';
import Filter from '../components/Filter';

export default function Home({ pokemons, pokemonTypes }) {
  return (
    <>
      <Filter pokemonTypes={pokemonTypes} />
      <div className={styles.content}>
        {pokemons.map(pokemon => (
          <PokemonTile key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const { data } = await client.query({
    query: gql`
      query {
        pokemons(query: { limit: -1, offset: 0 }) {
          edges {
            id
            name
            image
            types
            isFavorite
          }
        }
        pokemonTypes
      }
    `,
  });
  return {
    props: { pokemons: data.pokemons.edges, pokemonTypes: data.pokemonTypes },
  };
}