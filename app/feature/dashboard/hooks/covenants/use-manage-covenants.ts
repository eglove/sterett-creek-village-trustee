import { File } from '@prisma/client';
import { useMutation, useQuery, useRouter } from 'blitz';
import { Dispatch, SetStateAction, useState } from 'react';

import deleteFile from '../../../../mutations/delete-file';
import { IdSchema } from '../../../../validations';
import getFiles from '../../queries/files/get-files';

type UseManageCovenantsReturn = {
  count: number;
  covenants: Array<Pick<File, 'id' | 'fileName' | 'url'>>;
  handleDeleteCovenant: (id: string) => Promise<void>;
  handleNavigateToUpsert: (id?: string) => Promise<void>;
  isLoading: boolean;
  setSkip: Dispatch<SetStateAction<number>>;
  skip: number;
};

export const COVENANTS_DASHBOARD_PAGE_SIZE = 5;

export const useManageCovenants = (): UseManageCovenantsReturn => {
  const router = useRouter();
  const [skip, setSkip] = useState(0);

  const [data, { refetch }] = useQuery(getFiles, {
    fileType: 'COVENANTS',
    skip,
    take: COVENANTS_DASHBOARD_PAGE_SIZE,
  });

  const [deleteCovenantMutation, { isLoading }] = useMutation(deleteFile);

  const handleNavigateToUpsert = async (id?: string): Promise<void> => {
    if (typeof id === 'undefined') {
      await router.push('/dashboard/covenants/upsert');
    } else {
      await router.push(`/dashboard/covenants/upsert?id=${id}`);
    }
  };

  const handleDeleteCovenant = async (id: string): Promise<void> => {
    const body = IdSchema.parse({ id });
    await deleteCovenantMutation(body);
    await refetch();
  };

  return {
    count: data.count,
    covenants: data.files,
    handleDeleteCovenant,
    handleNavigateToUpsert,
    isLoading,
    setSkip,
    skip,
  };
};
