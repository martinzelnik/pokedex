import styles from '../styles/PokemonLine.module.scss';
import { ClickableTile } from 'carbon-components-react';
import Link from 'next/link';
import FavoriteButton from './FavoriteButton';

const PokemonLine = ({ pokemon: { name, types, image, isFavorite }, toggleFavorite }) => {
  return (
    <ClickableTile className={styles.line}>
      <Link href={name}>
        <div className={styles.info}>
          <div className={styles['img-container']}>
            <img src={image} />
          </div>
          <div>
            <h5>{name}</h5>
            <p>{types.join(', ')}</p>
          </div>
        </div>
      </Link>
      <div>
        <FavoriteButton isFavorite={isFavorite} onClick={toggleFavorite} />
      </div>
    </ClickableTile>
  );
};

export default PokemonLine;
