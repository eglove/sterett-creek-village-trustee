import { formatList, formatPhoneNumber } from '@ethang/utilities';
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardGroup,
  CardHeader,
  CardMedia,
  Icon,
} from '@trussworks/react-uswds';
import { useRouter } from 'blitz';
import { Image } from 'next/image';

import utilityStyles from '../../../../styles/util.module.css';
import { useManageTrustees } from '../../hooks/trustees/use-manage-trustees';

export const ManageTrustees = (): JSX.Element => {
  const router = useRouter();

  const {
    trustees,
    handleDeleteTrustee,
    handleNavigateToUpsert,
    handleUpdateTrustee,
    isLoading,
  } = useManageTrustees();

  return (
    <div className={utilityStyles.CenterOnPage}>
      <ButtonGroup>
        <Button
          type="button"
          onClick={async (): Promise<void> => {
            await handleNavigateToUpsert();
          }}
        >
          Add New Trustee
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
      <CardGroup>
        {trustees.map(trustee => {
          return (
            <div key={trustee.id}>
              <Card layout="standardDefault">
                <CardHeader>
                  {trustee.firstName} {trustee.lastName}
                </CardHeader>
                <CardMedia style={{ width: '300px' }}>
                  <Image
                    alt={trustee.image.description}
                    height={trustee.image.height}
                    layout="responsive"
                    src={trustee.image.url}
                    width={trustee.image.width}
                  />
                </CardMedia>
                <CardBody>{formatPhoneNumber(trustee.phoneNumber)}</CardBody>
                <CardBody>{formatList(trustee.duties)}</CardBody>
                <CardFooter>
                  <ButtonGroup>
                    <Button
                      className="bg-accent-warm"
                      type="button"
                      onClick={async (): Promise<void> => {
                        await handleNavigateToUpsert(trustee.id);
                      }}
                    >
                      Update
                    </Button>
                    <Button
                      className="bg-error"
                      disabled={isLoading}
                      type="button"
                      onClick={async (): Promise<void> => {
                        await handleDeleteTrustee(trustee.id);
                      }}
                    >
                      Delete
                    </Button>
                    <Button
                      disabled={isLoading || trustee.order < 1}
                      style={{ padding: '8px 8px' }}
                      type="button"
                      onClick={async (): Promise<void> => {
                        await handleUpdateTrustee(trustee.id, 'down');
                      }}
                    >
                      <Icon.ArrowBack />
                    </Button>
                    <Button
                      style={{ padding: '8px 8px' }}
                      type="button"
                      disabled={
                        isLoading ||
                        trustee.order === trustees?.[trustees.length - 1]?.order
                      }
                      onClick={async (): Promise<void> => {
                        await handleUpdateTrustee(trustee.id, 'up');
                      }}
                    >
                      <Icon.ArrowForward />
                    </Button>
                  </ButtonGroup>
                </CardFooter>
              </Card>
            </div>
          );
        })}
      </CardGroup>
    </div>
  );
};
