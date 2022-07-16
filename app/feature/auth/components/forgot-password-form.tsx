import { Button } from '@trussworks/react-uswds';

import { Container } from '../../core/components/container';
import { TrussForm } from '../../trussworks/truss-form/truss-form';
import { TrussTextInput } from '../../trussworks/truss-form/truss-text-input';
import { useForgotPasswordForm } from '../hooks/use-forgot-password-form';

export const ForgotPasswordForm = (): JSX.Element => {
  const {
    formError,
    formState,
    handleInputChange,
    handleSubmit,
    isLoading,
    fieldErrors,
    isSuccess,
  } = useForgotPasswordForm();

  if (isSuccess) {
    return (
      <Container>
        <h2>Request submitted</h2>
        <p>
          If your email is in our system, you will receive instructions to reset
          your password shortly.
        </p>
      </Container>
    );
  }

  return (
    <Container>
      <TrussForm
        disabled={isLoading}
        errorMessage={formError}
        legend="Forgot Password"
        onSubmit={handleSubmit}
      >
        <TrussTextInput
          required
          errorMessages={fieldErrors?.email}
          label="Email"
          name="email"
          type="email"
          value={formState.email}
          onChange={handleInputChange}
        />
        <Button type="submit">Submit</Button>
      </TrussForm>
    </Container>
  );
};
