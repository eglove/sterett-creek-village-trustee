import { Image, useQuery } from 'blitz';
import Masonry from 'react-masonry-css';

import getHomeImagesAll from '../queries/get-home-images-all';
import styles from '../styles/home.module.css';

export const HomeLayout = (): JSX.Element => {
  const [images] = useQuery(getHomeImagesAll, undefined, {
    refetchInterval: false,
    refetchIntervalInBackground: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  return (
    <div className={styles.HomeLayout}>
      <Masonry
        className={styles.Masonry}
        breakpointCols={{
          1024: 3,
          1440: 4,
          425: 1,
          768: 2,
          default: 5,
        }}
      >
        {images.map(image => {
          return (
            <div className={styles.MasonryColumn} key={image.id}>
              <Image
                alt={image.description}
                height={image.height}
                src={image.url}
                width={image.width}
              />
            </div>
          );
        })}
      </Masonry>
    </div>
  );
};
