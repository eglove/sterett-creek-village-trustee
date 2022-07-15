import { File } from '@prisma/client';
import { useQuery } from 'blitz';
import { Dispatch, SetStateAction, useState } from 'react';

import getFiles from '../../dashboard/queries/files/get-files';

export const COVENANTS_PAGE_SIZE = 5;

type UseCovenantsLayoutReturn = {
  count: number;
  covenants: Array<Pick<File, 'id' | 'fileName' | 'url'>>;
  setSkip: Dispatch<SetStateAction<number>>;
  skip: number;
};

export const useCovenantsLayout = (): UseCovenantsLayoutReturn => {
  const [skip, setSkip] = useState(0);

  const [{ files, count }] = useQuery(getFiles, {
    fileType: 'COVENANTS',
    skip,
    take: COVENANTS_PAGE_SIZE,
  });

  return {
    count,
    covenants: files,
    setSkip,
    skip,
  };
};
