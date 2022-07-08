import { Button } from '@trussworks/react-uswds';

import utilStyles from '../../../styles/util.module.css';
import { TrussForm } from '../../trussworks/truss-form/truss-form';
import { TrussTextInput } from '../../trussworks/truss-form/truss-text-input';
import { useSignUpForm } from '../hooks/use-sign-up-form';

interface SignUpFormProperties {
  onSuccess?: () => void;
}

export const SignUpForm = ({
  onSuccess,
}: SignUpFormProperties): JSX.Element => {
  const { formState, handleInputChange, handleSubmit, fieldErrors, formError } =
    useSignUpForm({
      onSuccess,
    });

  return (
    <div className={utilStyles.CenterOnPage}>
      <TrussForm errorMessage={formError} onSubmit={handleSubmit}>
        <TrussTextInput
          required
          errorMessages={fieldErrors?.email}
          label="Email"
          name="email"
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
    </div>
  );
};
