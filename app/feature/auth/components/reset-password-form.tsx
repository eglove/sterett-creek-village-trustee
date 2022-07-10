import { Button } from '@trussworks/react-uswds';
import { Link } from 'blitz';

import utilityStyles from '../../../styles/util.module.css';
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
    isLoading,
    isSuccess,
  } = useResetPasswordForm();

  if (isSuccess) {
    return (
      <div className={utilityStyles.CenterOnPage}>
        <h2>Password Reset Successfully</h2>
        <p>
          Go to the <Link href="/">homepage</Link>
        </p>
      </div>
    );
  }

  return (
    <div className={utilityStyles.CenterOnPage}>
      <TrussForm
        disabled={isLoading}
        errorMessage={formError}
        legend="Reset Password"
        onSubmit={handleSubmit}
      >
        <TrussTextInput
          required
          errorMessages={fieldErrors?.password}
          label="New Password"
          name="password"
          type="password"
          value={formState.password}
          onChange={handleInputChange}
        />
        <TrussTextInput
          required
          errorMessages={fieldErrors?.confirmPassword}
          label="Confirm New Password"
          name="confirmPassword"
          type="password"
          value={formState.confirmPassword}
          onChange={handleInputChange}
        />
        <Button type="submit">Reset</Button>
      </TrussForm>
    </div>
  );
};
