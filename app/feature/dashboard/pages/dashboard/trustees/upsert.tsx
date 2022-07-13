import { useRouter } from 'blitz';
import { Suspense } from 'react';

import Layout from '../../../../layouts/components/layout';
import { UpsertTrusteeForm } from '../../../components/trustees/upsert-trustee-form';

const UpsertTrustee = (): JSX.Element => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Suspense>
      <UpsertTrusteeForm trusteeId={id as string | undefined} />
    </Suspense>
  );
};

UpsertTrustee.suppressFirstRenderFlicker = true;
UpsertTrustee.authenticate = { redirectTo: '/sign-in' };
UpsertTrustee.getLayout = (page: JSX.Element): JSX.Element => {
  return <Layout title="Manage Trustee">{page}</Layout>;
};

export default UpsertTrustee;
