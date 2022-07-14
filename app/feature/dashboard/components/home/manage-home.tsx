import { useForm } from '@ethang/react';
import { Button, ButtonGroup } from '@trussworks/react-uswds';
import { useMutation, useQuery, useRouter } from 'blitz';
import { useS3Upload } from 'next-s3-upload';
import { ZodError } from 'zod';

import getHomeContent from '../../../../queries/get-home-content';
import utilityStyles from '../../../../styles/util.module.css';
import { getZodFieldErrors } from '../../../../util/zod';
import { TrussFileInput } from '../../../trussworks/truss-form/truss-file-input';
import { TrussForm } from '../../../trussworks/truss-form/truss-form';
import { TrussTextArea } from '../../../trussworks/truss-form/truss-text-area';
import updateHomePage from '../../mutations/home/update-home-page';

export const ManageHome = (): JSX.Element => {
  const { uploadToS3 } = useS3Upload();
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
    let uploaded: { bucket: string; key: string; url: string } | null = null;
    if (typeof formState.homeImage === 'undefined') {
      await updateHomePageMutation({
        description: formState.missionStatement,
        missionStatement: formState.missionStatement,
      });

      await router.push('/');
    } else {
      const image = new Image();
      uploaded = await uploadToS3(formState.homeImage);

      const fileUrl = URL.createObjectURL(formState.homeImage);
      image.onload = async (): Promise<void> => {
        URL.revokeObjectURL(image.src);

        await updateHomePageMutation({
          accessKey: uploaded?.key,
          description: formState.missionStatement,
          height: image.height,
          missionStatement: formState.missionStatement,
          url: uploaded?.url,
          width: image.width,
        });

        await router.push('/');
      };

      image.src = fileUrl;
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
    <div className={utilityStyles.CenterOnPage}>
      <TrussForm
        disabled={isLoading}
        errorMessage={formError}
        legend="Home Page"
        onSubmit={handleSubmit}
      >
        {currentContent !== null && (
          <div
            style={{ display: 'grid', placeItems: 'center', width: '300px' }}
          >
            <img
              alt={currentContent.image.description}
              src="https://sterett-creek-village-trustee-test.s3.us-east-2.amazonaws.com/next-s3-uploads/7b5532af-a21a-4165-a46a-3c3cb3145e5c/rs%253Dw_1240%252Ch_620%252Ccg_true.png"
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
        </ButtonGroup>
      </TrussForm>
    </div>
  );
};
