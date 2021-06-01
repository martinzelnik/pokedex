import styles from '../styles/PokemonTile.module.scss';
import { ClickableTile } from 'carbon-components-react';
import Link from 'next/link';
import FavoriteButton from './FavoriteButton';

const PokemonTile = ({ pokemon: { name, types, image, isFavorite }, toggleFavorite }) => {
  return (
    <ClickableTile className={styles.tile}>
      <Link href={name}>
        <div className={styles['image-container']}>
          <img src={image} />
        </div>
      </Link>
      <div className={styles.info}>
        <Link href={name}>
          <div>
            <h5>{name}</h5>

            <p>{types.join(', ')}</p>
          </div>
        </Link>
        <div className={styles.info}>
          <FavoriteButton isFavorite={isFavorite} onClick={toggleFavorite} />
        </div>
      </div>
    </ClickableTile>
  );
};

export default PokemonTile;
