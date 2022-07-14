import { BlitzPage } from 'blitz';
import { Suspense } from 'react';

import Layout from '../../../../layouts/components/layout';
import { ManageHome } from '../../../components/home/manage-home';

const DashboardHome: BlitzPage = () => {
  return (
    <Suspense>
      <ManageHome />
    </Suspense>
  );
};

DashboardHome.suppressFirstRenderFlicker = true;
DashboardHome.authenticate = { redirectTo: '/sign-in' };
DashboardHome.getLayout = (page: JSX.Element): JSX.Element => {
  return <Layout title="Manage Home">{page}</Layout>;
};

export default DashboardHome;
