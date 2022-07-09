import { Covenant } from '@prisma/client';
import { useMutation, useQuery, useRouter } from 'blitz';
import { Dispatch, SetStateAction, useState } from 'react';

import getCovenants from '../../../queries/get-covenants';
import deleteCovenant from '../mutations/delete-covenant';
import { IdSchema } from '../validations';

type UseManageCovenantsReturn = {
  count: number;
  covenants: Array<Pick<Covenant, 'id' | 'title' | 'url'>>;
  handleDeleteCovenant: (id: string) => Promise<void>;
  handleNavigateToUpsert: (id?: string) => Promise<void>;
  setSkip: Dispatch<SetStateAction<number>>;
  skip: number;
};

export const COVENANTS_DASHBOARD_PAGE_SIZE = 5;

export const useManageCovenants = (): UseManageCovenantsReturn => {
  const router = useRouter();
  const [skip, setSkip] = useState(0);

  const [data, { refetch }] = useQuery(getCovenants, {
    skip,
    take: COVENANTS_DASHBOARD_PAGE_SIZE,
  });

  const [deleteCovenantMutation] = useMutation(deleteCovenant);

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
    covenants: data.covenants,
    handleDeleteCovenant,
    handleNavigateToUpsert,
    setSkip,
    skip,
  };
};
