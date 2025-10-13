// pages/CalendarPage.tsx
import { useEffect, useMemo, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import type { EventInput, EventClickArg, EventChangeArg, DateSelectArg } from '@fullcalendar/core';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  fetchClientEvents,
  fetchTrainerEvents,
  createCalendarEvent,
  updateCalendarEvent,
  deleteCalendarEvent,
  setSelectedClient,
  setViewRole,
} from '@/features/calendar/calendarSlice';
import EventModal from '@/components/Client/EventModal';

export default function CalendarPage() {
  const dispatch = useAppDispatch();
  const { events, selectedClientId, viewRole } = useAppSelector((state) => state.calendar);
  const { user } = useAppSelector((state) => state.auth);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    if (!user) return;
    if (viewRole === 'client' && user.role === 'client' && user.id) {
      dispatch(fetchClientEvents(user.id));
    }
    if (viewRole === 'trainer' && user.role === 'trainer' && user.id) {
      dispatch(fetchTrainerEvents(user.id));
    }
    // org-case: добавить свой thunk при необходимости
  }, [dispatch, user, viewRole]);

  // Преобразуем стор-ивенты в EventInput[] c id: string
  const fcEvents: EventInput[] = useMemo(
    () =>
      events.map((ev) => ({
        id: String(ev.id),
        title: ev.title,
        start: ev.start,
        end: ev.end,
        editable: ev.editable,
        color:
          ev.type === 'exercise' ? '#34D399' :
            ev.type === 'workout'  ? '#60A5FA' :
              '#FBBF24',
        extendedProps: ev,
      })),
    [events]
  );

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    setSelectedDate(selectInfo.start); // start — Date
    setModalOpen(true);
  };

  const handleEventChange = async (changeInfo: EventChangeArg) => {
    const { id } = changeInfo.event;
    const evtStart = changeInfo.event.start;              // Date | null
    const evtEnd = changeInfo.event.end ?? evtStart;      // Date | null

    // Гарантируем string, чтобы не было TS2322
    if (!evtStart) return; // без стартовой даты обновлять нечего
    await dispatch(updateCalendarEvent({
      id,                                                 // string
      start: evtStart.toISOString(),                      // string
      end: (evtEnd ?? evtStart).toISOString(),            // string
    }));
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    const { event } = clickInfo;
    const editable = (event.extendedProps as any)?.editable ?? false;
    if (editable && window.confirm(`Delete event '${event.title}'?`)) {
      dispatch(deleteCalendarEvent(event.id)); // event.id: string
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center mb-4 space-x-4">
        <select
          value={viewRole}
          onChange={(e) => dispatch(setViewRole(e.target.value as any))}
          className="border rounded px-3 py-1"
        >
          {user?.role === 'client' && <option value="client">My Calendar</option>}
          {user?.role === 'trainer' && (
            <>
              <option value="trainer">Clients</option>
              <option value="client">My Tasks</option>
            </>
          )}
          {user?.role === 'organization' && <option value="organization">Organization</option>}
        </select>

        {viewRole !== 'client' && (
          <select
            value={selectedClientId ?? ''}
            onChange={(e) =>
              dispatch(setSelectedClient(e.target.value ? Number(e.target.value) : null))
            }
            className="border rounded px-3 py-1"
          >
            <option value="">Select Client</option>
            {/* Сюда список клиентов */}
          </select>
        )}
      </div>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{ left: 'prev,next today', center: 'title', right: 'dayGridMonth,timeGridWeek,timeGridDay' }}
        initialView="timeGridWeek"
        selectable
        selectMirror
        editable
        dayMaxEvents
        select={handleDateSelect}
        eventChange={handleEventChange}
        eventClick={handleEventClick}
        events={fcEvents}
      />

      {modalOpen && selectedDate && (
        <EventModal
          date={selectedDate}
          onClose={() => setModalOpen(false)}
          onSave={async (type, referenceId, start, end) => {
            const clientId = viewRole === 'client' ? user!.id : selectedClientId!;
            await dispatch(createCalendarEvent({ clientId, type, referenceId, start, end }));
            setModalOpen(false);
          }}
        />
      )}
    </div>
  );
}

