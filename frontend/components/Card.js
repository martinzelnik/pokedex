import styles from '../styles/Card.module.scss';
import { ClickableTile } from 'carbon-components-react';
import Link from 'next/link';
import FavoriteButton from './FavoriteButton';

export default function Card({ pokemon: { name, types, image, isFavorite }, toggleFavorite }) {
  return (
    <ClickableTile className={styles.card}>
      <Link href={name}>
        <div className={styles['img-container']}>
          <img src={image} />
        </div>
      </Link>
      <div className={styles.info}>
        <Link href={name}>
          <div>
            <h5>{name}</h5>
            {types && <p>{types.join(', ')}</p>}
          </div>
        </Link>
        <FavoriteButton isFavorite={isFavorite} onClick={toggleFavorite} />
      </div>
    </ClickableTile>
  );
}
