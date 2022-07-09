import { dayStartEnd } from '@ethang/utilities';
import { ModalRef } from '@trussworks/react-uswds';
import { useMutation } from 'blitz';
import { endOfWeek, startOfWeek } from 'date-fns';
import { RefObject, useEffect, useRef, useState } from 'react';

import getCalendarEvents from '../mutations/get-calendar-events';

type RangeDate = Date[] | { end: Date; start: Date };

type UseCalendarReturn = {
  events: CalendarEvent[];
  handleRangeChange: (range: RangeDate) => void;
  handleSelectEvent: (event: CalendarEvent) => void;
  selectedEvent: CalendarEvent | undefined;
  selectedEventRef: RefObject<ModalRef>;
};

type CalendarEvent = {
  description: string;
  end: Date;
  start: Date;
  title: string;
};

const today = new Date();

export const useCalendar = (): UseCalendarReturn => {
  const selectedEventRef = useRef() as RefObject<ModalRef>;

  const [events, setEvents] = useState<CalendarEvent[]>([]);

  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent>();

  const handleRangeChange = async (range: RangeDate): Promise<void> => {
    let rangeEnd = new Date();
    let rangeStart = new Date();

    if (Array.isArray(range)) {
      const endDate = range[range.length - 1];
      const startDate = range[0];

      if (typeof endDate !== 'undefined') {
        rangeEnd = dayStartEnd(endDate, 'end');
      }

      if (typeof startDate !== 'undefined') {
        rangeStart = dayStartEnd(startDate, 'start');
      }
    } else {
      rangeEnd = dayStartEnd(range.end, 'end');
      rangeStart = dayStartEnd(range.start, 'start');
    }

    await getCalendarEventsMutation(
      {
        from: rangeStart,
        to: rangeEnd,
      },
      {
        onSuccess(data) {
          setEvents(
            data.map(event => {
              return {
                description: event.description,
                end: event.endsAt,
                start: event.startsAt,
                title: event.title,
              };
            })
          );
        },
      }
    );
  };

  const handleSelectEvent = (event: CalendarEvent): void => {
    setSelectedEvent(event);
    selectedEventRef.current?.toggleModal();
  };

  const [getCalendarEventsMutation] = useMutation(getCalendarEvents);

  useEffect(() => {
    handleRangeChange({
      end: endOfWeek(today),
      start: startOfWeek(today),
    }).catch(() => {
      //
    });

    // React big calendar throws an error if you set state inside of range change
    // So instead of creating useState variables for end and start, then resetting them onChange, and calling a QUERY
    // we have to call a MUTATION on initial load, and then on every change after
    // This is not a proper use of useEffect, but we need to make a call for initial data
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    events,
    handleRangeChange,
    handleSelectEvent,
    selectedEvent,
    selectedEventRef,
  };
};
