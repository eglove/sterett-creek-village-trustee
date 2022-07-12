import { BlitzPage } from 'blitz';
import { Suspense } from 'react';

import Layout from '../../../../layouts/components/layout';
import { ManageGalleryPictures } from '../../../components/gallery-pictures/manage-gallery-pictures';

const GalleryPicturesDashboard: BlitzPage = () => {
  return (
    <Suspense>
      <ManageGalleryPictures />
    </Suspense>
  );
};

GalleryPicturesDashboard.suppressFirstRenderFlicker = true;
GalleryPicturesDashboard.authenticate = { redirectTo: '/sign-in' };
GalleryPicturesDashboard.getLayout = (page: JSX.Element): JSX.Element => {
  return <Layout title="Gallery Pictures">{page}</Layout>;
};

export default GalleryPicturesDashboard;
