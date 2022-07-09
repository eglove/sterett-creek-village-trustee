import {
  ErrorMessage,
  FileInput,
  FormGroup,
  Label,
} from '@trussworks/react-uswds';
import { ChangeEvent, LabelHTMLAttributes } from 'react';

interface TrussFileInputProperties {
  errorMessages?: string[];
  label: string;
  labelProperties?: LabelHTMLAttributes<HTMLLabelElement>;
  name: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

export const TrussFileInput = ({
  errorMessages,
  label,
  labelProperties,
  name,
  required,
  onChange,
}: TrussFileInputProperties): JSX.Element => {
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
      <FileInput
        aria-required={required}
        id={name}
        name={name}
        required={required}
        onChange={onChange}
      />
    </FormGroup>
  );
};
