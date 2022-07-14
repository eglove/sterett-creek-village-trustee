import { useQuery } from 'blitz';

import getHomeContent from '../../../queries/get-home-content';
import utilityStyles from '../../../styles/util.module.css';

export const HomeLayout = (): JSX.Element | null => {
  const [homeContent] = useQuery(getHomeContent, undefined);

  if (homeContent === null) {
    return <p>There&apos;s nothing here yet. Check back later.</p>;
  }

  return (
    <div className={utilityStyles.CenterOnPage}>
      <div style={{ width: '50%' }}>
        <img alt={homeContent.image.description} src={homeContent.image.url} />
      </div>
      <p>{homeContent.content}</p>
    </div>
  );
};
