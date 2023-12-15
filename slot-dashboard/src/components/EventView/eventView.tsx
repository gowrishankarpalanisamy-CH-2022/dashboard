import React, { FC } from "react";
import './eventview.css'
import CalenderImage from './images/calender.png'
import LocationImage from './images/Location.png'
import TimeImage from './images/Time.png'
import ArrowLeft from './images/ArrowUp.png'

interface EventViewProps {
  eventData: {
    eventImage: string;
    eventName: string;
    eventPlace: string;
    eventDate: string;
  };
  backEvent: any; 
  TriggerChangeSelection: (event: any) => void; 
}

const EventView: FC<EventViewProps> = (props) => {
  return (
    <div className="event-view-container">
      <div className="event-view-back" onClick={() => { props.TriggerChangeSelection(props.backEvent) }}>
        <img alt="" src={ArrowLeft} height="25" />
        Back
      </div>
      <div className="event-view-img">
        <img alt="" src={props.eventData?.eventImage} />
      </div>
      <div className="event-view-content">
        <div className="event-view-header">
          <div className="event-header-left">
            <div className="event-view-header1">
              {props.eventData?.eventName}
            </div>
            <div className="event-view-header2">
              <span><img alt="" src={LocationImage} height="20" />{props.eventData?.eventPlace}</span>
              <span><img alt="" src={CalenderImage} height="20" />{props.eventData?.eventDate}</span>
              <span><img alt="" src={TimeImage} height="20" />{props.eventData?.eventDate}</span>
            </div>
          </div>
          <div className="event-header-right">
            <div className="event-header-right-1">
              <span>Yes</span>
              <span>No</span>
              <span>Maybe</span>
            </div>
            <div>20 people joining the event</div>
          </div>
        </div>
      </div>
      <div className="event-content-container">
        <div className="event-content-header">About</div>
        <p className="event-content">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an u  nknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially.
        </p>
      </div>
    </div>
  )
}

export default EventView;
