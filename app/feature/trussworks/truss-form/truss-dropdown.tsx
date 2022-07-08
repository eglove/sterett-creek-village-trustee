import {
  Dropdown,
  ErrorMessage,
  FormGroup,
  Label,
} from '@trussworks/react-uswds';
import { ChangeEvent } from 'react';

interface TrussDropdownProperties {
  children: JSX.Element | JSX.Element[];
  errorMessage?: string;
  formGroupClassName?: string;
  label: string;
  name: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  value: string | number;
}

export const TrussDropdown = ({
  children,
  errorMessage,
  formGroupClassName,
  label,
  name,
  onChange,
  required,
  value,
}: TrussDropdownProperties): JSX.Element => {
  return (
    <FormGroup
      className={formGroupClassName}
      error={typeof errorMessage !== 'undefined' && errorMessage !== ''}
    >
      <Label htmlFor={name}>{label}</Label>
      {typeof errorMessage !== 'undefined' && errorMessage !== '' && (
        <ErrorMessage id={`${name}-message`}>{errorMessage}</ErrorMessage>
      )}
      <Dropdown
        aria-required={required}
        id={name}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
      >
        {children}
      </Dropdown>
    </FormGroup>
  );
};
