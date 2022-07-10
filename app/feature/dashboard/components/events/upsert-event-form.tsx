import { Button, ButtonGroup } from '@trussworks/react-uswds';

import utilStyles from '../../../../styles/util.module.css';
import { DateTimePicker } from '../../../core/components/date-time-picker';
import { TrussForm } from '../../../trussworks/truss-form/truss-form';
import { TrussTextArea } from '../../../trussworks/truss-form/truss-text-area';
import { TrussTextInput } from '../../../trussworks/truss-form/truss-text-input';
import {
  UpdateProperties,
  useUpsertEventForm,
} from '../../hooks/events/use-upsert-event-form';
import styles from '../../styles/dashboard.module.css';

export const UpsertEventForm = (
  updateProperties: UpdateProperties
): JSX.Element => {
  const isCreating = typeof updateProperties.eventId === 'undefined';

  const {
    formError,
    formState,
    fieldErrors,
    handleGoBack,
    handleInputChange,
    handleSubmit,
    isLoading,
  } = useUpsertEventForm(updateProperties);

  return (
    <div className={utilStyles.CenterOnPage}>
      <TrussForm
        disabled={isLoading}
        errorMessage={formError}
        formProperties={{ large: true }}
        legend={`${isCreating ? 'Create' : 'Update'} Event`}
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
        <div className={styles.DateTime}>
          <DateTimePicker
            label="Start Time"
            name="startsAt"
            value={formState.startsAt}
            onChange={handleInputChange}
          />
          <DateTimePicker
            label="End Time"
            name="endsAt"
            value={formState.endsAt}
            onChange={handleInputChange}
          />
        </div>
        <div>
          {fieldErrors?.endsAt &&
            fieldErrors.endsAt.map(message => {
              return (
                <p className="text-error usa-form__note" key="message">
                  {message}
                </p>
              );
            })}
        </div>
        <TrussTextArea
          required
          errorMessages={fieldErrors?.description}
          label="Description"
          name="description"
          value={formState.description}
          onChange={handleInputChange}
        />
        <ButtonGroup>
          <Button type="submit">{isCreating ? 'Create' : 'Update'}</Button>
          <Button
            className="bg-accent-cool-dark"
            type="button"
            onClick={handleGoBack}
          >
            Go Back
          </Button>
        </ButtonGroup>
      </TrussForm>
    </div>
  );
};
