import { BlitzPage } from 'blitz';

import Layout from '../../layouts/components/layout';
import { CalendarLayout } from '../components/calendar-layout';

const Calendar: BlitzPage = () => {
  return <CalendarLayout />;
};

Calendar.suppressFirstRenderFlicker = true;
Calendar.getLayout = (page: JSX.Element): JSX.Element => {
  return <Layout title="Calendar">{page}</Layout>;
};

export default Calendar;
