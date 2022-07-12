import { BlitzPage } from 'blitz';
import { Suspense } from 'react';

import Layout from '../../../../layouts/components/layout';
import { ManageTrustees } from '../../../components/trustees/manage-trustees';

const TrusteesDashboard: BlitzPage = () => {
  return (
    <Suspense>
      <ManageTrustees />
    </Suspense>
  );
};

TrusteesDashboard.suppressFirstRenderFlicker = true;
TrusteesDashboard.authenticate = { redirectTo: '/sign-in' };
TrusteesDashboard.getLayout = (page: JSX.Element): JSX.Element => {
  return <Layout title="Trustees">{page}</Layout>;
};

export default TrusteesDashboard;
