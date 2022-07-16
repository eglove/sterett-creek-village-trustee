import { formatList, formatPhoneNumber } from '@ethang/utilities';
import { Button, ButtonGroup, Icon } from '@trussworks/react-uswds';
import { useRouter } from 'blitz';

import { Container } from '../../../core/components/container';
import { TrussFileInput } from '../../../trussworks/truss-form/truss-file-input';
import { TrussForm } from '../../../trussworks/truss-form/truss-form';
import { TrussTextInput } from '../../../trussworks/truss-form/truss-text-input';
import { useUpsertTrustee } from '../../hooks/trustees/use-upsert-trustee';

interface UpsertTrusteeFormProperties {
  trusteeId?: string;
}

export const UpsertTrusteeForm = ({
  trusteeId,
}: UpsertTrusteeFormProperties): JSX.Element => {
  const router = useRouter();
  const isCreating = typeof trusteeId === 'undefined';

  const {
    formError,
    formState,
    fieldErrors,
    handleInputChange,
    handleSubmit,
    isLoading,
  } = useUpsertTrustee({ trusteeId });

  const PhoneNumberLabel = (): JSX.Element => {
    const formatted = formatPhoneNumber(formState.phoneNumber);

    if (typeof formatted === 'undefined') {
      return <div className="usa-label">Phone Number</div>;
    }

    return (
      <div className="usa-label">
        Phone Number {formatted} <Icon.Check />
      </div>
    );
  };

  const DutiesLabel = (): JSX.Element => {
    const dutiesArray = formState.duties.split(',').filter(duty => {
      return duty !== '' && duty !== ' ';
    });
    const total =
      dutiesArray.length === 1 && dutiesArray[0] === ''
        ? 0
        : dutiesArray.length;

    return (
      <>
        <div className="usa-label">Duties (comma separated)</div>
        <div className="usa-label" style={{ marginTop: '4px' }}>
          {total} total
        </div>
        <div className="usa-label" style={{ marginTop: '4px' }}>
          {formatList(dutiesArray)}
        </div>
      </>
    );
  };

  return (
    <Container>
      <TrussForm
        disabled={isLoading}
        errorMessage={formError}
        legend={`${isCreating ? 'Add New' : 'Update'} Trustee`}
        onSubmit={handleSubmit}
      >
        <TrussTextInput
          required
          errorMessages={fieldErrors?.firstName}
          label="First Name"
          name="firstName"
          value={formState.firstName}
          onChange={handleInputChange}
        />
        <TrussTextInput
          required
          errorMessages={fieldErrors?.lastName}
          label="Last Name"
          name="lastName"
          value={formState.lastName}
          onChange={handleInputChange}
        />
        <TrussTextInput
          required
          errorMessages={fieldErrors?.phoneNumber}
          inputProperties={{ placeholder: '(555) 555-5555' }}
          label={<PhoneNumberLabel />}
          name="phoneNumber"
          value={formState.phoneNumber}
          onChange={handleInputChange}
        />
        <TrussTextInput
          required
          errorMessages={fieldErrors?.duties}
          inputProperties={{ placeholder: 'Duty 1, Duty 2, Duty 3' }}
          label={<DutiesLabel />}
          name="duties"
          value={formState.duties}
          onChange={handleInputChange}
        />
        <TrussFileInput
          errorMessages={fieldErrors?.image}
          label={isCreating ? 'Picture' : 'New Picture (if replacing)'}
          name="image"
          required={isCreating}
          onChange={handleInputChange}
        />
        <ButtonGroup>
          <Button type="submit">
            {typeof trusteeId === 'undefined' ? 'Create' : 'Update'}
          </Button>
          <Button
            className="bg-accent-cool-dark"
            type="button"
            onClick={async (): Promise<void> => {
              await router.push('/dashboard/trustees');
            }}
          >
            Go Back
          </Button>
        </ButtonGroup>
      </TrussForm>
    </Container>
  );
};
