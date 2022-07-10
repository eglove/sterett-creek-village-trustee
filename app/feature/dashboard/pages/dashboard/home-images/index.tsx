import { BlitzPage } from 'blitz';
import { Suspense } from 'react';

import Layout from '../../../../layouts/components/layout';
import { ManageHomeImages } from '../../../components/home-images/manage-home-images';

const HomeImagesDashboard: BlitzPage = () => {
  return (
    <Suspense>
      <ManageHomeImages />
    </Suspense>
  );
};

HomeImagesDashboard.suppressFirstRenderFlicker = true;
HomeImagesDashboard.authenticate = { redirectTo: '/sign-in' };
HomeImagesDashboard.getLayout = (page: JSX.Element): JSX.Element => {
  return <Layout title="Home Images">{page}</Layout>;
};

export default HomeImagesDashboard;
