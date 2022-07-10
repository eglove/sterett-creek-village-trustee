import { useForm } from '@ethang/react';
import { useMutation } from 'blitz';
import { ChangeEvent, FormEvent, useState } from 'react';
import { ZodError } from 'zod';

import { getZodFieldErrors } from '../../../util/zod';
import signIn from '../mutations/sign-in';
import { SignInSchema } from '../validations';

const initialState = {
  email: '',
  password: '',
};

interface UseSignInFormProperties {
  onSuccess?: () => void;
}

interface UseSignInFormReturn {
  fieldErrors:
    | Record<keyof typeof initialState, string[] | undefined>
    | undefined;
  formError: string | undefined;
  formState: typeof initialState;
  handleInputChange: (event: ChangeEvent) => void;
  handleSubmit: (event: FormEvent) => void;
  isLoading: boolean;
}

export const useSignInForm = (
  parameters?: UseSignInFormProperties
): UseSignInFormReturn => {
  const [signInMutation, { isLoading }] = useMutation(signIn);
  const [formError, setFormError] = useState<string>();

  const handleSignIn = async (): Promise<void> => {
    try {
      const body = SignInSchema.parse(formState);
      await signInMutation(body);
      clearFieldErrors();
      setFormError(undefined);
      parameters?.onSuccess?.();
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        setFieldErrors(getZodFieldErrors(error, formState));
      } else if (error instanceof Error) {
        setFormError(error.message);
      }
    }
  };

  const {
    handleSubmit,
    handleInputChange,
    formState,
    fieldErrors,
    setFieldErrors,
    clearFieldErrors,
  } = useForm(initialState, {
    onSubmit: handleSignIn,
  });

  return {
    fieldErrors,
    formError,
    formState,
    handleInputChange,
    handleSubmit,
    isLoading,
  };
};
