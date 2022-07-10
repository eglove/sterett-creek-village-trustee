import { Button, ButtonGroup } from '@trussworks/react-uswds';
import { useRouter } from 'blitz';

import utilityStyles from '../../../../styles/util.module.css';
import coreStyles from '../../../core/styles/styles.module.css';
import { TrussLink } from '../../../trussworks/truss-link/truss-link';
import { Pagination } from '../../../util/pagination/components/pagination';
import {
  MEETING_MINUTES_DASHBOARD_PAGE_SIZE,
  useManageMeetingMinutes,
} from '../../hooks/meeting-minutes/use-manage-meeting-minutes';
import styles from '../../styles/dashboard.module.css';

export const ManageMeetingMinutes = (): JSX.Element => {
  const router = useRouter();

  const {
    handleDeleteMeetingMinute,
    handleNavigateToUpsert,
    isLoading,
    meetingMinutes,
    setSkip,
    skip,
    count,
  } = useManageMeetingMinutes();

  return (
    <div className={utilityStyles.CenterOnPage}>
      <ButtonGroup>
        <Button
          type="button"
          onClick={async (): Promise<void> => {
            await handleNavigateToUpsert();
          }}
        >
          Add New Meeting Minutes
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
      <div className={coreStyles.FileLinkContainer}>
        {meetingMinutes.map(meetingMinute => {
          return (
            <div
              className={styles.DashboardFileLinkActions}
              key={meetingMinute.id}
            >
              <TrussLink newTab href={meetingMinute.url}>
                {meetingMinute.title}
              </TrussLink>
              <ButtonGroup>
                <Button
                  className="bg-accent-warm"
                  type="button"
                  onClick={async (): Promise<void> => {
                    await handleNavigateToUpsert(meetingMinute.id);
                  }}
                >
                  Update
                </Button>
                <Button
                  className="bg-error"
                  disabled={isLoading}
                  type="button"
                  onClick={async (): Promise<void> => {
                    await handleDeleteMeetingMinute(meetingMinute.id);
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
        pageLength={MEETING_MINUTES_DASHBOARD_PAGE_SIZE}
        setSkip={setSkip}
        skip={skip}
        totalCount={count}
      />
    </div>
  );
};
