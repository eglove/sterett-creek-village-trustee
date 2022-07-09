import { BlitzPage } from 'blitz';
import { Suspense } from 'react';

import Layout from '../../layouts/components/layout';
import { CovenantsLayout } from '../components/covenants-layout';

const Covenants: BlitzPage = () => {
  return (
    <Suspense>
      <CovenantsLayout />
    </Suspense>
  );
};

Covenants.suppressFirstRenderFlicker = true;
Covenants.getLayout = (page: JSX.Element): JSX.Element => {
  return <Layout title="Covenants">{page}</Layout>;
};

export default Covenants;
