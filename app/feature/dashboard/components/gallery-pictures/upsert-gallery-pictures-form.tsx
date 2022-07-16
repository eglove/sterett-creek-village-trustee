import { Button, ButtonGroup } from '@trussworks/react-uswds';
import { useRouter } from 'blitz';

import { Container } from '../../../core/components/container';
import { TrussFileInput } from '../../../trussworks/truss-form/truss-file-input';
import { TrussForm } from '../../../trussworks/truss-form/truss-form';
import { TrussTextInput } from '../../../trussworks/truss-form/truss-text-input';
import {
  UpsertGalleryPicturesProperties,
  useUpsertGalleryPictures,
} from '../../hooks/gallery-pictures/use-upsert-gallery-pictures';

export const UpsertGalleryPicturesForm = ({
  galleryPictureId,
}: UpsertGalleryPicturesProperties): JSX.Element => {
  const router = useRouter();

  const {
    formState,
    handleSubmit,
    handleInputChange,
    isLoading,
    fieldErrors,
    formError,
  } = useUpsertGalleryPictures({ galleryPictureId });

  return (
    <Container>
      <TrussForm
        disabled={isLoading}
        errorMessage={formError}
        legend={`${
          typeof galleryPictureId === 'undefined' ? 'Add' : 'Update'
        } Gallery Picture`}
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
        {typeof galleryPictureId === 'undefined' && (
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
            {typeof galleryPictureId === 'undefined' ? 'Create' : 'Update'}
          </Button>
          <Button
            className="bg-accent-cool-dark"
            type="button"
            onClick={async (): Promise<void> => {
              await router.push('/dashboard/gallery-pictures');
            }}
          >
            Go Back
          </Button>
        </ButtonGroup>
      </TrussForm>
    </Container>
  );
};
