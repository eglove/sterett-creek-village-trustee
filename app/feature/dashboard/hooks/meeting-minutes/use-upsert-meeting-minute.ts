import { useForm } from '@ethang/react';
import { useMutation, useQuery, useRouter } from 'blitz';
import { useS3Upload } from 'next-s3-upload';
import { ChangeEvent, FormEvent, useEffect } from 'react';
import { ZodError } from 'zod';

import { getZodFieldErrors } from '../../../../util/zod';
import { FileSchema, UpdateFileNameSchema } from '../../../../validations';
import createMeetingMinute from '../../mutations/meeting-minutes/create-meeting-minute';
import updateMeetingMinuteTitle from '../../mutations/meeting-minutes/update-meeting-minute-title';
import getMeetingMinute from '../../queries/meeting-minutes/get-meeting-minute';

export interface UpdateMeetingMinuteProperties {
  meetingMinuteId?: string;
}

type InitialState = {
  file?: File;
  title: string;
};

const initialState: InitialState = {
  file: undefined,
  title: '',
};

type UseUpsertMeetingMinuteReturn = {
  fieldErrors:
    | Record<keyof typeof initialState, string[] | undefined>
    | undefined;
  formError: string | undefined;
  formState: typeof initialState;
  handleInputChange: (event: ChangeEvent) => void;
  handleSubmit: (event: FormEvent) => void;
  isLoading: boolean;
};

export const useUpsertMeetingMinute = ({
  meetingMinuteId,
}: UpdateMeetingMinuteProperties): UseUpsertMeetingMinuteReturn => {
  const router = useRouter();
  const { uploadToS3 } = useS3Upload();

  const [meetingMinuteToUpdate] = useQuery(getMeetingMinute, {
    id: meetingMinuteId,
  });
  const [uploadMeetingMinuteMutation, { isLoading: isCreateLoading }] =
    useMutation(createMeetingMinute);
  const [updateMeetingMinuteTitleMutation, { isLoading: isUpdateLoading }] =
    useMutation(updateMeetingMinuteTitle);

  const handleUpsertMeetingMinute = async (): Promise<void> => {
    try {
      if (
        typeof meetingMinuteId === 'undefined' &&
        typeof formState.file !== 'undefined'
      ) {
        const uploaded = await uploadToS3(formState.file);

        await uploadMeetingMinuteMutation(
          FileSchema.parse({
            ...uploaded,
            fileName: formState.title,
            fileType: 'MEETING_MINUTES',
          })
        );
      } else {
        await updateMeetingMinuteTitleMutation(
          UpdateFileNameSchema.parse({
            fileName: formState.title,
            id: meetingMinuteId,
          })
        );
      }

      clearFieldErrors();
      setFormError(undefined);
      await router.push('/dashboard/meeting-minutes');
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
    onSubmit: handleUpsertMeetingMinute,
  });

  useEffect(() => {
    if (meetingMinuteToUpdate !== null) {
      setFormState(formState_ => {
        return {
          ...formState_,
          title: meetingMinuteToUpdate.fileName,
        };
      });
    }
  }, [meetingMinuteToUpdate, setFormState]);

  return {
    fieldErrors,
    formError,
    formState,
    handleInputChange,
    handleSubmit,
    isLoading: isUpdateLoading || isCreateLoading,
  };
};
