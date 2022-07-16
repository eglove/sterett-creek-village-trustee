import { Image } from 'next/image';

import loadingImage from '../../../../public/loading.svg';
import { Container } from './container';

export const Loading = (): JSX.Element => {
  return (
    <Container
      containerProperties={{ style: { height: '300px', position: 'relative' } }}
    >
      <Image
        alt="Loading"
        layout="fill"
        objectFit="contain"
        src={loadingImage as string}
      />
    </Container>
  );
};
