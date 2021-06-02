import styles from '../styles/Pokemons.module.scss';
import { useQuery } from '@apollo/client';
import DetailCard from '../components/DetailCard';
import Card from '../components/Card';
import { useRouter } from 'next/router';
import { FETCH_POKEMON_DETAIL } from '../graphql';

export default function PokemonDetail() {
  const router = useRouter();
  const { loading, error, data, refetch } = useQuery(FETCH_POKEMON_DETAIL, {
    variables: { name: router.query.name },
    fetchPolicy: 'network-only',
  });

  const pokemon = data?.pokemonByName;

  if (pokemon) {
    return (
      <div>
        <DetailCard pokemon={pokemon} />
        <h4>Evolutions</h4>
        <div className={styles.evolutions}>
          {pokemon.evolutions.map(pokemon => (
            <Card key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      </div>
    );
  } else {
    return null;
  }
}
