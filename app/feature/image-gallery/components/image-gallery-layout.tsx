import { Image, useQuery } from 'blitz';
import Masonry from 'react-masonry-css';

import getGalleryPictures from '../queries/get-gallery-pictures';
import styles from '../styles/image-gallery.module.css';

export const ImageGalleryLayout = (): JSX.Element => {
  const [images] = useQuery(getGalleryPictures, undefined, {
    refetchInterval: false,
    refetchIntervalInBackground: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  return (
    <div className={styles.HomeLayout}>
      <Masonry
        className={styles.Masonry ?? ''}
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
            <div
              className={styles.MasonryColumn}
              key={image.id}
              style={{
                contentVisibility: 'auto',
              }}
            >
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
