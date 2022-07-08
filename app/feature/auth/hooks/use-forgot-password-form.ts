import { useForm } from '@ethang/react';
import { useMutation } from 'blitz';
import { ChangeEvent, FormEvent, useState } from 'react';
import { ZodError } from 'zod';

import { getZodFieldErrors } from '../../../util/zod';
import forgotPassword from '../mutations/forgot-password';
import { ForgotPasswordSchema } from '../validations';

const initialState = {
  email: '',
};

type UseForgotPasswordFormReturn = {
  fieldErrors:
    | Record<keyof typeof initialState, string[] | undefined>
    | undefined;
  formError: string | undefined;
  formState: typeof initialState;
  handleInputChange: (event: ChangeEvent) => void;
  handleSubmit: (event: FormEvent) => void;
  isSuccess: boolean;
};

export const useForgotPasswordForm = (): UseForgotPasswordFormReturn => {
  const [formError, setFormError] = useState<string>();
  const [forgotPasswordMutation, { isSuccess }] = useMutation(forgotPassword);

  const handleForgotPassword = async (): Promise<void> => {
    try {
      await forgotPasswordMutation(ForgotPasswordSchema.parse(formState));
      clearFieldErrors();
      setFormError(undefined);
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        setFieldErrors(getZodFieldErrors(error, formState));
      } else if (error instanceof Error) {
        setFormError(error.message);
      }
    }
  };

  const {
    formState,
    handleInputChange,
    handleSubmit,
    fieldErrors,
    setFieldErrors,
    clearFieldErrors,
  } = useForm(initialState, {
    onSubmit: handleForgotPassword,
  });

  return {
    fieldErrors,
    formError,
    formState,
    handleInputChange,
    handleSubmit,
    isSuccess,
  };
};
