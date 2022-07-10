import Layout from 'app/feature/layouts/components/layout';
import { BlitzPage } from 'blitz';
import { Suspense } from 'react';

import { HomeLayout } from '../feature/home/components/home-layout';

const Home: BlitzPage = () => {
  return (
    <Suspense>
      <HomeLayout />
    </Suspense>
  );
};

Home.suppressFirstRenderFlicker = true;
Home.getLayout = (page: JSX.Element): JSX.Element => {
  return <Layout title="Home">{page}</Layout>;
};

export default Home;
