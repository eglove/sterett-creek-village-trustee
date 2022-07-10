import { useRouter } from 'blitz';
import { Suspense } from 'react';

import Layout from '../../../../layouts/components/layout';
import { UpsertEventForm } from '../../../components/events/upsert-event-form';

const CreateEvent = (): JSX.Element => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Suspense>
      <UpsertEventForm eventId={id as string | undefined} />
    </Suspense>
  );
};

CreateEvent.suppressFirstRenderFlicker = true;
CreateEvent.authenticate = { redirectTo: '/sign-in' };
CreateEvent.getLayout = (page: JSX.Element): JSX.Element => {
  return <Layout title="Create Event">{page}</Layout>;
};

export default CreateEvent;
