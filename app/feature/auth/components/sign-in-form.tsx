import { Button } from '@trussworks/react-uswds';

import { Container } from '../../core/components/container';
import { TrussForm } from '../../trussworks/truss-form/truss-form';
import { TrussTextInput } from '../../trussworks/truss-form/truss-text-input';
import { TrussLink } from '../../trussworks/truss-link/truss-link';
import { useSignInForm } from '../hooks/use-sign-in-form';

interface SignInFormProperties {
  onSuccess?: () => void;
}

export const SignInForm = (parameters: SignInFormProperties): JSX.Element => {
  const {
    formState,
    formError,
    fieldErrors,
    handleSubmit,
    handleInputChange,
    isLoading,
  } = useSignInForm({ onSuccess: parameters.onSuccess });

  return (
    <Container>
      <TrussForm
        disabled={isLoading}
        errorMessage={formError}
        legend="Sign in"
        onSubmit={handleSubmit}
      >
        <TrussLink href="/sign-up">or create account</TrussLink>
        <TrussTextInput
          required
          errorMessages={fieldErrors?.email}
          label="Email"
          name="email"
          type="email"
          value={formState.email}
          onChange={handleInputChange}
        />
        <TrussTextInput
          required
          errorMessages={fieldErrors?.password}
          label="Password"
          name="password"
          type="password"
          value={formState.password}
          onChange={handleInputChange}
        />
        <Button type="submit">Sign In</Button>
        <p>
          <TrussLink href="/forgot-password">Forgot Password?</TrussLink>
        </p>
      </TrussForm>
    </Container>
  );
};
