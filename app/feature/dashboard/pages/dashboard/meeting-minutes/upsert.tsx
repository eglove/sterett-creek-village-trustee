import { useRouter } from 'blitz';
import { Suspense } from 'react';

import Layout from '../../../../layouts/components/layout';
import { UpsertMeetingMinuteForm } from '../../../components/meeting-minutes/upsert-meeting-minute-form';

const UpsertMeetingMinute = (): JSX.Element => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Suspense>
      <UpsertMeetingMinuteForm meetingMinuteId={id as string | undefined} />
    </Suspense>
  );
};

UpsertMeetingMinute.suppressFirstRenderFlicker = true;
UpsertMeetingMinute.authenticate = { redirectTo: '/sign-in' };
UpsertMeetingMinute.getLayout = (page: JSX.Element): JSX.Element => {
  return <Layout title="Manage Meeting Minutes">{page}</Layout>;
};

export default UpsertMeetingMinute;
