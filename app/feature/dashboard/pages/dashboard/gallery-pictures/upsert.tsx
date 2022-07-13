import { useRouter } from 'blitz';
import { Suspense } from 'react';

import Layout from '../../../../layouts/components/layout';
import { UpsertGalleryPicturesForm } from '../../../components/gallery-pictures/upsert-gallery-pictures-form';

const UpsertGalleryPicture = (): JSX.Element => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Suspense>
      <UpsertGalleryPicturesForm galleryPictureId={id as string | undefined} />
    </Suspense>
  );
};

UpsertGalleryPicture.suppressFirstRenderFlicker = true;
UpsertGalleryPicture.authenticate = { redirectTo: '/sign-in' };
UpsertGalleryPicture.getLayout = (page: JSX.Element): JSX.Element => {
  return <Layout title="Manage Gallery Pictures">{page}</Layout>;
};

export default UpsertGalleryPicture;
