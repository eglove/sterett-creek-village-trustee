import {
  ErrorMessage,
  FormGroup,
  Label,
  Textarea,
} from '@trussworks/react-uswds';
import { TextareaProps } from '@trussworks/react-uswds/lib/components/forms/Textarea/Textarea';
import { ChangeEvent, LabelHTMLAttributes } from 'react';

interface TrussTextAreaProperties {
  errorMessages?: string[];
  label: string;
  labelProperties?: LabelHTMLAttributes<HTMLLabelElement>;
  name: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  textAreaProperties?: Partial<TextareaProps> &
    JSX.IntrinsicElements['textarea'];
  value: string | number | readonly string[] | undefined;
}

export const TrussTextArea = ({
  errorMessages,
  label,
  labelProperties,
  name,
  required,
  value,
  onChange,
  textAreaProperties,
}: TrussTextAreaProperties): JSX.Element => {
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
      <Textarea
        id={name}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        {...textAreaProperties}
      />
    </FormGroup>
  );
};
