import { TimePicker } from '@trussworks/react-uswds';

interface TrussDatePickerProperties {
  errorMessage?: string;
  label: string;
  name: string;
  onChange: (val?: string) => void;
  required?: boolean;
  value: string;
}

export const TrussTimePicker = ({
  errorMessage,
  label,
  name,
  onChange,
  required,
  value,
}: TrussDatePickerProperties): JSX.Element => {
  return (
    <TimePicker
      aria-errormessage={errorMessage}
      aria-required={required}
      id={name}
      label={label}
      name={name}
      required={required}
      value={value}
      onChange={onChange}
    />
  );
};
