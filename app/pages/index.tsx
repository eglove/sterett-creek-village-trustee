import Layout from 'app/feature/layouts/components/layout';
import { BlitzPage } from 'blitz';

import { CalendarLayout } from '../feature/calendar/components/calendar-layout';

const Home: BlitzPage = () => {
  return <CalendarLayout />;
};

Home.suppressFirstRenderFlicker = true;
Home.getLayout = (page: JSX.Element): JSX.Element => {
  return <Layout title="Home">{page}</Layout>;
};

export default Home;
