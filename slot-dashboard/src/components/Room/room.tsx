import React, { useEffect, useState } from "react";
import "./room.css";
import Tv from "./images/tv.png";
import EpBoard from "./images/ep_board.png";
import MeetingRoom1 from "./images/meeting-room1.png";
import MeetingRoom2 from "./images/meeting-room2.png";
import EmployeeCount from "./images/empolyee_count.png";
import LocationImage from "./images/Location.png";
import CalenderImage from "./images/calender.png";
import DownBlackArrow from "./images/downarrow-black.svg";
import Calendar from "react-calendar";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

interface RoomProps {
  setUpdateRoom: (value: string) => void;
  TriggerChangeSelection: (value: string) => void;
  setRoomViewData: (room: RoomData) => void;
}

interface RoomData {
  roomName: string;
  roomPlace: string;
  roomCount: number;
  roomImage: string;
}

export const Room: React.FC<RoomProps> = (props) => {
  const [showOffice, setShowOffice] = useState<boolean>(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedOffice, setSelectedOffice] = useState<string>(
    "Rattha Tek Meadows,Chennai"
  );
  const [selectDate, setSelectDate] = useState('12/14/2023');
  const [showCount, setShowCount] = useState<boolean>(false);
  const [selectedCount, setSelectedCounts] = useState<number>(8);
  const allRooms = [
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
  const [filteredRooms, setFilteredRooms] = useState<RoomData[]>([]);

  useEffect(() => {
    setFilteredRooms(
      allRooms.filter(
        (room) =>
          room.roomPlace === selectedOffice && room.roomCount >= selectedCount
      )
    );
  }, []);

  const searchRooms = () => {
    setFilteredRooms(
      allRooms.filter(
        (room) =>
          room.roomPlace === selectedOffice && room.roomCount >= selectedCount
      )
    );
    setShowCount(false);
    setShowCalendar(false);
    setShowOffice(false);
  };

  const onSelectRoom = (room: RoomData) => {
    props.setUpdateRoom("Book");
    props.TriggerChangeSelection("ViewRoom");
    props.setRoomViewData(room);
  };

  const renderRoomCard = (
    roomName: string,
    roomPlace: string,
    roomCount: number,
    roomImage: string,
    onClickHandler: () => void
  ) => (
    <div className="meeting-card" onClick={onClickHandler}>
      <div className="meeting-card-image">
        <img alt="" src={roomImage} width="100%" height="100%"></img>
      </div>
      <div className="meeting-card-content">
        <div className="content-card-header">
          <div className="room-name-card">
            <div>Conference Room:</div>
            <div>{roomName}</div>
          </div>
          <div className="location-card">
            <span>
              {roomPlace.substring(
                roomPlace.indexOf(",") + 1,
                roomPlace.length
              )}
            </span>
          </div>
        </div>
        <div className="content-card-acc">
          <span>
            <img alt="" src={EmployeeCount} height="14" width="16"></img> {roomCount}
          </span>
          <span>
            <img alt="" src={Tv} height="14" width="16"></img> TV
          </span>
          <span>
            <img alt="" src={EpBoard} height="14" width="16"></img> Whiteboard
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="room-container">
      <div className="room-header">Book a Room</div>
      <div className="room-sub-header">
        Book a conference room at any kanini location
      </div>
      <div className="room-search-container">
        <span
          className="span-search"
          onClick={() => {
            setShowOffice((showOffice) => !showOffice);
            setShowCalendar(false);
            setShowCount(false);
          }}
        >
          <div>
            <img alt="" src={LocationImage} height="18"></img>
            {selectedOffice}
          </div>
          <img alt="" src={DownBlackArrow} height="20"></img>
          <div className="room-search-label">Location</div>
        </span>
        {showOffice ? (
          <div className="office-dropdown room-dropdown">
            <div
              className={
                selectedOffice === "Rattha Tek Meadows,Chennai"
                  ? "office-dropdown-active"
                  : ""
              }
              onClick={() => {
                setSelectedOffice("Rattha Tek Meadows,Chennai");
                setShowOffice(false);
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
                      setShowOffice(false);
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
                      setShowOffice(false);
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
                      setShowOffice(false);
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
        <span
          className="span-search"
          onClick={() => {
            setShowOffice(false);
            setShowCalendar((showCalendar) => !showCalendar);
            setShowCount(false);
          }}
        >
          <div>
            <img alt="" src={CalenderImage} height="18"></img>
            {selectDate}
          </div>
          <img alt="" src={DownBlackArrow} height="20"></img>
          <div className="room-search-label">Date</div>
        </span>
        {showCalendar ? (
          <div className="calendar-div-room">
            <Calendar
              onChange={(value ) => {
                setSelectDate(value instanceof Date ? value.toLocaleDateString("en-US") : '');
                setShowCalendar(false);
              }}
              value={selectDate ? new Date(selectDate) : new Date()}
            />
          </div>
        ) : null} 
        <span
          className="span-search"
          onClick={() => {
            setShowOffice(false);
            setShowCalendar(false);
            setShowCount((showCount) => !showCount);
          }}
        >
          <div>
            <img alt="" src={EmployeeCount} height="18"></img> {selectedCount}
          </div>
          <img alt="" src={DownBlackArrow} height="20"></img>
          <div className="room-search-label">Employees</div>
        </span>
        {showCount ? (
          <div className="office-dropdown employee-dropdown">
            {[...Array(80)].map((x, i) => (
              <div
                className={
                  selectedCount === i + 1 ? "office-dropdown-active" : ""
                }
                onClick={() => {
                  setSelectedCounts(i + 1);
                  setShowCount(false);
                }}
              >
                {i + 1}
              </div>
            ))}
          </div>
        ) : (
          ""
        )}
        <div className="search-button-room" onClick={() => searchRooms()}>
          Search
        </div>
      </div>
      <div className="room-card-content-container">
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
  );
};
