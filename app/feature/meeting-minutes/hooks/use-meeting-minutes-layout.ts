import { MeetingMinute } from '@prisma/client';
import { useQuery } from 'blitz';
import { Dispatch, SetStateAction, useState } from 'react';

import getMeetingMinutes from '../../../queries/get-meeting-minutes';

export const MEETING_MINUTES_LAYOUT_SIZE = 5;

type UseMeetingMinutesLayoutReturn = {
  count: number;
  meetingMinutes: Array<Pick<MeetingMinute, 'id' | 'title' | 'url'>>;
  setSkip: Dispatch<SetStateAction<number>>;
  skip: number;
};

export const useMeetingMinutesLayout = (): UseMeetingMinutesLayoutReturn => {
  const [skip, setSkip] = useState(0);

  const [{ meetingMinutes, count }] = useQuery(getMeetingMinutes, {
    skip,
    take: MEETING_MINUTES_LAYOUT_SIZE,
  });

  return {
    count,
    meetingMinutes,
    setSkip,
    skip,
  };
};
