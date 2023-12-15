import React, { useEffect, useState } from "react";
import "./viewroom.css";
import Tv from "./images/tv.png";
import EpBoard from "./images/ep_board.png";
import EmployeeCount from "./images/empolyee_count.png";
import { FormControl } from "react-bootstrap";
import Calendar from "react-calendar";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import CalenderImage from "./images/calender.png";
import DownBlackArrow from "./images/downarrow-black.svg";
import LocationImage from "./images/Location.png";
import { set } from "date-fns";
import DownArrowGrey from "./images/downarrow-grey.svg";
import ProfileImage from "./images/profileimage.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface DateBooked {
  [date: string]: number[][];
}

interface TimeInterval {
  start: Date;
  end: Date;
}

const dateBooked: DateBooked = {
  "11/29/2023": [
    [7, 8],
    [14, 17],
  ],
};

let meetingId = 2456;

interface ViewRoomProps {
  isUpdateRoom: string;
  UpdateBooked: any;
  roomViewData: any;
  setBooking: (booking: any) => void;
  TriggerChangeSelection: (selection: string) => void;
}

const ViewRoom: React.FC<ViewRoomProps> = (props) => {
  const [showOffice, setShowOffice] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedOffice, setSelectedOffice] = useState(
    "Rattha Tek Meadows,Chennai"
  );
  const [selectDate, setSelectDate] = useState(
    props.isUpdateRoom === "Update"
      ? props.UpdateBooked?.roomDate
      : new Date().toLocaleDateString()
  );
  const [showCount, setShowCount] = useState(false);
  const [selectedCount, setSelectedCounts] = useState(8);
  const [description, setDescription] = useState(
    props.isUpdateRoom === "Update" ? props.UpdateBooked?.meetingName : ""
  );
  const [rangeDate, setRangeDate] = useState(
    props.isUpdateRoom === "Update" ? props.UpdateBooked.rangeDate : new Date()
  );
  const [error, setError] = useState<boolean>(false);
  const [disabledIntervals, setDisableIntervals] = useState<number[][]>([]);
  const getTodayAtSpecificHour = (date: Date, hour = 24) =>
    set(date, { hours: hour, minutes: 0, seconds: 0, milliseconds: 0 });

  const [interval, setInterval] = useState([
    getTodayAtSpecificHour(rangeDate, 8),
    getTodayAtSpecificHour(rangeDate, 9),
  ]);
  const [timelineInterval, setTimelineInterval] = useState([
    getTodayAtSpecificHour(rangeDate, 7),
    getTodayAtSpecificHour(rangeDate, 22),
  ]);
  const errorHandler = ({ error }: { error: Error }) => setError(true);

  const onChangeCallback = (selectedInterval: any) => {
    if (selectedInterval !== null) {
      setInterval(selectedInterval);
    }
  };

  useEffect(() => {
    if (dateBooked[new Date().toLocaleDateString()] !== undefined) {
      SetDisableDateforBooking(new Date());
    }
  }, []);
  const onChangeDate = (date: Date) => {
    setInterval([
      getTodayAtSpecificHour(date, 1),
      getTodayAtSpecificHour(date, 14),
    ]);
    setTimelineInterval([
      getTodayAtSpecificHour(date, 7),
      getTodayAtSpecificHour(date, 22),
    ]);
    setRangeDate(date);
    if (dateBooked[date.toLocaleDateString()] !== undefined) {
      SetDisableDateforBooking(date);
    } else {
      setDisableIntervals([]);
    }
  };
  const SetDisableDateforBooking = (date: Date) => {
    const dis: TimeInterval[] = [];
    if (dateBooked[date.toLocaleDateString()] !== undefined) {
      dateBooked[date.toLocaleDateString()].forEach((n) => {
        dis.push({
          start: getTodayAtSpecificHour(date, n[0]),
          end: getTodayAtSpecificHour(date, n[1]),
        });
      });
    }
    setDisableIntervals(dis as unknown as number[][]);
  };
  const bookRoom = () => {
    if (dateBooked[selectDate] === undefined) {
      dateBooked[selectDate] = [
        [interval[0].getHours(), interval[1].getHours()],
      ];
    } else {
      dateBooked[selectDate].push([
        interval[0].getHours(),
        interval[1].getHours(),
      ]);
    }

    props.setBooking({
      roomName: props.roomViewData.roomName,
      roomImage: props.roomViewData.roomImage,
      meetingId:
        props.isUpdateRoom === "Update"
          ? props.roomViewData.meetingId
          : meetingId++,
      meetingName: description,
      roomPlace: props.roomViewData.roomPlace,
      roomCount: selectedCount,
      roomDate: selectDate,
      roomTime: formatAMPM(interval[0]) + " - " + formatAMPM(interval[1]),
      startTime: interval[0].getHours(),
      endTime: interval[1].getHours(),
      rangeDate: rangeDate,
    });

    toast.success("Booked Successful", {
      position: "top-right",
      theme: "colored",
      autoClose: 1000,
    });
    props.TriggerChangeSelection("Home");
  };
  const formatAMPM = (date: any) => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  };

  return (
    <div className="view-room-container">
      <div className="view-room-content-container">
        <div className="view-room-content-header">
          <span>Conference Room: </span>
          <span>{props.roomViewData.roomName}</span>
          <div className="view-room-image-container">
            <img alt="" src={props.roomViewData.roomImage}></img>
          </div>
        </div>
        <div className="view-room-content-acc-container">
          <div className="view-room-content-acc">
            <div className="view-room-acc-img">
              <img alt="" src={EmployeeCount} height="20"></img>
            </div>
            <div className="view-room-acc-img-name">
              <span>Capacity:</span>
              <span>12 Peoples</span>
            </div>
          </div>
          <div className="view-room-content-acc">
            <div className="view-room-acc-img">
              <img alt="" src={Tv} height="20"></img>
            </div>
            <div className="view-room-acc-img-name">
              <span>Presentation:</span>
              <span>32inch Tv</span>
            </div>
          </div>
          <div className="view-room-content-acc">
            <div className="view-room-acc-img">
              <img alt="" src={EpBoard} height="20"></img>
            </div>
            <div className="view-room-acc-img-name">
              <span>Additional:</span>
              <span>Whiteboard</span>
            </div>
          </div>
        </div>
        <div className="view-meeting-name-container">
          <div className="meeting-name-view">Meeting Name</div>
          <div>
            <span className="span-search">
              <div className="desc-input-room">
                <FormControl
                  className="input-description"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></FormControl>
              </div>
              {description ? (
                <div className="room-search-label room-desc-label">
                  Description
                </div>
              ) : (
                ""
              )}
            </span>
          </div>
        </div>
        <div className="view-meeting-name-container-2 ">
          <div className="meeting-name-view">Book Slot</div>
          <div className="room-search-container view-room-selection-container">
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
              <div className="office-dropdown view-room-dropdown">
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
              <div className="calendar-div">
                <Calendar
                  onChange={(value: any) => {
                    setSelectDate(value.toLocalDateString("en-US"));
                    setShowCalendar(false);
                  }}
                  value={new Date(selectDate)}
                />
              </div>
            ) : (
              ""
            )}
            <span
              className="span-search"
              onClick={() => {
                setShowOffice(false);
                setShowCalendar(false);
                setShowCount((showCount) => !showCount);
              }}
            >
              <div>
                <img alt="" src={EmployeeCount} height="18"></img>{" "}
                {selectedCount}
              </div>
              <img alt="" src={DownBlackArrow} height="20"></img>
              <div className="room-search-label">Employees</div>
            </span>
            {showCount ? (
              <div className="office-dropdown view-employee-dropdown">
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
          </div>

          <div className="view-meeting-name-container time-container">
            <div className="meeting-name-view">Select Start & End Time </div>
            <div className="time-range-container">
              <div className="time-content">
                <span>Time - </span>
                <span>
                  {formatAMPM(interval[0])} - {formatAMPM(interval[1])}
                </span>
              </div>
            </div>
          </div>
          <div
            className={
              description && !error
                ? "view-room-book-container active-book-button"
                : "view-room-book-container"
            }
          >
            <span onClick={description && !error ? () => bookRoom() : () => {}}>
              {props.isUpdateRoom === "Book" ? "Book a room" : "Update"}
            </span>
            <span onClick={() => props.TriggerChangeSelection("Room")}>
              Cancel
            </span>
          </div>
          <div className="reservation-view-room-container">
            <div className="reservation-header">
              <span>Reservations:</span>
              <span>
                Today<img alt="" src={DownArrowGrey} height="14"></img>
              </span>
            </div>
            <div className="reservation-list">
              <div className="reservation-card-container">
                <div className="reservation-image">
                  <img alt="" src={ProfileImage} height="36"></img>
                </div>
                <div className="reservation-card">
                  <div>Vishnu Venkatasen booked for today meeting</div>
                  <div>03.00 pm - 05.00 pm</div>
                </div>
              </div>
              <div className="reservation-card-container">
                <div className="reservation-image">
                  <img alt="" src={ProfileImage} height="36"></img>
                </div>
                <div className="reservation-card">
                  <div>Vishnu Venkatasen booked for today meeting</div>
                  <div>03.00 pm - 05.00 pm</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewRoom;
