import React, { useEffect, useState } from "react";
import "./home.css";
import RatthaTekMeadows from "./images/RatthaTekMeadows.png";
import DownBlackArrow from "./images/downarrow-black.svg";
import UpcomingImage from "./images/upcomingImage.png";
import RoomImage from "./images/room.png";
import DeskImage from "./images/desk.png";
import RightArrowImage from "./images/right-arrow.png";
import RightMoveImage from "./images/move-arrow.png";
import MeetingRoom1 from "./images/meeting-room1.png";
import MeetingRoom2 from "./images/meeting-room2.png";
import EmployeeCount from "./images/empolyee_count.png";
import Event1 from "./images/event1.png";
import Event2 from "./images/event2.png";
import Tv from "./images/tv.png";
import EpBoard from "./images/ep_board.png";
import KaniniNotification from "./images/notification-kanini.png";

interface Room {
  roomName: string;
  roomPlace: string;
  roomCount: number;
  roomImage: string;
}

interface Event {
  eventName: string;
  eventDate: string;
  eventImage: string;
  eventPlace: string;
}

interface Props {
  userName: string;
  EventSet: (n: Event) => void;
  setBack: (back: string) => void;
  TriggerChangeSelection: (selection: string) => void;
  setUpdateRoom: (updateRoom: string) => void;
  setRoomViewData: (room: Room) => void;
}

