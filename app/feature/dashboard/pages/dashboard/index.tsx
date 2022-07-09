import { BlitzPage } from 'blitz';
import { Suspense } from 'react';

import Layout from '../../../layouts/components/layout';
import { DashboardLayout } from '../../components/dashboard-layout';

const Dashboard: BlitzPage = () => {
  return (
    <Suspense>
      <DashboardLayout />
    </Suspense>
  );
};

Dashboard.suppressFirstRenderFlicker = true;
Dashboard.authenticate = { redirectTo: '/sign-in' };
Dashboard.getLayout = (page: JSX.Element): JSX.Element => {
  return <Layout title="Dashboard">{page}</Layout>;
};

export default Dashboard;
