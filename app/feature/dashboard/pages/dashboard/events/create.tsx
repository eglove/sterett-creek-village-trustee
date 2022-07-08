import { BlitzPage } from 'blitz';

import Layout from '../../../../layouts/components/layout';
import { CreateEventForm } from '../../../components/create-event-form';

const CreateEvent: BlitzPage = () => {
  return <CreateEventForm />;
};

CreateEvent.suppressFirstRenderFlicker = true;
CreateEvent.authenticate = { redirectTo: '/sign-in' };
CreateEvent.getLayout = (page: JSX.Element): JSX.Element => {
  return <Layout title="CreateEvent">{page}</Layout>;
};

export default CreateEvent;
