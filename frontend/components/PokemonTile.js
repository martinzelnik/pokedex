import styles from '../styles/PokemonTile.module.scss';
import { ClickableTile } from 'carbon-components-react';
import { useRouter } from 'next/router';

const PokemonTile = ({ pokemon: { name, types, image } }) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(name);
  };

  return (
    <ClickableTile handleClick={handleClick} className={styles.tile}>
      <div className={styles['image-container']}>
        <img src={image} />
      </div>
      <h5>{name}</h5>
      <p>{types.join(', ')}</p>
    </ClickableTile>
  );
};

export default PokemonTile;
