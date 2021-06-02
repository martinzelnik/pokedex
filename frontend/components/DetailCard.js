import styles from '../styles/DetailCard.module.scss';
import { Tile } from 'carbon-components-react';
import FavoriteButton from './FavoriteButton';
import Dimension from './Dimension';

export default function DetailCard({ pokemon: { id, name, types, image, isFavorite, maxCP, maxHP, weight, height } }) {
  return (
    <Tile className={styles['detail-card']}>
      <div className={styles['img-container']}>
        <img src={image} />
      </div>
      <div className={styles.info}>
        <div>
          <h3>{name}</h3>
          <p>{types.join(', ')}</p>
        </div>
        <FavoriteButton id={id} isFavorite={isFavorite} />
      </div>
      <div className={styles.chart}>
        <p><span>{`CP: ${maxCP}`}</span></p>
        <p><span>{`HP: ${maxHP}`}</span></p>
      </div>
      <div className={styles.dimensions}>
        <Dimension dimensionName="Weight" minimum={weight.minimum} maximum={weight.maximum} />
        <Dimension dimensionName="Height" minimum={height.minimum} maximum={height.maximum} />
      </div>
    </Tile>
  );
}
