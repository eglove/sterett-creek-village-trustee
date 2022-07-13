import { useForm } from '@ethang/react';
import { useMutation, useQuery, useRouter } from 'blitz';
import { useS3Upload } from 'next-s3-upload';
import { ChangeEvent, FormEvent, useEffect } from 'react';
import { ZodError } from 'zod';

import createFile from '../../../../mutations/create-file';
import updateFileName from '../../../../mutations/update-file-name';
import { getZodFieldErrors } from '../../../../util/zod';
import { FileSchema, UpdateFileNameSchema } from '../../../../validations';
import getCovenant from '../../queries/covenants/get-covenant';

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
  isLoading: boolean;
};

export const useUpsertCovenant = ({
  covenantId,
}: UpdateCovenantProperties): UseUpsertCovenantReturn => {
  const router = useRouter();
  const { uploadToS3 } = useS3Upload();

  const [updateCovenant] = useQuery(getCovenant, { id: covenantId });
  const [uploadCovenantMutation, { isLoading: isUploadingLoading }] =
    useMutation(createFile);
  const [updateCovenantTitleMutation, { isLoading: isUpdateLoading }] =
    useMutation(updateFileName);

  const handleUploadCovenant = async (): Promise<void> => {
    try {
      if (
        typeof covenantId === 'undefined' &&
        typeof formState.file !== 'undefined'
      ) {
        const uploaded = await uploadToS3(formState.file);

        await uploadCovenantMutation(
          FileSchema.parse({
            ...uploaded,
            fileName: formState.title,
            fileType: 'COVENANTS',
          })
        );
      } else {
        await updateCovenantTitleMutation(
          UpdateFileNameSchema.parse({
            fileName: formState.title,
            id: covenantId,
          })
        );
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
          title: updateCovenant.fileName,
        };
      });
    }
  }, [setFormState, updateCovenant]);

  return {
    fieldErrors,
    formError,
    formState,
    handleInputChange,
    handleSubmit,
    isLoading: isUpdateLoading || isUploadingLoading,
  };
};
