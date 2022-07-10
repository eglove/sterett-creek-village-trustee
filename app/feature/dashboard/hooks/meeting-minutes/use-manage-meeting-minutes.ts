import { Covenant } from '@prisma/client';
import { useMutation, useQuery, useRouter } from 'blitz';
import { Dispatch, SetStateAction, useState } from 'react';

import getMeetingMinutes from '../../../../queries/get-meeting-minutes';
import { IdSchema } from '../../../../validations';
import deleteMeetingMinute from '../../mutations/meeting-minutes/delete-meeting-minute';

type UseManageCovenantsReturn = {
  count: number;
  handleDeleteMeetingMinute: (id: string) => Promise<void>;
  handleNavigateToUpsert: (id?: string) => Promise<void>;
  isLoading: boolean;
  meetingMinutes: Array<Pick<Covenant, 'id' | 'title' | 'url'>>;
  setSkip: Dispatch<SetStateAction<number>>;
  skip: number;
};

export const MEETING_MINUTES_DASHBOARD_PAGE_SIZE = 5;

export const useManageMeetingMinutes = (): UseManageCovenantsReturn => {
  const router = useRouter();
  const [skip, setSkip] = useState(0);

  const [data, { refetch }] = useQuery(getMeetingMinutes, {
    skip,
    take: MEETING_MINUTES_DASHBOARD_PAGE_SIZE,
  });

  const [deleteMeetingMinuteMutation, { isLoading }] =
    useMutation(deleteMeetingMinute);

  const handleNavigateToUpsert = async (id?: string): Promise<void> => {
    if (typeof id === 'undefined') {
      await router.push('/dashboard/meeting-minutes/upsert');
    } else {
      await router.push(`/dashboard/meeting-minutes/upsert?id=${id}`);
    }
  };

  const handleDeleteMeetingMinute = async (id: string): Promise<void> => {
    const body = IdSchema.parse({ id });
    await deleteMeetingMinuteMutation(body);
    await refetch();
  };

  return {
    count: data.count,
    handleDeleteMeetingMinute,
    handleNavigateToUpsert,
    isLoading,
    meetingMinutes: data.meetingMinutes,
    setSkip,
    skip,
  };
};
