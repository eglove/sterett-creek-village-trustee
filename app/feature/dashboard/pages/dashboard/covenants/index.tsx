import { BlitzPage } from 'blitz';
import { Suspense } from 'react';

import Layout from '../../../../layouts/components/layout';
import { ManageCovenants } from '../../../components/manage-covenants';

const CovenantsDashboard: BlitzPage = () => {
  return (
    <Suspense>
      <ManageCovenants />
    </Suspense>
  );
};

CovenantsDashboard.suppressFirstRenderFlicker = true;
CovenantsDashboard.authenticate = { redirectTo: '/sign-in' };
CovenantsDashboard.getLayout = (page: JSX.Element): JSX.Element => {
  return <Layout title="Covenants">{page}</Layout>;
};

export default CovenantsDashboard;
