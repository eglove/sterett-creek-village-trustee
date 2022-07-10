import { useRouter } from 'blitz';
import { Suspense } from 'react';

import Layout from '../../../../layouts/components/layout';
import { UpsertCovenantForm } from '../../../components/upsert-covenant-form';

const UpsertCovenant = (): JSX.Element => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Suspense>
      <UpsertCovenantForm covenantId={id as string | undefined} />
    </Suspense>
  );
};

UpsertCovenant.suppressFirstRenderFlicker = true;
UpsertCovenant.authenticate = { redirectTo: '/sign-in' };
UpsertCovenant.getLayout = (page: JSX.Element): JSX.Element => {
  return <Layout title="Create Covenant">{page}</Layout>;
};

export default UpsertCovenant;
