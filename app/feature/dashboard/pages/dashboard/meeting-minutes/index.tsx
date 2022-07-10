import { BlitzPage } from 'blitz';
import { Suspense } from 'react';

import Layout from '../../../../layouts/components/layout';
import { ManageMeetingMinutes } from '../../../components/meeting-minutes/manage-meeting-minutes';

const MeetingMinutesDashboard: BlitzPage = () => {
  return (
    <Suspense>
      <ManageMeetingMinutes />
    </Suspense>
  );
};

MeetingMinutesDashboard.suppressFirstRenderFlicker = true;
MeetingMinutesDashboard.authenticate = { redirectTo: '/sign-in' };
MeetingMinutesDashboard.getLayout = (page: JSX.Element): JSX.Element => {
  return <Layout title="Meeting Minutes">{page}</Layout>;
};

export default MeetingMinutesDashboard;
