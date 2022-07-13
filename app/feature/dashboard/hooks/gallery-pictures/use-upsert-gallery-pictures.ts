import { useForm } from '@ethang/react';
import { useMutation, useQuery, useRouter } from 'blitz';
import { ChangeEvent, FormEvent, useEffect } from 'react';
import { ZodError } from 'zod';

import { getZodFieldErrors } from '../../../../util/zod';
import { cloudinaryUpload } from '../../../util/cloudinary-upload';
import createGalleryPicture from '../../mutations/gallery-pictures/create-gallery-picture';
import updateGalleryPictureDescription from '../../mutations/gallery-pictures/update-gallery-picture-description';
import getGalleryPicture from '../../queries/gallery-pictures/get-gallery-picture';
import {
  CreateGalleryPictureSchema,
  UpdateGalleryPictureDescriptionSchema,
} from '../../validations/gallery-picture/gallery-picture-validations';

export interface UpsertGalleryPicturesProperties {
  galleryPictureId?: string;
}

type InitialState = {
  description: string;
  file?: File;
};

const initialState: InitialState = {
  description: '',
  file: undefined,
};

export type UseUpsertGalleryPicturesReturn = {
  fieldErrors: Record<keyof InitialState, string[] | undefined> | undefined;
  formError: string | undefined;
  formState: InitialState;
  handleInputChange: (event: ChangeEvent) => void;
  handleSubmit: (event: FormEvent) => void;
  isLoading: boolean;
};

export const useUpsertGalleryPictures = ({
  galleryPictureId,
}: UpsertGalleryPicturesProperties): UseUpsertGalleryPicturesReturn => {
  const router = useRouter();

  const [imageToUpdate] = useQuery(getGalleryPicture, { id: galleryPictureId });
  const [createGalleryPictureMutation, { isLoading: isCreateLoading }] =
    useMutation(createGalleryPicture);
  const [
    updateGalleryPictureDescriptionMutation,
    { isLoading: isUpdateLoading },
  ] = useMutation(updateGalleryPictureDescription);

  const handleUpsertGalleryPicture = async (): Promise<void> => {
    try {
      if (
        typeof galleryPictureId === 'undefined' &&
        typeof formState.file !== 'undefined'
      ) {
        const data = await cloudinaryUpload(formState.file, 'HOME_IMAGE');

        await createGalleryPictureMutation(
          CreateGalleryPictureSchema.parse({
            cloudinaryId: data.public_id,
            description: formState.description,
            height: data.height,
            url: data.secure_url,
            width: data.width,
          })
        );
      } else {
        await updateGalleryPictureDescriptionMutation(
          UpdateGalleryPictureDescriptionSchema.parse({
            description: formState.description,
            id: galleryPictureId,
          })
        );
      }

      clearFieldErrors();
      setFormError(undefined);
      await router.push('/dashboard/gallery-pictures');
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        setFieldErrors(getZodFieldErrors(error, formState));
      } else if (error instanceof Error) {
        setFormError(error.message);
      }
    }
  };

  const {
    clearFieldErrors,
    handleInputChange,
    handleSubmit,
    fieldErrors,
    formError,
    formState,
    setFieldErrors,
    setFormError,
    setFormState,
  } = useForm(initialState, {
    onSubmit: handleUpsertGalleryPicture,
  });

  useEffect(() => {
    if (imageToUpdate !== null) {
      setFormState(formState_ => {
        return {
          ...formState_,
          description: imageToUpdate.description,
        };
      });
    }
  }, [imageToUpdate, setFormState]);

  return {
    fieldErrors,
    formError,
    formState,
    handleInputChange,
    handleSubmit,
    isLoading: isCreateLoading || isUpdateLoading,
  };
};
