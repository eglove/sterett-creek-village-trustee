import { Button, ButtonGroup } from '@trussworks/react-uswds';
import { Image, useRouter } from 'blitz';

import utilityStyles from '../../../../styles/util.module.css';
import { Pagination } from '../../../util/pagination/components/pagination';
import {
  GALLERY_PICTURE_DASHBOARD_PAGE_SIZE,
  useManageGalleryPictures,
} from '../../hooks/gallery-pictures/use-manage-gallery-pictures';

export const ManageGalleryPictures = (): JSX.Element => {
  const router = useRouter();

  const {
    handleDeleteGalleryPicture,
    handleNavigateToUpsert,
    galleryPictures,
    setSkip,
    skip,
    count,
  } = useManageGalleryPictures();

  return (
    <div className={utilityStyles.CenterOnPage}>
      <ButtonGroup>
        <Button
          type="button"
          onClick={async (): Promise<void> => {
            await handleNavigateToUpsert();
          }}
        >
          Add New Gallery Picture
        </Button>
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
      <div style={{ margin: '32px 0' }}>
        {galleryPictures.map(image => {
          return (
            <div key={image.id}>
              <div
                style={{
                  height: '200px',
                  position: 'relative',
                  width: '200px',
                }}
              >
                <Image
                  alt={image.description}
                  layout="fill"
                  objectFit="contain"
                  src={image.url}
                />
              </div>
              <ButtonGroup>
                <Button
                  className="bg-accent-warm"
                  type="button"
                  onClick={async (): Promise<void> => {
                    await handleNavigateToUpsert(image.id);
                  }}
                >
                  Update
                </Button>
                <Button
                  className="bg-error"
                  type="button"
                  onClick={async (): Promise<void> => {
                    await handleDeleteGalleryPicture(image.id);
                  }}
                >
                  Delete
                </Button>
              </ButtonGroup>
            </div>
          );
        })}
      </div>
      <Pagination
        pageLength={GALLERY_PICTURE_DASHBOARD_PAGE_SIZE}
        setSkip={setSkip}
        skip={skip}
        totalCount={count}
      />
    </div>
  );
};
