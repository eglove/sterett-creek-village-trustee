import { Button, ButtonGroup } from '@trussworks/react-uswds';
import { useRouter } from 'blitz';

import utilityStyles from '../../../../styles/util.module.css';
import { TrussFileInput } from '../../../trussworks/truss-form/truss-file-input';
import { TrussForm } from '../../../trussworks/truss-form/truss-form';
import { TrussTextInput } from '../../../trussworks/truss-form/truss-text-input';
import {
  UpsertHomeImagesProperties,
  useUpsertHomeImages,
} from '../../hooks/home-images/use-upsert-home-images';

export const UpsertHomeImagesForm = ({
  homeImageId,
}: UpsertHomeImagesProperties): JSX.Element => {
  const router = useRouter();

  const {
    formState,
    handleSubmit,
    handleInputChange,
    isLoading,
    fieldErrors,
    formError,
  } = useUpsertHomeImages({ homeImageId });

  return (
    <div className={utilityStyles.CenterOnPage}>
      <TrussForm
        disabled={isLoading}
        errorMessage={formError}
        legend={`${
          typeof homeImageId === 'undefined' ? 'Create' : 'Update'
        } Home Image`}
        onSubmit={handleSubmit}
      >
        <TrussTextInput
          required
          errorMessages={fieldErrors?.description}
          label="Description"
          name="description"
          value={formState.description}
          onChange={handleInputChange}
        />
        {typeof homeImageId === 'undefined' && (
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
            {typeof homeImageId === 'undefined' ? 'Create' : 'Update'}
          </Button>
          <Button
            className="bg-accent-cool-dark"
            type="button"
            onClick={async (): Promise<void> => {
              await router.push('/dashboard/home-images');
            }}
          >
            Go Back
          </Button>
        </ButtonGroup>
      </TrussForm>
    </div>
  );
};
