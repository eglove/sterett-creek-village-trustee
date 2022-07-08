import {
  DatePicker,
  ErrorMessage,
  FormGroup,
  Label,
} from '@trussworks/react-uswds';
import { DatePickerProps } from '@trussworks/react-uswds/lib/components/forms/DatePicker/DatePicker';

interface TrussDatePickerProperties {
  datePickerProperties?: Partial<DatePickerProps>;
  errorMessage?: string;
  label: string;
  name: string;
  onChange: (val?: string) => void;
  required?: boolean;
  value: string;
}

export const TrussDatePicker = ({
  datePickerProperties,
  errorMessage,
  label,
  name,
  onChange,
  required,
  value,
}: TrussDatePickerProperties): JSX.Element => {
  return (
    <FormGroup>
      <Label htmlFor={name}>{label}</Label>
      {typeof errorMessage !== 'undefined' && (
        <ErrorMessage id={`${name}-message`}>{errorMessage}</ErrorMessage>
      )}
      <DatePicker
        aria-required={required}
        id={name}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        {...datePickerProperties}
      />
    </FormGroup>
  );
};
