import { useForm } from '@ethang/react';
import { useMutation, useRouterQuery } from 'blitz';
import { ChangeEvent, FormEvent, useState } from 'react';
import { ZodError } from 'zod';

import { getZodFieldErrors } from '../../../util/zod';
import resetPassword from '../mutations/reset-password';
import { ResetPasswordSchema } from '../validations';

type InitialState = {
  confirmPassword: string;
  password: string;
  token: string;
};

type UseResetPasswordFormReturn = {
  fieldErrors: Record<keyof InitialState, string[] | undefined> | undefined;
  formError: string | undefined;
  formState: InitialState;
  handleInputChange: (event: ChangeEvent) => void;
  handleSubmit: (event: FormEvent) => void;
  isSuccess: boolean;
};

export const useResetPasswordForm = (): UseResetPasswordFormReturn => {
  const query = useRouterQuery();

  const [formError, setFormError] = useState<string>();
  const [resetPasswordMutation, { isSuccess }] = useMutation(resetPassword);

  const initialState = {
    confirmPassword: '',
    password: '',
    token: query.token as string,
  };

  const handleResetPassword = async (): Promise<void> => {
    try {
      await resetPasswordMutation(ResetPasswordSchema.parse(formState));
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
    clearFieldErrors,
    setFieldErrors,
  } = useForm(initialState, {
    onSubmit: handleResetPassword,
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
