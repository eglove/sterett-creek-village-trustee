import { Button, ButtonGroup } from '@trussworks/react-uswds';
import { useRouter } from 'blitz';

import utilityStyles from '../../../../styles/util.module.css';
import { TrussFileInput } from '../../../trussworks/truss-form/truss-file-input';
import { TrussForm } from '../../../trussworks/truss-form/truss-form';
import { TrussTextInput } from '../../../trussworks/truss-form/truss-text-input';
import {
  UpdateMeetingMinuteProperties,
  useUpsertMeetingMinute,
} from '../../hooks/meeting-minutes/use-upsert-meeting-minute';

export const UpsertMeetingMinuteForm = ({
  meetingMinuteId,
}: UpdateMeetingMinuteProperties): JSX.Element => {
  const router = useRouter();

  const {
    formState,
    handleInputChange,
    handleSubmit,
    fieldErrors,
    formError,
    isLoading,
  } = useUpsertMeetingMinute({ meetingMinuteId });

  return (
    <div className={utilityStyles.CenterOnPage}>
      <TrussForm
        disabled={isLoading}
        errorMessage={formError}
        legend={`${
          typeof meetingMinuteId === 'undefined' ? 'Add' : 'Update'
        } Meeting Minutes`}
        onSubmit={handleSubmit}
      >
        <TrussTextInput
          required
          errorMessages={fieldErrors?.title}
          label="Title"
          name="title"
          value={formState.title}
          onChange={handleInputChange}
        />
        {typeof meetingMinuteId === 'undefined' && (
          <TrussFileInput
            required
            errorMessages={fieldErrors?.file}
            label="File"
            name="file"
            onChange={handleInputChange}
          />
        )}
        <ButtonGroup>
          <Button type="submit">
            {typeof meetingMinuteId === 'undefined' ? 'Create' : 'Update'}
          </Button>
          <Button
            className="bg-accent-cool-dark"
            type="button"
            onClick={async (): Promise<void> => {
              await router.push('/dashboard/meeting-minutes');
            }}
          >
            Go Back
          </Button>
        </ButtonGroup>
      </TrussForm>
    </div>
  );
};
