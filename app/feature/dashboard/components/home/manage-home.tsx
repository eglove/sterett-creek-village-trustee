import { useForm } from '@ethang/react';
import { Editor } from '@tinymce/tinymce-react';
import { Button, ButtonGroup } from '@trussworks/react-uswds';
import { useMutation, useQuery, useRouter } from 'blitz';
import { Image } from 'next/image';
import { useRef } from 'react';
import { ZodError } from 'zod';

import getHomeContent from '../../../../queries/get-home-content';
import { getZodFieldErrors } from '../../../../util/zod';
import { Container } from '../../../core/components/container';
import { TrussFileInput } from '../../../trussworks/truss-form/truss-file-input';
import { TrussForm } from '../../../trussworks/truss-form/truss-form';
import { cloudinaryUpload } from '../../../util/cloudinary-upload';
import updateHomePage from '../../mutations/home/update-home-page';

export const ManageHome = (): JSX.Element => {
  const router = useRouter();

  const editorRef = useRef<Editor>(null);

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
    setFormState,
    setFieldErrors,
  } = useForm(initialState, {
    onError: handleUpdateHomePageErrors,
    onSubmit: handleUpdateHomePage,
  });

  return (
    <Container>
      <TrussForm
        largeForm
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
        <br />
        <Editor
          apiKey="zezuix487vq9qou8y1niv162mjpn2g4dym6g5k5nod591ujv"
          initialValue={currentContent?.content}
          ref={editorRef}
          init={{
            content_style:
              'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            height: 500,
            menubar: false,
            plugins: ['lists'],
            toolbar:
              'bold italic numlist bullist backcolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help',
          }}
          onEditorChange={(content): void => {
            setFormState(formState_ => {
              return {
                ...formState_,
                missionStatement: content,
              };
            });
          }}
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
