import { BlitzPage } from 'blitz';
import { Suspense } from 'react';

import Layout from '../../layouts/components/layout';
import { TrusteesLayout } from '../components/trustees-layout';

const Trustees: BlitzPage = () => {
  return (
    <Suspense>
      <TrusteesLayout />
    </Suspense>
  );
};

Trustees.suppressFirstRenderFlicker = true;
Trustees.getLayout = (page: JSX.Element): JSX.Element => {
  return <Layout title="Trustees">{page}</Layout>;
};

export default Trustees;
