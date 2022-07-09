import { Button, ButtonGroup } from '@trussworks/react-uswds';
import { useRouter } from 'blitz';

import utilityStyles from '../../../styles/util.module.css';
import { Pagination } from '../../util/pagination/components/pagination';
import { PAGE_SIZE, useManageEvents } from '../hooks/use-manage-events';
import styles from '../styles/dashboard.module.css';

export const ManageEvents = (): JSX.Element => {
  const router = useRouter();

  const { events, count, setSkip, skip } = useManageEvents();

  const handleNavigateToUpdate = async (id: string): Promise<void> => {
    await router.push(`/dashboard/events/upsert?id=${id}`);
  };

  return (
    <div
      className={`${styles.EventContainer ?? ''} ${
        utilityStyles.CenterOnPage ?? ''
      }`}
    >
      <Button
        type="button"
        onClick={async (): Promise<void> => {
          await router.push('/dashboard/events/upsert');
        }}
      >
        Create New Event
      </Button>
      {events.map(event => {
        return (
          <div key={event.id}>
            <h2>{event.title}</h2>
            <div className={styles.EventTimes}>
              {event.startsAt.toLocaleString()} -{' '}
              {event.endsAt.toLocaleString()}
            </div>
            <p className="usa-prose" style={{ overflowWrap: 'anywhere' }}>
              {event.description}
            </p>
            <ButtonGroup>
              <Button
                className="bg-accent-warm"
                type="button"
                onClick={async (): Promise<void> => {
                  await handleNavigateToUpdate(event.id);
                }}
              >
                Update
              </Button>
              <Button className="bg-error" type="button">
                Delete
              </Button>
            </ButtonGroup>
            <hr />
          </div>
        );
      })}
      <Pagination
        pageLength={PAGE_SIZE}
        setSkip={setSkip}
        skip={skip}
        totalCount={count}
      />
    </div>
  );
};
