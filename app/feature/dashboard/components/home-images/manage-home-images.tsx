import { Button, ButtonGroup } from '@trussworks/react-uswds';
import { Image, useRouter } from 'blitz';

import utilityStyles from '../../../../styles/util.module.css';
import { Pagination } from '../../../util/pagination/components/pagination';
import {
  HOME_IMAGE_DASHBOARD_PAGE_SIZE,
  useManageHomeImages,
} from '../../hooks/home-images/use-manage-home-images';

export const ManageHomeImages = (): JSX.Element => {
  const router = useRouter();

  const {
    handleDeleteHomeImage,
    handleNavigateToUpsert,
    homeImages,
    setSkip,
    skip,
    count,
  } = useManageHomeImages();

  return (
    <div className={utilityStyles.CenterOnPage}>
      <ButtonGroup>
        <Button
          type="button"
          onClick={async (): Promise<void> => {
            await handleNavigateToUpsert();
          }}
        >
          Add New Home Image
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
      <div>
        {homeImages.map(image => {
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
                    await handleDeleteHomeImage(image.id);
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
        pageLength={HOME_IMAGE_DASHBOARD_PAGE_SIZE}
        setSkip={setSkip}
        skip={skip}
        totalCount={count}
      />
    </div>
  );
};
