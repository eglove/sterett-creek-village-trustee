import { Button } from '@trussworks/react-uswds';
import { Link } from 'blitz';

import { TrussForm } from '../../trussworks/truss-form/truss-form';
import { TrussTextInput } from '../../trussworks/truss-form/truss-text-input';
import { useResetPasswordForm } from '../hooks/use-reset-password-form';

export const ResetPasswordForm = (): JSX.Element => {
  const {
    formState,
    formError,
    fieldErrors,
    handleInputChange,
    handleSubmit,
    isSuccess,
  } = useResetPasswordForm();

  if (isSuccess) {
    return (
      <div>
        <h2>Password Reset Successfully</h2>
        <p>
          Go to the <Link href="/">homepage</Link>
        </p>
      </div>
    );
  }

  return (
    <TrussForm errorMessage={formError} onSubmit={handleSubmit}>
      <TrussTextInput
        required
        errorMessages={fieldErrors?.password}
        label="Password"
        name="password"
        value={formState.password}
        onChange={handleInputChange}
      />
      <TrussTextInput
        required
        errorMessages={fieldErrors?.confirmPassword}
        label="Confirm Password"
        name="confirmPassword"
        value={formState.confirmPassword}
        onChange={handleInputChange}
      />
      <Button type="submit">Reset</Button>
    </TrussForm>
  );
};
