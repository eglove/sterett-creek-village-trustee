import { BlitzPage } from 'blitz';
import { Suspense } from 'react';

import Layout from '../../layouts/components/layout';
import { MeetingMinutesLayout } from '../components/meeting-minutes-layout';

const MeetingMinutes: BlitzPage = () => {
  return (
    <Suspense>
      <MeetingMinutesLayout />
    </Suspense>
  );
};

MeetingMinutes.suppressFirstRenderFlicker = true;
MeetingMinutes.getLayout = (page: JSX.Element): JSX.Element => {
  return <Layout title="Meeting Minutes">{page}</Layout>;
};

export default MeetingMinutes;
