import { File } from '@prisma/client';
import { useMutation, useQuery, useRouter } from 'blitz';
import { Dispatch, SetStateAction, useState } from 'react';

import deleteFile from '../../../../mutations/delete-file';
import getMeetingMinutes from '../../../../queries/get-meeting-minutes';
import { IdSchema } from '../../../../validations';

type UseManageMeetingMinutesReturn = {
  count: number;
  files: Array<Pick<File, 'id' | 'fileName' | 'url'>>;
  handleDeleteMeetingMinute: (id: string) => Promise<void>;
  handleNavigateToUpsert: (id?: string) => Promise<void>;
  isLoading: boolean;
  setSkip: Dispatch<SetStateAction<number>>;
  skip: number;
};

export const MEETING_MINUTES_DASHBOARD_PAGE_SIZE = 5;

export const useManageMeetingMinutes = (): UseManageMeetingMinutesReturn => {
  const router = useRouter();
  const [skip, setSkip] = useState(0);

  const [data, { refetch }] = useQuery(getMeetingMinutes, {
    skip,
    take: MEETING_MINUTES_DASHBOARD_PAGE_SIZE,
  });

  const [deleteMeetingMinuteMutation, { isLoading }] = useMutation(deleteFile);

  const handleNavigateToUpsert = async (id?: string): Promise<void> => {
    if (typeof id === 'undefined') {
      await router.push('/dashboard/meeting-minutes/upsert');
    } else {
      await router.push(`/dashboard/meeting-minutes/upsert?id=${id}`);
    }
  };

  const handleDeleteMeetingMinute = async (id: string): Promise<void> => {
    await deleteMeetingMinuteMutation(
      IdSchema.parse({
        id,
      })
    );
    await refetch();
  };

  return {
    count: data.count,
    files: data.files,
    handleDeleteMeetingMinute,
    handleNavigateToUpsert,
    isLoading,
    setSkip,
    skip,
  };
};
