import utilityStyles from '../../../styles/util.module.css';
import coreStyles from '../../core/styles/styles.module.css';
import { TrussLink } from '../../trussworks/truss-link/truss-link';
import { Pagination } from '../../util/pagination/components/pagination';
import {
  MEETING_MINUTES_LAYOUT_SIZE,
  useMeetingMinutesLayout,
} from '../hooks/use-meeting-minutes-layout';

export const MeetingMinutesLayout = (): JSX.Element => {
  const { meetingMinutes, skip, setSkip, count } = useMeetingMinutesLayout();

  if (count === 0) {
    return (
      <div className={utilityStyles.CenterOnPage}>
        There&apos;s nothing here yet. Check back later.
      </div>
    );
  }

  return (
    <div className={utilityStyles.CenterOnPage}>
      <div className={coreStyles.FileLinkContainer}>
        {meetingMinutes.map(meetingMinute => {
          return (
            <TrussLink newTab href={meetingMinute.url} key={meetingMinute.url}>
              {meetingMinute.title}
            </TrussLink>
          );
        })}
      </div>
      <Pagination
        pageLength={MEETING_MINUTES_LAYOUT_SIZE}
        setSkip={setSkip}
        skip={skip}
        totalCount={count}
      />
    </div>
  );
};
