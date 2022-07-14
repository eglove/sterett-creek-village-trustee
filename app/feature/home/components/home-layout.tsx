import { useQuery } from 'blitz';
import { Image } from 'next/image';

import getHomeContent from '../../../queries/get-home-content';
import utilityStyles from '../../../styles/util.module.css';

export const HomeLayout = (): JSX.Element | null => {
  const [homeContent] = useQuery(getHomeContent, undefined);

  if (homeContent === null) {
    return <p>There&apos;s nothing here yet. Check back later.</p>;
  }

  return (
    <div className={utilityStyles.CenterOnPage}>
      <div style={{ height: '300px', position: 'relative', width: '50%' }}>
        <Image
          alt={homeContent.image.description}
          layout="fill"
          objectFit="contain"
          src={homeContent.image.url}
        />
      </div>
      <p>{homeContent.content}</p>
    </div>
  );
};