export const Home: React.FC<Props> = (props) => {
  const allRooms: Room[] = [
    {
      roomName: "Spring 4 pacs",
      roomPlace: "Rattha Tek Meadows,Chennai",
      roomCount: 20,
      roomImage: MeetingRoom1,
    },
    {
      roomName: "Sunrise",
      roomPlace: "Kanini, Bangalore",
      roomCount: 10,
      roomImage: MeetingRoom2,
    },
    {
      roomName: "Sunrise",
      roomPlace: "Kanini, Coimbatore",
      roomCount: 10,
      roomImage: MeetingRoom2,
    },
    {
      roomName: "Sunrise",
      roomPlace: "Futura, Pune",
      roomCount: 10,
      roomImage: MeetingRoom2,
    },
    {
      roomName: "Sunrise",
      roomPlace: "Kanini, Bangalore",
      roomCount: 10,
      roomImage: MeetingRoom2,
    },
    {
      roomName: "Spring 4 pacs",
      roomPlace: "Futura, Pune",
      roomCount: 20,
      roomImage: MeetingRoom1,
    },
    {
      roomName: "Spring 4 pacs",
      roomPlace: "Kanini, Coimbatore",
      roomCount: 20,
      roomImage: MeetingRoom1,
    },
    {
      roomName: "Spring 4 pacs",
      roomPlace: "Rattha Tek Meadows,Chennai",
      roomCount: 20,
      roomImage: MeetingRoom1,
    },
  ];

  const [show, setShow] = useState<boolean>(false);
  const [selectedOffice, setSelectedOffice] = useState<string>(
    "Rattha Tek Meadows,Chennai"
  );

  const events: Event[] = [
    {
      eventName: "Soft Sills Training",
      eventDate: "14 July 2022, 03.00Pm - 05.00pm",
      eventImage: Event1,
      eventPlace: "Rattha Tek Meadows,Chennai",
    },
    {
      eventName: "Yoga Day",
      eventDate: "14 July 2022, 03.00Pm - 05.00pm",
      eventImage: Event2,
      eventPlace: "Kanini, Bangalore",
    },
  ];

  const onEventClick = (n: Event) => {
    props.EventSet(n);
    props.setBack("Home");
    props.TriggerChangeSelection("EventView");
  };

  const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);
  useEffect(() => {
    setFilteredRooms((allRooms: Room[]) =>
      allRooms.filter((room: Room) => room.roomPlace === selectedOffice)
    );
  }, []);

  const onSelectRoom = (room: Room) => {
    props.setUpdateRoom("Book");
    props.TriggerChangeSelection("ViewRoom");
    props.setRoomViewData(room);
  };

  const renderEventCard = (
    eventName: String,
    eventDate: String,
    eventImage: string,
    onClickHandler: any
  ) => (
    <div className="meeting-card">
      <div className="meeting-card-image">
        <img
          src={eventImage}
          width="100%"
          height="100%"
          alt={`${eventName} Event`}
        ></img>
      </div>
      <div className="meeting-card-content">
        <div className="content-card-header">
          <div className="event-name-card">
            <div>{eventName}</div>
            <div>{eventDate}</div>
          </div>
        </div>
        <div className="event-card-btn">
          <span onClick={onClickHandler}>View event details</span>
        </div>
      </div>
    </div>
  );

  const renderRoomCard = (
    roomName: String,
    roomPlace: String,
    roomCount: number,
    roomImage: any,
    onClickHandler: any
  ) => (
    <div className="meeting-card" onClick={onClickHandler}>
      <div className="meeting-card-image">
        <img alt="" src={roomImage} width="100%" height="100%" />
      </div>
      <div className="meeting-card-content">
        <div className="content-card-header">
          <div className="room-name-card">
            <div>Conference Room:</div>
            <div>{roomName}</div>
          </div>
        </div>
        <div className="content-card-acc">
          <span>
            <img alt="" src={EmployeeCount} height="14"></img> {roomCount}
          </span>
          <span>
            <img alt="" src={Tv} height="14"></img> TV
          </span>
          <span>
            <img alt="" src={EpBoard} height="14"></img> Whiteboard
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="home-container">
      <div className="image-container">
        <img alt="" src={RatthaTekMeadows} width="100%" height="100%"></img>
        <div className="image-box-container">
          <div className="image-box">
            <div>Hello {props.userName}, Welcome to</div>
            <div>
              <span>
                {selectedOffice}
                <img
                  alt=""
                  src={DownBlackArrow}
                  height="20"
                  onClick={() => setShow((show) => !show)}
                ></img>
              </span>
              {show ? (
                <div className="office-dropdown">
                  <div
                    className={
                      selectedOffice === "Rattha Tek Meadows,Chennai"
                        ? "office-dropdown-active"
                        : ""
                    }
                    onClick={() => {
                      setSelectedOffice("Rattha Tek Meadows,Chennai");
                      setShow(false);
                      setFilteredRooms(
                        allRooms.filter(
                          (room) =>
                            room.roomPlace === "Rattha Tek Meadows,Chennai"
                        )
                      );
                    }}
                  >
                    Rattha Tek Meadows,Chennai
                  </div>
                  <div
                    className={
                      selectedOffice === "Kanini, Bangalore"
                        ? "office-dropdown-active"
                        : ""
                    }
                    onClick={() => {
                      setSelectedOffice("Kanini, Bangalore");
                      setShow(false);
                      setFilteredRooms(
                        allRooms.filter(
                          (room) => room.roomPlace === "Kanini, Bangalore"
                        )
                      );
                    }}
                  >
                    Kanini, Bangalore
                  </div>
                  <div
                    className={
                      selectedOffice === "Futura, Pune"
                        ? "office-dropdown-active"
                        : ""
                    }
                    onClick={() => {
                      setSelectedOffice("Futura, Pune");
                      setShow(false);
                      setFilteredRooms(
                        allRooms.filter(
                          (room) => room.roomPlace === "Futura, Pune"
                        )
                      );
                    }}
                  >
                    Futura, Pune
                  </div>
                  <div
                    className={
                      selectedOffice === "Kanini, Coimbatore"
                        ? "office-dropdown-active"
                        : ""
                    }
                    onClick={() => {
                      setSelectedOffice("Kanini, Coimbatore");
                      setShow(false);
                      setFilteredRooms(
                        allRooms.filter(
                          (room) => room.roomPlace === "Kanini, Coimbatore"
                        )
                      );
                    }}
                  >
                    Kanini, Coimbatore
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="home-content-container">
        <div className="home-content-container1">
          <div className="content1-container1">
            <div className="upcoming-image-container">
              <img alt="" src={UpcomingImage} height="50"></img>
            </div>
            <div className="upcoming-content-container">
              <div>Nothing Upcoming!</div>
              <div>Any upcoming bookings and guests will appear here</div>
              <div>
                <span onClick={() => props.TriggerChangeSelection("Room")}>
                  <img alt="" src={RoomImage} height="16"></img>Book a room
                  <img alt="" src={RightArrowImage} height="15"></img>
                </span>
                <span onClick={() => props.TriggerChangeSelection("Desks")}>
                  <img alt="" src={DeskImage} height="16"></img>Book a desk
                  <img alt="" src={RightArrowImage} height="15"></img>
                </span>
              </div>
            </div>
          </div>
          <div className="content1-container2">
            <div className="meetings-home-header">
              <div>Meeting rooms available right now</div>
              <div onClick={() => props.TriggerChangeSelection("Room")}>
                View all rooms
                <img alt="" src={RightMoveImage} height="14"></img>
              </div>
            </div>
            <div className="home-card-container">
              {filteredRooms?.map((n) => {
                return (
                  <>
                    <div className="meeting-card-container">
                      {renderRoomCard(
                        n.roomName,
                        n.roomPlace,
                        n.roomCount,
                        n.roomImage,
                        () => onSelectRoom(n)
                      )}
                    </div>
                  </>
                );
              })}
            </div>
          </div>
          <div className="content1-container3">
            <div className="meetings-home-header">
              <div>
                Upcoming events at kanini,{" "}
                {selectedOffice.substring(
                  selectedOffice.indexOf(",") + 1,
                  selectedOffice.length
                )}
              </div>
              <div onClick={() => props.TriggerChangeSelection("Events")}>
                View all events
                <img alt="" src={RightMoveImage} height="14"></img>
              </div>
            </div>
            <div className="home-card-container">
              {events?.map((n) => {
                return (
                  <>
                    {selectedOffice === n.eventPlace ? (
                      <div className="meeting-card-container">
                        {renderEventCard(
                          n.eventName,
                          n.eventDate,
                          n.eventImage,
                          () => onEventClick(n)
                        )}
                      </div>
                    ) : null}
                  </>
                );
              })}
            </div>
          </div>
        </div>
        <div className="home-content-container2">
          <div className="event-notification-container">
            <div className="event-notification-header">
              Events happening at{" "}
              {selectedOffice.substring(
                selectedOffice.indexOf(",") + 1,
                selectedOffice.length
              )}{" "}
              today
            </div>
            <div className="event-notification-home">
              <div className="event-notification-date">
                <span>July</span>
                <span>13</span>
              </div>
              <div>
                <div className="event-notification-content">
                  <div>
                    Family day in{" "}
                    {selectedOffice.substring(
                      selectedOffice.indexOf(",") + 1,
                      selectedOffice.length
                    )}{" "}
                    faculty
                  </div>
                  <div>10:00 AM-6:00 PM</div>
                </div>
                <div className="event-card-btn notification-button-event">
                  <span>View Details</span>
                </div>
              </div>
            </div>
          </div>
          <div className="event-notification-container">
            <div className="event-notification-home">
              <div className="event-notification-date">
                <span>July</span>
                <span>13</span>
              </div>
              <div>
                <div className="event-notification-content">
                  <div>
                    Family day in{" "}
                    {selectedOffice.substring(
                      selectedOffice.indexOf(",") + 1,
                      selectedOffice.length
                    )}{" "}
                    faculty
                  </div>
                  <div>10:00 AM-6:00 PM</div>
                </div>
                <div className="event-card-btn notification-button-event">
                  <span>View Details</span>
                </div>
              </div>
            </div>
          </div>
          <div className="notification-hr">
            <div className="event-notification-container">
              <div className="event-notification-header">Notifications</div>
              <div className="event-notification-home">
                <div>
                  <img alt="" src={KaniniNotification} height="35"></img>
                </div>
                <div className="hr-notifications">
                  <div className="event-notification-content">
                    <div>
                      Added capacity in Kanini,{" "}
                      {selectedOffice.substring(
                        selectedOffice.indexOf(",") + 1,
                        selectedOffice.length
                      )}{" "}
                      office
                    </div>
                    <div>HR Admin</div>
                  </div>
                  <div className="event-card-btn notification-button-event">
                    <span>View Details</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
