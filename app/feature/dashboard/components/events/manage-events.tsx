import { Button, ButtonGroup } from '@trussworks/react-uswds';
import { useRouter } from 'blitz';

import { Container } from '../../../core/components/container';
import { Pagination } from '../../../util/pagination/components/pagination';
import {
  EVENTS_PAGE_SIZE,
  useManageEvents,
} from '../../hooks/events/use-manage-events';
import styles from '../../styles/dashboard.module.css';

export const ManageEvents = (): JSX.Element => {
  const router = useRouter();

  const {
    events,
    count,
    setSkip,
    skip,
    handleDeleteEvent,
    handleNavigateToUpsert,
  } = useManageEvents();

  return (
    <Container>
      <ButtonGroup>
        <Button
          type="button"
          onClick={async (): Promise<void> => {
            await handleNavigateToUpsert();
          }}
        >
          Create New Event
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
      <div style={{ marginBottom: '32px' }} />
      <>
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
                    await handleNavigateToUpsert(event.id);
                  }}
                >
                  Update
                </Button>
                <Button
                  className="bg-error"
                  type="button"
                  onClick={async (): Promise<void> => {
                    await handleDeleteEvent(event.id);
                  }}
                >
                  Delete
                </Button>
              </ButtonGroup>
              <hr />
            </div>
          );
        })}
      </>
      <div style={{ marginTop: '32px' }} />
      <Pagination
        pageLength={EVENTS_PAGE_SIZE}
        setSkip={setSkip}
        skip={skip}
        totalCount={count}
      />
    </Container>
  );
};
