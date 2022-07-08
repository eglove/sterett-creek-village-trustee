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
import createEvent from '../mutations/create-event';
import { CreateEventSchema } from '../validations';

const initialState = {
  description: '',
  endDate: '',
  endTime: '',
  startDate: '',
  startTime: '',
  title: '',
};

type UseCreateEventFormReturn = {
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

export const useCreateEventForm = (): UseCreateEventFormReturn => {
  const [formError, setFormError] = useState<string>();
  const [createEventMutation, { isLoading }] = useMutation(createEvent);

  const handleCreateEvent = async (): Promise<void> => {
    try {
      const startsAt = new Date(
        `${formState.startDate} ${formState.startTime}`
      );
      const endsAt = new Date(`${formState.endDate} ${formState.endTime}`);
      const body = CreateEventSchema.parse({
        description: formState.description,
        endsAt,
        startsAt,
        title: formState.title,
      });
      await createEventMutation(body);
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
    clearFieldErrors,
    handleSubmit,
    handleInputChange,
    fieldErrors,
    setFieldErrors,
    setFormState,
  } = useForm(initialState, {
    onSubmit: handleCreateEvent,
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
