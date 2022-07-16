import {
  Button,
  ButtonGroup,
  Card,
  CardFooter,
  CardGroup,
  Icon,
} from '@trussworks/react-uswds';
import { useRouter } from 'blitz';

import { Container } from '../../../core/components/container';
import { TrusteeCard } from '../../../trustees/components/trustee-card';
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
    <Container>
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
                <TrusteeCard trustee={trustee} />
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
    </Container>
  );
};
