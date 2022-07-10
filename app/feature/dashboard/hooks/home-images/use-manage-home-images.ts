import { HomeImage } from '@prisma/client';
import { useMutation, useQuery, useRouter } from 'blitz';
import { Dispatch, SetStateAction, useState } from 'react';

import getHomeImages from '../../../../queries/get-home-images';
import deleteHomeImage from '../../mutations/home-images/delete-home-image';
import { IdSchema } from '../../validations/validations';

type UseManageHomeImages = {
  count: number;
  handleDeleteHomeImage: (id: string) => Promise<void>;
  handleNavigateToUpsert: (id?: string) => Promise<void>;
  homeImages: Array<Pick<HomeImage, 'id' | 'description' | 'url'>>;
  setSkip: Dispatch<SetStateAction<number>>;
  skip: number;
};

export const HOME_IMAGE_DASHBOARD_PAGE_SIZE = 5;

export const useManageHomeImages = (): UseManageHomeImages => {
  const router = useRouter();
  const [skip, setSkip] = useState(0);

  const [data, { refetch }] = useQuery(getHomeImages, {
    skip,
    take: HOME_IMAGE_DASHBOARD_PAGE_SIZE,
  });

  const [deleteHomeImageMutation] = useMutation(deleteHomeImage);

  const handleNavigateToUpsert = async (id?: string): Promise<void> => {
    if (typeof id === 'undefined') {
      await router.push('/dashboard/styles-images/upsert');
    } else {
      await router.push(`/dashboard/home-images/upsert?id=${id}`);
    }
  };

  const handleDeleteHomeImage = async (id: string): Promise<void> => {
    await deleteHomeImageMutation(IdSchema.parse({ id }));
    await refetch();
  };

  return {
    count: data.count,
    handleDeleteHomeImage,
    handleNavigateToUpsert,
    homeImages: data.homeImages,
    setSkip,
    skip,
  };
};
