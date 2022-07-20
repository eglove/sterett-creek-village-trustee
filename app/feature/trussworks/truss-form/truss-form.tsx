import { ErrorMessage, Fieldset, Form } from '@trussworks/react-uswds';
import { OptionalFormProps } from '@trussworks/react-uswds/lib/components/forms/Form/Form';
import React, { ChangeEvent, FieldsetHTMLAttributes, ReactNode } from 'react';

interface FieldsetProperties {
  className?: string;
  legend?: ReactNode;
  legendStyle?: 'default' | 'large' | 'srOnly';
}

interface TrussFormProperties {
  children: ReactNode;
  disabled?: boolean;
  errorMessage?: string;
  fieldSetProperties?: FieldsetProperties &
    FieldsetHTMLAttributes<HTMLFieldSetElement>;
  formProperties?: OptionalFormProps;
  largeForm?: boolean;
  legend?: string;
  onSubmit: (event: ChangeEvent<HTMLFormElement>) => void;
}

export const TrussForm = ({
  largeForm,
  onSubmit,
  formProperties,
  fieldSetProperties,
  errorMessage,
  children,
  disabled,
  legend,
}: TrussFormProperties): JSX.Element => {
  return (
    <Form large={largeForm} onSubmit={onSubmit} {...formProperties}>
      <Fieldset
        aria-disabled={disabled}
        disabled={disabled}
        legend={legend}
        legendStyle="large"
        {...fieldSetProperties}
      >
        {typeof errorMessage !== 'undefined' && (
          <ErrorMessage>{errorMessage}</ErrorMessage>
        )}
        {children}
      </Fieldset>
    </Form>
  );
};
