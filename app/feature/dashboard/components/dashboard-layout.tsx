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
            await router.push('/dashboard/styles-images');
          }}
        >
          Home Images
        </Button>
        <Button
          type="button"
          onClick={async (): Promise<void> => {
            await router.push('/dashboard/events');
          }}
        >
          Events
        </Button>
        <Button
          type="button"
          onClick={async (): Promise<void> => {
            await router.push('/dashboard/covenants');
          }}
        >
          Covenants
        </Button>
      </ButtonGroup>
    </div>
  );
};
