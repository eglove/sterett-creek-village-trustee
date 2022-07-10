import { useForm } from '@ethang/react';
import { HTTP_METHOD } from '@ethang/utilities';
import { useMutation, useQuery, useRouter } from 'blitz';
import { ChangeEvent, FormEvent, useEffect } from 'react';
import { ZodError } from 'zod';

import { getZodFieldErrors } from '../../../../util/zod';
import { CLOUDINARY_PRESET, CLOUDINARY_URL } from '../../constants';
import createHomeImage from '../../mutations/home-images/create-home-image';
import updateHomeImageDescription from '../../mutations/home-images/update-home-image-description';
import getHomeImage from '../../queries/home-images/get-home-image';
import { CloudinaryImage } from '../../types';
import {
  CreateHomeImageSchema,
  UpdateHomeImageDescriptionSchema,
} from '../../validations/home-image/home-image-validations';

export interface UpsertHomeImagesProperties {
  homeImageId?: string;
}

type InitialState = {
  description: string;
  file?: File;
};

const initialState: InitialState = {
  description: '',
  file: undefined,
};

export type UseUpsertHomeImagesReturn = {
  fieldErrors: Record<keyof InitialState, string[] | undefined> | undefined;
  formError: string | undefined;
  formState: InitialState;
  handleInputChange: (event: ChangeEvent) => void;
  handleSubmit: (event: FormEvent) => void;
};

export const useUpsertHomeImages = ({
  homeImageId,
}: UpsertHomeImagesProperties): UseUpsertHomeImagesReturn => {
  const router = useRouter();

  const [imageToUpdate] = useQuery(getHomeImage, { id: homeImageId });
  const [createHomeImageMutation] = useMutation(createHomeImage);
  const [updateHomeImageDescriptionMutation] = useMutation(
    updateHomeImageDescription
  );

  const handleUpsertHomeImage = async (): Promise<void> => {
    try {
      if (
        typeof homeImageId === 'undefined' &&
        typeof formState.file !== 'undefined'
      ) {
        const fileData = new FormData();
        fileData.append('file', formState.file);
        fileData.append('upload_preset', CLOUDINARY_PRESET.HOME_IMAGE);

        // TODO create image upload server side REST endpoint
        const response = await fetch(CLOUDINARY_URL.IMAGE_UPLOAD, {
          body: fileData,
          method: HTTP_METHOD.POST,
        });
        const data = (await response.json()) as CloudinaryImage;

        await createHomeImageMutation(
          CreateHomeImageSchema.parse({
            cloudinaryId: data.public_id,
            description: formState.description,
            height: data.height,
            url: data.secure_url,
            width: data.width,
          })
        );
      } else {
        await updateHomeImageDescriptionMutation(
          UpdateHomeImageDescriptionSchema.parse({
            description: formState.description,
            id: homeImageId,
          })
        );
      }

      clearFieldErrors();
      setFormError(undefined);
      await router.push('/dashboard/home-images');
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
    onSubmit: handleUpsertHomeImage,
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
  };
};
