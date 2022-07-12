import { Button, ButtonGroup } from '@trussworks/react-uswds';
import { useRouter } from 'blitz';

import utilityStyles from '../../../styles/util.module.css';

export const DashboardLayout = (): JSX.Element => {
  const router = useRouter();

  return (
    <div className={utilityStyles.CenterOnPage}>
      <h2>Admin Dashboard</h2>
      <ButtonGroup>
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
    </div>
  );
};
