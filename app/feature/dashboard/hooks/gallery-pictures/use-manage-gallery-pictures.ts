import { HomeImage } from '@prisma/client';
import { useMutation, useQuery, useRouter } from 'blitz';
import { Dispatch, SetStateAction, useState } from 'react';

import getGalleryPicturesPaginate from '../../../../queries/get-gallery-pictures-paginate';
import { IdSchema } from '../../../../validations';
import deleteGalleryPicture from '../../mutations/gallery-pictures/delete-gallery-picture';

type UseManageGalleryPictures = {
  count: number;
  galleryPictures: Array<Pick<HomeImage, 'id' | 'description' | 'url'>>;
  handleDeleteGalleryPicture: (id: string) => Promise<void>;
  handleNavigateToUpsert: (id?: string) => Promise<void>;
  setSkip: Dispatch<SetStateAction<number>>;
  skip: number;
};

export const GALLERY_PICTURE_DASHBOARD_PAGE_SIZE = 5;

export const useManageGalleryPictures = (): UseManageGalleryPictures => {
  const router = useRouter();
  const [skip, setSkip] = useState(0);

  const [data, { refetch }] = useQuery(getGalleryPicturesPaginate, {
    skip,
    take: GALLERY_PICTURE_DASHBOARD_PAGE_SIZE,
  });

  const [deleteGalleryPictureMutation] = useMutation(deleteGalleryPicture);

  const handleNavigateToUpsert = async (id?: string): Promise<void> => {
    if (typeof id === 'undefined') {
      await router.push('/dashboard/gallery-pictures/upsert');
    } else {
      await router.push(`/dashboard/gallery-pictures/upsert?id=${id}`);
    }
  };

  const handleDeleteGalleryPicture = async (id: string): Promise<void> => {
    await deleteGalleryPictureMutation(IdSchema.parse({ id }));
    await refetch();
  };

  return {
    count: data.count,
    galleryPictures: data.galleryPictures,
    handleDeleteGalleryPicture,
    handleNavigateToUpsert,
    setSkip,
    skip,
  };
};
