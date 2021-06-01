import { useRouter } from 'next/router';
import { gql } from '@apollo/client';
import client from '../apollo-client';

export default function PokemonDetail({ pokemon }) {
  const router = useRouter();
  const { name } = router.query;

  return (
    <>
      <h1>{name}</h1>
      <h3>{pokemon.id}</h3>
    </>
  );
}

export async function getStaticProps({ params: { name } }) {
  const { data } = await client.query({
    query: gql`
      query Pokemon($name: String!) {
        pokemonByName(name: $name) {
          id
          name
          image
          isFavorite
        }
      }
    `,
    variables: { name },
  });

  return {
    props: { pokemon: data.pokemonByName },
  };
}

export async function getStaticPaths() {
  const { data } = await client.query({
    query: gql`
      query {
        pokemons(query: { limit: -1, offset: 0 }) {
          edges {
            name
          }
        }
      }
    `,
  });

  console.log(data);
  const paths = data.pokemons.edges.map(pokemon => ({ params: { name: pokemon.name } }));
  return {
    paths,
    fallback: false,
  };
}
