import { useForm } from '@ethang/react';
import { htmlInputDateTimeInputFormat } from '@ethang/utilities';
import { useMutation, useQuery, useRouter } from 'blitz';
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { ZodError } from 'zod';

import { getZodFieldErrors } from '../../../util/zod';
import upsertEvent from '../mutations/upsert-event';
import getEvent from '../queries/get-event';
import { UpsertEventSchema } from '../validations';

export interface UpdateProperties {
  eventId?: string;
}

const initialState = {
  description: '',
  endsAt: '',
  startsAt: '',
  title: '',
};

type UseUpsertEventFormReturn = {
  fieldErrors:
    | Record<keyof typeof initialState, string[] | undefined>
    | undefined;
  formError: string | undefined;
  formState: typeof initialState;
  handleGoBack: () => void;
  handleInputChange: (event: ChangeEvent) => void;
  handleSubmit: (event: FormEvent) => void;
  isLoading: boolean;
  setFormState: Dispatch<SetStateAction<typeof initialState>>;
};

export const useUpsertEventForm = (
  updateProperties?: UpdateProperties
): UseUpsertEventFormReturn => {
  const router = useRouter();

  const [formError, setFormError] = useState<string>();

  const [updateEvent] = useQuery(getEvent, { id: updateProperties?.eventId });
  const [createEventMutation, { isLoading }] = useMutation(upsertEvent);

  const handleCreateEvent = async (): Promise<void> => {
    try {
      const body = UpsertEventSchema.parse({
        description: formState.description,
        endsAt: new Date(formState.endsAt),
        id: updateProperties?.eventId,
        startsAt: new Date(formState.startsAt),
        title: formState.title,
      });
      await createEventMutation(body);
      clearFieldErrors();
      setFormError(undefined);
      await router.push('/dashboard/events');
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        setFieldErrors(getZodFieldErrors(error, formState));
      } else if (error instanceof Error) {
        setFormError(error.message);
      }
    }
  };

  const handleGoBack = async (): Promise<void> => {
    await router.push('/dashboard/events');
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

  useEffect(() => {
    if (updateEvent !== null) {
      setFormState(formState_ => {
        return {
          ...formState_,
          description: updateEvent.description,
          endsAt: htmlInputDateTimeInputFormat(updateEvent.endsAt),
          startsAt: htmlInputDateTimeInputFormat(updateEvent.startsAt),
          title: updateEvent.title,
        };
      });
    }
  }, [setFormState, updateEvent]);

  return {
    fieldErrors,
    formError,
    formState,
    handleGoBack,
    handleInputChange,
    handleSubmit,
    isLoading,
    setFormState,
  };
};
