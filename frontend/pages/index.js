import styles from '../styles/Pokemons.module.scss';
import { gql, useMutation, useQuery } from '@apollo/client';
import Card from '../components/Card';
import Filter from '../components/Filter';
import { useAppContext, VIEWS } from '../context/AppProvider';
import Line from '../components/Line';
import { FETCH_POKEMONS } from '../graphql';

export default function Pokemons() {
  const { hasFavoritesOnly, view, searchedValue, type } = useAppContext();
  const { loading, data } = useQuery(FETCH_POKEMONS, {
    variables: { searchedValue, type, hasFavoritesOnly },
    fetchPolicy: 'network-only',
  });

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
            const { id } = pokemon;
            if (view === VIEWS.GRID) {
              return <Card key={id} id={id} pokemon={pokemon} />;
            } else if (view === VIEWS.LIST) {
              return <Line key={id} id={id} pokemon={pokemon} />;
            }
          })}
      </div>
    </>
  );
}
