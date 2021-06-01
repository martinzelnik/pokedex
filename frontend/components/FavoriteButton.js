import styles from '../styles/FavoriteButton.module.scss';
import { Star32, StarFilled32 } from '@carbon/icons-react';

export default function FavoriteButton({ isFavorite, ...props }) {
  return (
    <button className={styles['favorite-button']} {...props}>
      {isFavorite ? <StarFilled32 /> : <Star32 />}
    </button>
  );
}
