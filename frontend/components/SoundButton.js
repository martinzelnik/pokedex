import styles from '../styles/TransparentButton.module.scss';
import { VolumeUp32, VolumeUpFilled32 } from '@carbon/icons-react';
import { useEffect, useState } from 'react';

const useAudio = sound => {
  const [audio] = useState(new Audio(sound));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
      playing ? audio.play() : audio.pause();
    },
    [playing]
  );

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);

  return [playing, toggle];
};

export default function SoundButton({ sound }) {
  const [playing, toggle] = useAudio(sound);

  return (
    <button onClick={toggle} className={styles['transparent-button']}>
      {playing ? <VolumeUpFilled32 /> : <VolumeUp32 />}
    </button>
  );
}
