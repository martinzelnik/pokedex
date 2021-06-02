import styles from '../styles/Home.module.scss';
import { gql, useMutation } from '@apollo/client';
import client from '../apollo-client';
import PokemonCard from '../components/PokemonCard';
import Filter from '../components/Filter';
import { TABS, useAppContext, VIEWS } from '../context/AppProvider';
import PokemonLine from '../components/PokemonLine';

const ADD_TO_FAVORITES = gql`
  mutation AddToFavorites($id: ID!) {
    favoritePokemon(id: $id) {
      id
    }
  }
`;

const REMOVE_FROM_FAVORITES = gql`
  mutation RemoveFromFavorites($id: ID!) {
    unFavoritePokemon(id: $id) {
      id
    }
  }
`;

export default function Home({ pokemons, pokemonTypes }) {
  // const router = useRouter();

  const { activeTab, view } = useAppContext();

  const [addToFavs] = useMutation(ADD_TO_FAVORITES);
  const [removeFromFavs] = useMutation(REMOVE_FROM_FAVORITES);

  const toggleFavorite = (id, isFavorite) => {
    if (isFavorite) {
      removeFromFavs({ variables: { id } });
    } else {
      addToFavs({ variables: { id } });
    }
  };

  
  if (activeTab === TABS.FAVORITES) {
    pokemons = pokemons.filter(pokemon => pokemon.isFavorite);
  }

  let style
  if (view === VIEWS.GRID) {
    style = styles.grid;
  } else if (view === VIEWS.LIST) {
    style = styles.list
  }
 
  return (
    <>
      <Filter pokemonTypes={pokemonTypes} />
      <div className={style}>
        {pokemons.map(pokemon => {
          const { id, isFavorite } = pokemon;
          if (view === VIEWS.GRID) {
            return <PokemonCard toggleFavorite={() => toggleFavorite(id, isFavorite)} key={id} pokemon={pokemon} />;
          } else if (view === VIEWS.LIST) {
            return <PokemonLine toggleFavorite={() => toggleFavorite(id, isFavorite)} key={id} pokemon={pokemon} />;
          }
        })}
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
