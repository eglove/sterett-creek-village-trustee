import { useForm } from '@ethang/react';
import { useMutation, useQuery, useRouter } from 'blitz';
import { ChangeEvent, FormEvent, useEffect } from 'react';
import { ZodError } from 'zod';

import { getZodFieldErrors } from '../../../../util/zod';
import {
  CloudinaryImage,
  cloudinaryUpload,
} from '../../../util/cloudinary-upload';
import createTrustee from '../../mutations/trustees/create-trustee';
import updateTrustee from '../../mutations/trustees/update-trustee';
import getTrustee from '../../queries/trustees/get-trustee';
import {
  CreateTrusteeSchema,
  UpdateTrusteeSchema,
} from '../../validations/trustees/trustee-validations';

const initialState = {
  duties: '',
  firstName: '',
  image: undefined as File | undefined,
  lastName: '',
  phoneNumber: '',
};

interface UseUpsertTrusteeProperties {
  trusteeId?: string;
}

type UseUpsertTrusteeReturn = {
  fieldErrors:
    | Record<keyof typeof initialState, string[] | undefined>
    | undefined;
  formError: string | undefined;
  formState: typeof initialState;
  handleInputChange: (event: ChangeEvent) => void;
  handleSubmit: (event: FormEvent) => void;
  isLoading: boolean;
};

export const useUpsertTrustee = ({
  trusteeId,
}: UseUpsertTrusteeProperties): UseUpsertTrusteeReturn => {
  const router = useRouter();

  const [trusteeToUpdate] = useQuery(getTrustee, { id: trusteeId });
  const [createTrusteeMutation, { isLoading: isCreateLoading }] =
    useMutation(createTrustee);
  const [updateTrusteeMutation, { isLoading: isUpdateLoading }] =
    useMutation(updateTrustee);

  const handleError = (error: unknown): void => {
    if (error instanceof ZodError) {
      setFieldErrors(getZodFieldErrors(error, formState));
    }
  };

  const handleUpsertTrustee = async (): Promise<void> => {
    let data: CloudinaryImage | null = null;
    if (typeof formState.image !== 'undefined') {
      data = await cloudinaryUpload(formState.image, 'TRUSTEES');
    }

    if (typeof trusteeId === 'undefined' && data !== null) {
      await createTrusteeMutation(
        CreateTrusteeSchema.parse({
          ...formState,
          cloudinaryId: data.public_id,
          description: `${formState.firstName} ${formState.lastName}`,
          duties: formState.duties.split(','),
          height: data.height,
          url: data.secure_url,
          width: data.width,
        })
      );
    } else {
      await updateTrusteeMutation(
        UpdateTrusteeSchema.parse({
          ...formState,
          cloudinaryId: data?.public_id,
          description: `${formState.firstName} ${formState.lastName}`,
          duties: formState.duties.split(','),
          height: data?.height,
          id: trusteeId,
          url: data?.secure_url,
          width: data?.width,
        })
      );
    }

    await router.push('/dashboard/trustees');
  };

  const {
    formState,
    fieldErrors,
    formError,
    handleInputChange,
    handleSubmit,
    setFieldErrors,
    setFormState,
  } = useForm(initialState, {
    onError: handleError,
    onSubmit: handleUpsertTrustee,
  });

  useEffect(() => {
    if (trusteeToUpdate !== null) {
      setFormState(formState_ => {
        return {
          ...formState_,
          duties: trusteeToUpdate.duties.join(', '),
          firstName: trusteeToUpdate.firstName,
          lastName: trusteeToUpdate.lastName,
          phoneNumber: trusteeToUpdate.phoneNumber,
        };
      });
    }
  }, [setFormState, trusteeToUpdate]);

  return {
    fieldErrors,
    formError,
    formState,
    handleInputChange,
    handleSubmit,
    isLoading: isCreateLoading || isUpdateLoading,
  };
};
