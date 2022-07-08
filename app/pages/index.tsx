import Layout from 'app/feature/layouts/components/layout';
import { BlitzPage, Image } from 'blitz';

import utilStyles from '../styles/util.module.css';

const Home: BlitzPage = () => {
  return (
    <div className={utilStyles.CenterOnPage}>
      <Image
        alt="Sterett Creek"
        height={218}
        src="/images/sterett-creek.webp"
        width={970}
      />
    </div>
  );
};

Home.suppressFirstRenderFlicker = true;
Home.getLayout = (page: JSX.Element): JSX.Element => {
  return <Layout title="Home">{page}</Layout>;
};

export default Home;
