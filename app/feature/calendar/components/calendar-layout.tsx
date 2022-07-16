import 'react-big-calendar/lib/css/react-big-calendar.css';

import {
  Modal,
  ModalFooter,
  ModalHeading,
  ModalToggleButton,
} from '@trussworks/react-uswds';
import { format, getDay, parse, startOfWeek } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';

import { Container } from '../../core/components/container';
import { useCalendar } from '../hooks/use-calendar';

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

export const CalendarLayout = (): JSX.Element | null => {
  const {
    events,
    handleRangeChange,
    handleSelectEvent,
    selectedEvent,
    selectedEventRef,
    setView,
    view,
    views,
  } = useCalendar();

  if (typeof window === 'undefined') {
    return null;
  }

  return (
    <Container>
      <Calendar
        selectable
        defaultView="week"
        endAccessor="end"
        events={events}
        localizer={localizer}
        startAccessor="start"
        style={{ height: window.innerHeight - 200, width: '80%' }}
        view={view}
        views={views}
        onRangeChange={handleRangeChange}
        onSelectEvent={handleSelectEvent}
        onView={setView}
      />
      <Modal id="selectedEvent" ref={selectedEventRef}>
        <ModalHeading>{selectedEvent?.title}</ModalHeading>
        <div className="usa-prose">
          <p>Starts: {selectedEvent?.start.toLocaleString()}</p>
          <p>Ends: {selectedEvent?.end.toLocaleString()}</p>
          <p>{selectedEvent?.description}</p>
        </div>
        <ModalFooter>
          <ModalToggleButton closer modalRef={selectedEventRef}>
            Go Back
          </ModalToggleButton>
        </ModalFooter>
      </Modal>
    </Container>
  );
};
