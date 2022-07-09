import { useForm } from '@ethang/react';
import { HTTP_METHOD } from '@ethang/utilities';
import { useMutation, useQuery, useRouter } from 'blitz';
import FormData from 'form-data';
import { ChangeEvent, FormEvent, useEffect } from 'react';
import { ZodError } from 'zod';

import { getZodFieldErrors } from '../../../util/zod';
import { CLOUDINARY_PRESET, CLOUDINARY_URL } from '../contstants';
import uploadCovenant from '../mutations/create-covenant';
import updateCovenantTitle from '../mutations/update-covenant-title';
import getCovenant from '../queries/get-covenant';
import { CloudinaryImage } from '../types';
import { UpdateCovenantTitle, UploadCovenant } from '../validations';

export interface UpdateCovenantProperties {
  covenantId?: string;
}

type InitialState = {
  file?: File;
  title: string;
};

const initialState: InitialState = {
  file: undefined,
  title: '',
};

type UseUpsertCovenantReturn = {
  fieldErrors:
    | Record<keyof typeof initialState, string[] | undefined>
    | undefined;
  formError: string | undefined;
  formState: typeof initialState;
  handleInputChange: (event: ChangeEvent) => void;
  handleSubmit: (event: FormEvent) => void;
};

export const useUpsertCovenant = ({
  covenantId,
}: UpdateCovenantProperties): UseUpsertCovenantReturn => {
  const router = useRouter();

  const [updateCovenant] = useQuery(getCovenant, { id: covenantId });
  const [uploadCovenantMutation] = useMutation(uploadCovenant);
  const [updateCovenantTitleMutation] = useMutation(updateCovenantTitle);

  const handleUploadCovenant = async (): Promise<void> => {
    try {
      if (typeof covenantId === 'undefined') {
        const fileData = new FormData();
        fileData.append('file', formState.file);
        fileData.append('upload_preset', CLOUDINARY_PRESET.COVENANT);

        const response = await fetch(CLOUDINARY_URL.IMAGE_UPLOAD, {
          // TODO move this to a server side REST endpoint
          // @ts-expect-error Using form data
          body: fileData,
          method: HTTP_METHOD.POST,
        });
        const data = (await response.json()) as CloudinaryImage;

        await uploadCovenantMutation(
          UploadCovenant.parse({
            cloudinaryId: data.public_id,
            height: data.height,
            title: formState.title,
            url: data.secure_url,
            width: data.width,
          })
        );
      } else {
        const body = UpdateCovenantTitle.parse({
          id: covenantId,
          title: formState.title,
        });
        await updateCovenantTitleMutation(body);
      }

      clearFieldErrors();
      setFormError(undefined);
      await router.push('/dashboard/covenants');
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        setFieldErrors(getZodFieldErrors(error, formState));
      } else if (error instanceof Error) {
        setFormError(error.message);
      }
    }
  };

  const {
    fieldErrors,
    setFieldErrors,
    clearFieldErrors,
    formError,
    setFormError,
    formState,
    handleSubmit,
    handleInputChange,
    setFormState,
  } = useForm(initialState, {
    onSubmit: handleUploadCovenant,
  });

  useEffect(() => {
    if (updateCovenant !== null) {
      setFormState(formState_ => {
        return {
          ...formState_,
          title: updateCovenant.title,
        };
      });
    }
  }, [setFormState, updateCovenant]);

  return { fieldErrors, formError, formState, handleInputChange, handleSubmit };
};
