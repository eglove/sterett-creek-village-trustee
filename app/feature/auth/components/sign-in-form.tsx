import { Button } from '@trussworks/react-uswds';

import utilStyles from '../../../styles/util.module.css';
import { TrussForm } from '../../trussworks/truss-form/truss-form';
import { TrussTextInput } from '../../trussworks/truss-form/truss-text-input';
import { useSignInForm } from '../hooks/use-sign-in-form';

interface SignInFormProperties {
  onSuccess?: () => void;
}

export const SignInForm = (parameters: SignInFormProperties): JSX.Element => {
  const { formState, formError, fieldErrors, handleSubmit, handleInputChange } =
    useSignInForm({ onSuccess: parameters.onSuccess });

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
        <Button type="submit">Sign In</Button>
      </TrussForm>
    </div>
  );
};