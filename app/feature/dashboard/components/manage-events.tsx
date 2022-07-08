import { Button } from '@trussworks/react-uswds';
import { useRouter } from 'blitz';

import utilityStyles from '../../../styles/util.module.css';

export const ManageEvents = (): JSX.Element => {
  const router = useRouter();

  return (
    <div className={utilityStyles.CenterOnPage}>
      <Button
        type="button"
        onClick={async (): Promise<void> => {
          await router.push('/dashboard/events/create');
        }}
      >
        Create New Event
      </Button>
    </div>
  );
};
