import { useForm } from '@ethang/react';
import { useMutation } from 'blitz';
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from 'react';
import { ZodError } from 'zod';

import { getZodFieldErrors } from '../../../util/zod';
import signUp from '../mutations/sign-up';
import { SignUpSchema } from '../validations';

const initialState = {
  confirmPassword: '',
  email: '',
  password: '',
};

type UseSignUpFormReturn = {
  fieldErrors:
    | Record<keyof typeof initialState, string[] | undefined>
    | undefined;
  formError: string | undefined;
  formState: typeof initialState;
  handleInputChange: (event: ChangeEvent) => void;
  handleSubmit: (event: FormEvent) => void;
  isLoading: boolean;
  setFormState: Dispatch<SetStateAction<typeof initialState>>;
};

interface UseSignUpFormProperties {
  onSuccess?: () => void;
}

export const useSignUpForm = (
  parameters?: UseSignUpFormProperties
): UseSignUpFormReturn => {
  const [formError, setFormError] = useState<string>();

  const [signUpMutation, { isLoading }] = useMutation(signUp);

  const handleSignUp = async (): Promise<void> => {
    try {
      const body = SignUpSchema.parse(formState);
      await signUpMutation(body);
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
    clearFieldErrors,
    formState,
    setFormState,
    handleInputChange,
    handleSubmit,
    fieldErrors,
    setFieldErrors,
  } = useForm(initialState, {
    onSubmit: handleSignUp,
  });

  return {
    fieldErrors,
    formError,
    formState,
    handleInputChange,
    handleSubmit,
    isLoading,
    setFormState,
  };
};
