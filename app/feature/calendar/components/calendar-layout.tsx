import 'react-big-calendar/lib/css/react-big-calendar.css';

import { format, getDay, parse, startOfWeek } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';

import utilStyles from '../../../styles/util.module.css';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  getDay,
  locales,
  parse,
  startOfWeek,
});

export const CalendarLayout = (): JSX.Element => {
  return (
    <div className={utilStyles.CenterOnPage}>
      <Calendar
        endAccessor="end"
        events={[]}
        localizer={localizer}
        startAccessor="start"
        style={{ height: window.innerHeight - 200, width: '80%' }}
      />
    </div>
  );
};
