import { File } from '@prisma/client';
import { useQuery } from 'blitz';
import { Dispatch, SetStateAction, useState } from 'react';

import getMeetingMinutes from '../../../queries/get-meeting-minutes';

export const MEETING_MINUTES_LAYOUT_SIZE = 5;

type UseMeetingMinutesLayoutReturn = {
  count: number;
  files: Array<Pick<File, 'id' | 'fileName' | 'url'>>;
  setSkip: Dispatch<SetStateAction<number>>;
  skip: number;
};

export const useMeetingMinutesLayout = (): UseMeetingMinutesLayoutReturn => {
  const [skip, setSkip] = useState(0);

  const [{ files, count }] = useQuery(getMeetingMinutes, {
    skip,
    take: MEETING_MINUTES_LAYOUT_SIZE,
  });

  return {
    count,
    files,
    setSkip,
    skip,
  };
};
