import { useRouter } from 'blitz';
import { Suspense } from 'react';

import Layout from '../../../../layouts/components/layout';
import { UpsertHomeImagesForm } from '../../../components/home-images/upsert-home-images-form';

const UpsertHomeImage = (): JSX.Element => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Suspense>
      <UpsertHomeImagesForm homeImageId={id as string | undefined} />
    </Suspense>
  );
};

UpsertHomeImage.suppressFirstRenderFlicker = true;
UpsertHomeImage.authenticate = { redirectTo: '/sign-in' };
UpsertHomeImage.getLayout = (page: JSX.Element): JSX.Element => {
  return <Layout title="Manage Covenant">{page}</Layout>;
};

export default UpsertHomeImage;
