import Layout from 'app/feature/layouts/components/layout';
import { BlitzPage } from 'blitz';
import { Suspense } from 'react';

import { ImageGalleryLayout } from '../components/image-gallery-layout';

const Gallery: BlitzPage = () => {
  return (
    <Suspense>
      <ImageGalleryLayout />
    </Suspense>
  );
};

Gallery.suppressFirstRenderFlicker = true;
Gallery.getLayout = (page: JSX.Element): JSX.Element => {
  return (
    <Layout
      title="Gallery
  "
    >
      {page}
    </Layout>
  );
};

export default Gallery;
