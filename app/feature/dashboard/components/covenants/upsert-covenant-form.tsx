import { Button, ButtonGroup } from '@trussworks/react-uswds';
import { useRouter } from 'blitz';

import { Container } from '../../../core/components/container';
import { TrussFileInput } from '../../../trussworks/truss-form/truss-file-input';
import { TrussForm } from '../../../trussworks/truss-form/truss-form';
import { TrussTextInput } from '../../../trussworks/truss-form/truss-text-input';
import {
  UpdateCovenantProperties,
  useUpsertCovenant,
} from '../../hooks/covenants/use-upsert-covenant';

export const UpsertCovenantForm = (
  updateProperties: UpdateCovenantProperties
): JSX.Element => {
  const router = useRouter();

  const {
    formState,
    handleInputChange,
    handleSubmit,
    fieldErrors,
    formError,
    isLoading,
  } = useUpsertCovenant(updateProperties);

  return (
    <Container>
      <TrussForm
        disabled={isLoading}
        errorMessage={formError}
        legend={`${
          typeof updateProperties.covenantId === 'undefined'
            ? 'Create'
            : 'Update'
        } Covenant`}
        onSubmit={handleSubmit}
      >
        <TrussTextInput
          required
          errorMessages={fieldErrors?.title}
          label="Title"
          name="title"
          value={formState.title}
          onChange={handleInputChange}
        />
        {typeof updateProperties.covenantId === 'undefined' && (
          <TrussFileInput
            required
            errorMessages={fieldErrors?.file}
            label="File"
            name="file"
            onChange={handleInputChange}
          />
        )}
        <ButtonGroup>
          <Button type="submit">
            {typeof updateProperties.covenantId === 'undefined'
              ? 'Create'
              : 'Update'}
          </Button>
          <Button
            className="bg-accent-cool-dark"
            type="button"
            onClick={async (): Promise<void> => {
              await router.push('/dashboard/covenants');
            }}
          >
            Go Back
          </Button>
        </ButtonGroup>
      </TrussForm>
    </Container>
  );
};
