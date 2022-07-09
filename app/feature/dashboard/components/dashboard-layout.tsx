import { Button, ButtonGroup } from '@trussworks/react-uswds';
import { useRouter } from 'blitz';

import utilityStyles from '../../../styles/util.module.css';

export const DashboardLayout = (): JSX.Element => {
  const router = useRouter();

  return (
    <div className={utilityStyles.CenterOnPage}>
      <ButtonGroup>
        <Button
          type="button"
          onClick={async (): Promise<void> => {
            await router.push('/dashboard/events');
          }}
        >
          Manage Events
        </Button>
        <Button
          type="button"
          onClick={async (): Promise<void> => {
            await router.push('/dashboard/covenants');
          }}
        >
          Manage Covenants
        </Button>
      </ButtonGroup>
    </div>
  );
};
