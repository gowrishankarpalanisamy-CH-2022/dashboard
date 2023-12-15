import React, { useState } from "react";
import './event.css';
import DownGreyArrow from './images/downarrow-grey.svg';
import Event2 from './images/event2.png';
import Event1 from './images/event1.png';

interface EventProps {
  EventSet: (event: any) => void;
  setBack: (back: string) => void;
  TriggerChangeSelection: (selection: string) => void;
}

interface EventData {
  eventName: string;
  eventDate: string;
  eventImage: string;
  eventPlace: string;
}

const Event: React.FC<EventProps> = (props) => {
  const [show, setShow] = useState(false);
  const [selectedOffice, setSelectedOffice] = useState('Rattha Tek Meadows,Chennai');

  const events: EventData[] = [
    { eventName: 'Soft Sills Training', eventDate: '14 July 2022, 03.00Pm - 05.00pm', eventImage: Event1, eventPlace: 'Rattha Tek Meadows,Chennai' },
    { eventName: 'Yoga Day', eventDate: '14 July 2022, 03.00Pm - 05.00pm', eventImage: Event2, eventPlace: 'Kanini, Bangalore' }
  ];

  const onEventClick = (event: EventData) => {
    props.EventSet(event);
    props.setBack('Events');
    props.TriggerChangeSelection('EventView');
  };

  const renderEventCard = (eventName: string, eventDate: string, eventImage: string, onClickHandler: () => void) => (
    <div className="meeting-card">
      <div className="meeting-card-image">
        <img src={eventImage} width="100%" height="100%" alt={`${eventName} Event`} />
      </div>
      <div className="meeting-card-content">
        <div className="content-card-header">
          <div className="event-name-card">
            <div>{eventName}</div>
            <div>{eventDate}</div>
          </div>
        </div>
        <div className='event-card-btn'>
          <span onClick={onClickHandler}>View event details</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="event-container">
      <div className="event-content-header">Events</div>
      <div className="event-content-selection">
        <div>{selectedOffice} <img alt="" src={DownGreyArrow} height="18" className="" onClick={() => setShow(true)} /></div>
        {show ?
          <div className="office-dropdown">
            <div className={selectedOffice === 'Rattha Tek Meadows,Chennai' ? "office-dropdown-active" : ''} onClick={() => { setSelectedOffice('Rattha Tek Meadows,Chennai'); setShow(false); }}>Rattha Tek Meadows,Chennai</div>
            <div className={selectedOffice === 'Kanini, Bangalore' ? "office-dropdown-active" : ''} onClick={() => { setSelectedOffice('Kanini, Bangalore'); setShow(false); }}>Kanini, Bangalore</div>
            <div className={selectedOffice === 'Futura, Pune' ? "office-dropdown-active" : ''} onClick={() => { setSelectedOffice('Futura, Pune'); setShow(false); }}>Futura, Pune</div>
            <div className={selectedOffice === 'Kanini, Coimbatore' ? "office-dropdown-active" : ''} onClick={() => { setSelectedOffice('Kanini, Coimbatore'); setShow(false); }}>Kanini, Coimbatore</div>
          </div>
          : ''}
      </div>
      <div>
        {events?.map((event) => (
          <>
            {selectedOffice === event.eventPlace ? (
              <div className="meeting-card-container" key={event.eventName}>
                {renderEventCard(event.eventName, event.eventDate, event.eventImage, () => onEventClick(event))}
              </div>
            ) : null}
          </>
        ))}
      </div>
    </div>
  );
};

export default Event;
