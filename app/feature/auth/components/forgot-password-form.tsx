import { Button } from '@trussworks/react-uswds';

import { TrussForm } from '../../trussworks/truss-form/truss-form';
import { TrussTextInput } from '../../trussworks/truss-form/truss-text-input';
import { useForgotPasswordForm } from '../hooks/use-forgot-password-form';

export const ForgotPasswordForm = (): JSX.Element => {
  const {
    formError,
    formState,
    handleInputChange,
    handleSubmit,
    fieldErrors,
    isSuccess,
  } = useForgotPasswordForm();

  if (isSuccess) {
    return (
      <div>
        <h2>Request submitted</h2>
        <p>
          If your email is in our system, you will receive instructions to reset
          your password shortly.
        </p>
      </div>
    );
  }

  return (
    <TrussForm errorMessage={formError} onSubmit={handleSubmit}>
      <TrussTextInput
        required
        errorMessages={fieldErrors?.email}
        label="Email"
        name="email"
        value={formState.email}
        onChange={handleInputChange}
      />
      <Button type="submit">Submit</Button>
    </TrussForm>
  );
};
