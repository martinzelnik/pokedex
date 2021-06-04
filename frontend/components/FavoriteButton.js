import styles from '../styles/TransparentButton.module.scss';
import { Star32, StarFilled32 } from '@carbon/icons-react';
import { useMutation } from '@apollo/client';
import { ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES } from '../graphql';

export default function FavoriteButton({ id, isFavorite }) {
  const [addToFavs] = useMutation(ADD_TO_FAVORITES);
  const [removeFromFavs] = useMutation(REMOVE_FROM_FAVORITES);

  const toggleFavorite = (id, isFavorite) => {
    if (isFavorite) {
      removeFromFavs({
        variables: { id },
      });
    } else {
      addToFavs({
        variables: { id },
      });
    }
  };

  return (
    <button onClick={() => toggleFavorite(id, isFavorite)} className={styles['transparent-button']}>
      {isFavorite ? <StarFilled32 /> : <Star32 />}
    </button>
  );
}
