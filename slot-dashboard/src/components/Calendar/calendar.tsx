import React from "react";
import './calendar.css'
import { Scheduler } from "@aldabil/react-scheduler";

interface CalendarProps {}

interface EventData {
    event_id: number;
    title: string;
    start: Date;
    end: Date;
  }

export const Calendar: React.FC<CalendarProps> = () => {
  const events: EventData[] = [
    {
      event_id: 1,
      title: "Event 1",
      start: new Date("2021/5/2 09:30"),
      end: new Date("2021/5/2 10:30"),
    },
    {
      event_id: 2,
      title: "Event 2",
      start: new Date("2021/5/4 10:00"),
      end: new Date("2021/5/4 11:00"),
    },
  ];

  return (
    <div className="calendar-container">
      <Scheduler view="month" events={events} />
    </div>
  );
};
