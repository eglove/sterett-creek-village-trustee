import { Button } from '@trussworks/react-uswds';

import { Container } from '../../core/components/container';
import { TrussForm } from '../../trussworks/truss-form/truss-form';
import { TrussTextInput } from '../../trussworks/truss-form/truss-text-input';
import { TrussLink } from '../../trussworks/truss-link/truss-link';
import { useSignUpForm } from '../hooks/use-sign-up-form';

interface SignUpFormProperties {
  onSuccess?: () => void;
}

export const SignUpForm = ({
  onSuccess,
}: SignUpFormProperties): JSX.Element => {
  const {
    formState,
    handleInputChange,
    handleSubmit,
    isLoading,
    fieldErrors,
    formError,
  } = useSignUpForm({
    onSuccess,
  });

  return (
    <Container>
      <TrussForm
        disabled={isLoading}
        errorMessage={formError}
        legend="Sign up"
        onSubmit={handleSubmit}
      >
        <TrussLink href="/sign-in">or sign in</TrussLink>
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
        <TrussTextInput
          required
          errorMessages={fieldErrors?.confirmPassword}
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={formState.confirmPassword}
          onChange={handleInputChange}
        />
        <Button type="submit">Sign Up</Button>
      </TrussForm>
    </Container>
  );
};
