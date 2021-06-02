import styles from '../styles/Pokemons.module.scss';
import { gql, useMutation, useQuery } from '@apollo/client';
import Card from '../components/Card';
import Filter from '../components/Filter';
import { useAppContext, VIEWS } from '../context/AppProvider';
import Line from '../components/Line';

const FETCH_POKEMONS = gql`
  query FetchPokemons($searchedValue: String, $type: String, $hasFavoritesOnly: Boolean) {
    pokemons(query: { limit: 500, search: $searchedValue, filter: { type: $type, isFavorite: $hasFavoritesOnly } }) {
      edges {
        id
        name
        image
        types
        isFavorite
      }
    }
  }
`;

const ADD_TO_FAVORITES = gql`
  mutation AddToFavorites($id: ID!) {
    favoritePokemon(id: $id) {
      id
      isFavorite
    }
  }
`;

const REMOVE_FROM_FAVORITES = gql`
  mutation RemoveFromFavorites($id: ID!) {
    unFavoritePokemon(id: $id) {
      id
      isFavorite
    }
  }
`;

export default function Pokemons() {
  const { hasFavoritesOnly, view, searchedValue, type } = useAppContext();

  const [addToFavs] = useMutation(ADD_TO_FAVORITES);
  const [removeFromFavs] = useMutation(REMOVE_FROM_FAVORITES);
  console.log(hasFavoritesOnly)
  const { loading, error, data, refetch } = useQuery(FETCH_POKEMONS, {
    variables: { searchedValue, type, hasFavoritesOnly },
  });

  const toggleFavorite = (id, isFavorite) => {
    if (isFavorite) {
      removeFromFavs({
        variables: { id },
        refetchQueries: [{ query: FETCH_POKEMONS, variables: { searchedValue, type, hasFavoritesOnly } }],
        awaitRefetchQueries: true,
      });
    } else {
      addToFavs({
        variables: { id },
        refetchQueries: [{ query: FETCH_POKEMONS, variables: { searchedValue, type, hasFavoritesOnly } }],
        awaitRefetchQueries: true,
      });
    }
  };

  let style;
  if (view === VIEWS.GRID) {
    style = styles.grid;
  } else if (view === VIEWS.LIST) {
    style = styles.list;
  }

  let pokemons = data?.pokemons.edges;

  return (
    <>
      <Filter />
      <div className={style}>
        {!loading &&
          pokemons.map(pokemon => {
            const { id, isFavorite } = pokemon;
            if (view === VIEWS.GRID) {
              return <Card key={id} pokemon={pokemon} toggleFavorite={() => toggleFavorite(id, isFavorite)} />;
            } else if (view === VIEWS.LIST) {
              return <Line key={id} pokemon={pokemon} toggleFavorite={() => toggleFavorite(id, isFavorite)} />;
            }
          })}
      </div>
    </>
  );
}
