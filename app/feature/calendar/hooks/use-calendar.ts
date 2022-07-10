import { dayStartEnd } from '@ethang/utilities';
import { ModalRef } from '@trussworks/react-uswds';
import { useMutation } from 'blitz';
import { endOfWeek, startOfWeek } from 'date-fns';
import {
  Dispatch,
  RefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { View, ViewsProps } from 'react-big-calendar';

import getCalendarEvents from '../mutations/get-calendar-events';

type RangeDate = Date[] | { end: Date; start: Date };

type UseCalendarReturn = {
  events: CalendarEvent[];
  handleRangeChange: (range: RangeDate) => void;
  handleSelectEvent: (event: CalendarEvent) => void;
  selectedEvent: CalendarEvent | undefined;
  selectedEventRef: RefObject<ModalRef>;
  setView: Dispatch<SetStateAction<View>>;
  view: View;
  views: ViewsProps;
};

export type CalendarEvent = {
  description: string;
  end: Date;
  start: Date;
  title: string;
};

const today = new Date();
const defaultViews: ViewsProps = ['month', 'week', 'day', 'agenda'];
const mobileViews: ViewsProps = ['day', 'agenda'];

export const useCalendar = (): UseCalendarReturn => {
  const selectedEventRef = useRef() as RefObject<ModalRef>;

  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [views, setViews] = useState<ViewsProps>(defaultViews);
  const [view, setView] = useState<View>('week');

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

  const handleViewChange = useCallback(
    (newView: View = view): void => {
      if (innerWidth <= 768) {
        if (!mobileViews.includes(newView)) {
          setView('day');
        }

        setViews(mobileViews);
      } else {
        setView(newView);
        setViews(defaultViews);
      }
    },
    [view]
  );

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

  useEffect(() => {
    addEventListener('resize', () => {
      handleViewChange();
    });

    return (): void => {
      removeEventListener('resize', () => {
        handleViewChange();
      });
    };
  }, [handleViewChange]);

  useEffect(() => {
    handleViewChange();
  }, [handleViewChange]);

  return {
    events,
    handleRangeChange,
    handleSelectEvent,
    selectedEvent,
    selectedEventRef,
    setView,
    view,
    views,
  };
};
