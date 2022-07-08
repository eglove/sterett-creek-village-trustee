import { BlitzPage } from 'blitz';

import Layout from '../../../../layouts/components/layout';
import { ManageEvents } from '../../../components/manage-events';

const Events: BlitzPage = () => {
  return <ManageEvents />;
};

Events.suppressFirstRenderFlicker = true;
Events.authenticate = { redirectTo: '/sign-in' };
Events.getLayout = (page: JSX.Element): JSX.Element => {
  return <Layout title="Events">{page}</Layout>;
};

export default Events;