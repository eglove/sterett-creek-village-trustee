import { BlitzPage } from 'blitz';
import { Suspense } from 'react';

import Layout from '../../../../layouts/components/layout';
import { ManageEvents } from '../../../components/events/manage-events';

const Events: BlitzPage = () => {
  return (
    <Suspense>
      <ManageEvents />
    </Suspense>
  );
};

Events.suppressFirstRenderFlicker = true;
Events.authenticate = { redirectTo: '/sign-in' };
Events.getLayout = (page: JSX.Element): JSX.Element => {
  return <Layout title="Events">{page}</Layout>;
};

export default Events;
