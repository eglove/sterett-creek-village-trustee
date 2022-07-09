import { ErrorMessage, FormGroup, Label } from '@trussworks/react-uswds';
import { DatePickerProps } from '@trussworks/react-uswds/lib/components/forms/DatePicker/DatePicker';
import { ChangeEventHandler } from 'react';

interface DateTimePickerProperties {
  datePickerProperties?: Partial<DatePickerProps>;
  errorMessage?: string;
  label: string;
  name: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
  value: string;
}

export const DateTimePicker = ({
  datePickerProperties,
  errorMessage,
  label,
  name,
  onChange,
  required,
  value,
}: DateTimePickerProperties): JSX.Element => {
  return (
    <FormGroup>
      <Label htmlFor={name}>{label}</Label>
      {typeof errorMessage !== 'undefined' && (
        <ErrorMessage id={`${name}-message`}>{errorMessage}</ErrorMessage>
      )}
      <input
        aria-required={required}
        defaultValue={value}
        id={name}
        name={name}
        required={required}
        type="datetime-local"
        onChange={onChange}
        {...datePickerProperties}
      />
    </FormGroup>
  );
};
