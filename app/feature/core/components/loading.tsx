import { Image } from 'next/image';

import loadingImage from '../../../../public/loading.svg';
import utilityStyles from '../../../styles/util.module.css';

export const Loading = (): JSX.Element => {
  return (
    <div
      className={utilityStyles.CenterOnPage}
      style={{ height: '300px', position: 'relative' }}
    >
      <Image
        alt="Loading"
        layout="fill"
        objectFit="contain"
        src={loadingImage as string}
      />
    </div>
  );
};
