import { Button, ButtonGroup } from '@trussworks/react-uswds';
import { useRouter } from 'blitz';

import { Container } from '../../core/components/container';

export const DashboardLayout = (): JSX.Element => {
  const router = useRouter();

  return (
    <Container>
      <h2>Admin Dashboard</h2>
      <ButtonGroup>
        <Button
          type="button"
          onClick={async (): Promise<void> => {
            await router.push('/dashboard/home');
          }}
        >
          Home
        </Button>
        <Button
          type="button"
          onClick={async (): Promise<void> => {
            await router.push('/dashboard/events');
          }}
        >
          Calendar Events
        </Button>
        <Button
          type="button"
          onClick={async (): Promise<void> => {
            await router.push('/dashboard/covenants');
          }}
        >
          Covenants
        </Button>
        <Button
          type="button"
          onClick={async (): Promise<void> => {
            await router.push('/dashboard/meeting-minutes');
          }}
        >
          Meeting Minutes
        </Button>
        <Button
          type="button"
          onClick={async (): Promise<void> => {
            await router.push('/dashboard/gallery-pictures');
          }}
        >
          Gallery Pictures
        </Button>
        <Button
          type="button"
          onClick={async (): Promise<void> => {
            await router.push('/dashboard/trustees');
          }}
        >
          Trustees
        </Button>
      </ButtonGroup>
    </Container>
  );
};
