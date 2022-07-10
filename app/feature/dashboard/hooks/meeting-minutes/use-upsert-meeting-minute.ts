import { useForm } from '@ethang/react';
import { HTTP_METHOD } from '@ethang/utilities';
import { useMutation, useQuery, useRouter } from 'blitz';
import FormData from 'form-data';
import { ChangeEvent, FormEvent, useEffect } from 'react';
import { ZodError } from 'zod';

import { getZodFieldErrors } from '../../../../util/zod';
import { CLOUDINARY_PRESET, CLOUDINARY_URL } from '../../constants';
import createMeetingMinute from '../../mutations/meeting-minutes/create-meeting-minute';
import updateMeetingMinuteTitle from '../../mutations/meeting-minutes/update-meeting-minute-title';
import getMeetingMinute from '../../queries/meeting-minutes/get-meeting-minute';
import { CloudinaryImage } from '../../types';
import {
  UpdateMeetingMinutesTitleSchema,
  UploadMeetingMinutes,
} from '../../validations/meeting-minutes/meeting-minutes-validations';

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

  const [meetingMinuteToUpdate] = useQuery(getMeetingMinute, {
    id: meetingMinuteId,
  });
  const [uploadMeetingMinuteMutation, { isLoading: isCreateLoading }] =
    useMutation(createMeetingMinute);
  const [updateMeetingMinuteTitleMutation, { isLoading: isUpdateLoading }] =
    useMutation(updateMeetingMinuteTitle);

  const handleUpsertMeetingMinute = async (): Promise<void> => {
    try {
      if (typeof meetingMinuteId === 'undefined') {
        const fileData = new FormData();
        fileData.append('file', formState.file);
        fileData.append('upload_preset', CLOUDINARY_PRESET.MEETING_MINUTES);

        const response = await fetch(CLOUDINARY_URL.IMAGE_UPLOAD, {
          // TODO move this to a server side REST endpoint
          // @ts-expect-error Using form data
          body: fileData,
          method: HTTP_METHOD.POST,
        });
        const data = (await response.json()) as CloudinaryImage;

        await uploadMeetingMinuteMutation(
          UploadMeetingMinutes.parse({
            cloudinaryId: data.public_id,
            height: data.height,
            title: formState.title,
            url: data.secure_url,
            width: data.width,
          })
        );
      } else {
        await updateMeetingMinuteTitleMutation(
          UpdateMeetingMinutesTitleSchema.parse({
            id: meetingMinuteId,
            title: formState.title,
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
          title: meetingMinuteToUpdate.title,
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
