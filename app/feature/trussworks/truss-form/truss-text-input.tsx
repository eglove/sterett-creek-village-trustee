import {
  ErrorMessage,
  FormGroup,
  Label,
  TextInput,
} from '@trussworks/react-uswds';
import { TextInputProps } from '@trussworks/react-uswds/lib/components/forms/TextInput/TextInput';
import { ChangeEvent, InputHTMLAttributes, LabelHTMLAttributes } from 'react';

interface TrussTextInputProperties {
  errorMessages?: string[];
  inputProperties?: Partial<TextInputProps> &
    Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>;
  label: string;
  labelProperties?: LabelHTMLAttributes<HTMLLabelElement>;
  name: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  type?: 'text' | 'email' | 'number' | 'password' | 'search' | 'tel' | 'url';
  value: string | number | readonly string[] | undefined;
}

export const TrussTextInput = ({
  errorMessages,
  inputProperties,
  label,
  labelProperties,
  name,
  onChange,
  required,
  type,
  value,
}: TrussTextInputProperties): JSX.Element => {
  return (
    <FormGroup>
      <Label htmlFor={name} {...labelProperties}>
        {label}
      </Label>
      <ErrorMessage id={`${name}-message`}>
        {errorMessages?.map(message => {
          return <div key={message}>{message}</div>;
        })}
      </ErrorMessage>
      <TextInput
        id={name}
        name={name}
        required={required}
        type={type ?? 'text'}
        value={value}
        onChange={onChange}
        {...inputProperties}
      />
    </FormGroup>
  );
};
