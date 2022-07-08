import { Button } from '@trussworks/react-uswds';

import utilStyles from '../../../styles/util.module.css';
import { TrussDatePicker } from '../../trussworks/truss-form/truss-date-picker';
import { TrussForm } from '../../trussworks/truss-form/truss-form';
import { TrussTextArea } from '../../trussworks/truss-form/truss-text-area';
import { TrussTextInput } from '../../trussworks/truss-form/truss-text-input';
import { TrussTimePicker } from '../../trussworks/truss-form/truss-time-picker';
import { useCreateEventForm } from '../hooks/use-create-event-form';
import styles from '../styles/dashboard.module.css';

export const CreateEventForm = (): JSX.Element => {
  const {
    formError,
    formState,
    fieldErrors,
    handleInputChange,
    handleSubmit,
    isLoading,
    setFormState,
  } = useCreateEventForm();

  const handleDateEvent = (key: string, value?: string | undefined): void => {
    setFormState(formState_ => {
      return {
        ...formState_,
        [key]: value,
      };
    });
  };

  return (
    <div className={utilStyles.CenterOnPage}>
      <TrussForm
        disabled={isLoading}
        errorMessage={formError}
        formProperties={{ large: true }}
        legend="Create Event"
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
        <TrussTextArea
          required
          errorMessages={fieldErrors?.description}
          label="Description"
          name="description"
          value={formState.description}
          onChange={handleInputChange}
        />
        <div className={styles.DateTime}>
          <TrussDatePicker
            label="Start Date"
            name="startDate"
            value={formState.startDate}
            onChange={(value: string | undefined): void => {
              handleDateEvent('startDate', value);
            }}
          />
          <TrussTimePicker
            label="Start Time"
            name="startTime"
            value={formState.startTime}
            onChange={(value: string | undefined): void => {
              handleDateEvent('startTime', value);
            }}
          />
        </div>
        <div className={styles.DateTime}>
          <TrussDatePicker
            label="End Date"
            name="endDate"
            value={formState.endDate}
            onChange={(value: string | undefined): void => {
              handleDateEvent('endDate', value);
            }}
          />
          <TrussTimePicker
            label="End Time"
            name="endTime"
            value={formState.endTime}
            onChange={(value: string | undefined): void => {
              handleDateEvent('endTime', value);
            }}
          />
        </div>
        <Button type="submit">Create</Button>
      </TrussForm>
    </div>
  );
};
