import { useForm } from '@ethang/react';
import { Button, ButtonGroup } from '@trussworks/react-uswds';
import { useMutation, useQuery, useRouter } from 'blitz';
import { Image } from 'next/image';
import { ZodError } from 'zod';

import getHomeContent from '../../../../queries/get-home-content';
import { getZodFieldErrors } from '../../../../util/zod';
import { Container } from '../../../core/components/container';
import { TrussFileInput } from '../../../trussworks/truss-form/truss-file-input';
import { TrussForm } from '../../../trussworks/truss-form/truss-form';
import { TrussTextArea } from '../../../trussworks/truss-form/truss-text-area';
import { cloudinaryUpload } from '../../../util/cloudinary-upload';
import updateHomePage from '../../mutations/home/update-home-page';

export const ManageHome = (): JSX.Element => {
  const router = useRouter();

  const [currentContent] = useQuery(getHomeContent, undefined, {
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
  const [updateHomePageMutation, { isLoading }] = useMutation(updateHomePage);

  const initialState = {
    homeImage: undefined as File | undefined,
    missionStatement: currentContent?.content,
  };

  const handleUpdateHomePageErrors = (error: unknown): void => {
    if (error instanceof ZodError) {
      setFieldErrors(getZodFieldErrors(error, formState));
    }
  };

  const handleUpdateHomePage = async (): Promise<void> => {
    if (typeof formState.homeImage === 'undefined') {
      await updateHomePageMutation({
        description: formState.missionStatement,
        missionStatement: formState.missionStatement,
      });

      await router.push('/');
    } else {
      const image = await cloudinaryUpload(formState.homeImage, 'MAIN_IMAGE');

      await updateHomePageMutation({
        cloudinaryId: image.public_id,
        description: formState.missionStatement,
        height: image.height,
        missionStatement: formState.missionStatement,
        url: image.secure_url,
        width: image.width,
      });

      await router.push('/');
    }
  };

  const {
    fieldErrors,
    handleInputChange,
    handleSubmit,
    formError,
    formState,
    setFieldErrors,
  } = useForm(initialState, {
    onError: handleUpdateHomePageErrors,
    onSubmit: handleUpdateHomePage,
  });

  return (
    <Container>
      <TrussForm
        disabled={isLoading}
        errorMessage={formError}
        legend="Home Page"
        onSubmit={handleSubmit}
      >
        {currentContent !== null && (
          <div style={{ height: '300px', position: 'relative', width: '100%' }}>
            <Image
              alt={currentContent.image.description}
              layout="fill"
              objectFit="contain"
              src={currentContent.image.url}
            />
          </div>
        )}
        <TrussFileInput
          errorMessages={fieldErrors?.homeImage}
          label="New Image (If Updating)"
          name="homeImage"
          onChange={handleInputChange}
        />

        <TrussTextArea
          errorMessages={fieldErrors?.missionStatement}
          label="Mission Statement"
          name="missionStatement"
          value={formState.missionStatement}
          onChange={handleInputChange}
        />
        <ButtonGroup>
          <Button type="submit">Update</Button>
          <Button
            className="bg-accent-cool-dark"
            type="button"
            onClick={async (): Promise<void> => {
              await router.push('/dashboard');
            }}
          >
            Go Back
          </Button>
        </ButtonGroup>
      </TrussForm>
    </Container>
  );
};
