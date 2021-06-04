import styles from '../styles/TransparentButton.module.scss';
import { VolumeUp32 } from '@carbon/icons-react';

export default function SoundButton({ sound }) {
  const audio = new Audio(sound)

  return (
    <button onClick={() => audio.play()} className={styles['transparent-button']}>
      <VolumeUp32 />
    </button>
  );
}
