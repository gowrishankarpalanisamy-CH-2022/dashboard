import React, { useState } from "react";
import "./bookingpage.css";

import KaniniLogo from "./images/KaniniLogo.png";
import Meeting1 from "./images/meeting-room1.png";
import Meeting2 from "./images/meeting-room2.png";
import Location from "./images/Location.png";
import EmployeeCount from "./images/empolyee_count.png";
import Clock from "./images/Time.png";
import CalendarImage from "./images/calender.png";
import MeetingNameImage from "./images/meeting-name.png";
import DeskImage1 from "./images/DeskImage.png";
import DeskImage2 from "./images/RatthaTekMeadows.png";
import Desk from "./images/desk.png";
import Room from "./images/Room.png";
import CheckImage from "./images/CheckedImage.svg";
import { Modal } from "react-bootstrap";
import CloseButtonImage from "./images/closeButton.png";

interface DeskData {
  deskImage: any;
  deskId: String;
  deskPlace: String;
  deskPeopleCount: number;
  deskDate: String;
  checkIn: String;
  deskTime: String;
}

interface RoomData {
  roomImage: string;
  roomName: string;
  meetingId: string;
  meetingName: string;
  roomPlace: string;
  roomCount: number;
  roomDate: string;
  roomTime: string;
}

interface BookingPageProps {
  bookedMeets: RoomData[];
  setUpdateRoom: (room: string) => void;
  setUpdateBooked: (room: RoomData) => void;
  TriggerChangeSelection: (selection: string) => void;
  setRoomViewData: (room: RoomData) => void;
}

const BookingPage: React.FC<BookingPageProps> = (props) => {
  console.log(props.bookedMeets);
  const [active, setActive] = useState("All");
  const meetingsAvailable = props.bookedMeets;
  const [showModal, setShowModal] = useState(false);
  const [checkList, setCheckList] = useState<DeskData>({
    deskImage: "",
    deskId: "",
    deskPlace: "",
    deskPeopleCount: 0,
    deskDate: "",
    checkIn: "Yet",
    deskTime: "",
  });

  const desksAvailable: DeskData[] = [
    {
      deskImage: DeskImage1,
      deskId: "6541",
      deskPlace: "Futura, Pune",
      deskPeopleCount: 8,
      deskDate: "July 11, 2022",
      checkIn: "Yet",
      deskTime: "05:00pm",
    },
    {
      deskImage: DeskImage2,
      deskId: "6542",
      deskPlace: "Rattha Tek Meadows,Chennai",
      deskPeopleCount: 8,
      deskDate: "July 11, 2022",
      checkIn: "Yet",
      deskTime: "05:00pm",
    },
  ];
  const [desksAvailableState, setDeskAvailable] = useState(desksAvailable);

  const onUpdateRoom = (room: RoomData) => {
    props.setUpdateRoom("Update");
    props.setUpdateBooked(room);
    props.TriggerChangeSelection("ViewRoom");
    props.setRoomViewData(room);
  };

  const UpdateCheckedIn = () => {
    if (checkList.checkIn === "Yet") {
      const targetDesk = desksAvailableState.find(
        (desk) => desk.deskId === checkList.deskId
      );

      if (targetDesk) {
        targetDesk.checkIn = "In";
        setDeskAvailable([...desksAvailableState]);
        setShowModal(false);
      }
    } else if (checkList.checkIn === "In") {
      const targetDesk = desksAvailableState.find(
        (desk) => desk.deskId === checkList.deskId
      );

      if (targetDesk) {
        targetDesk.checkIn = "Out";
        setDeskAvailable([...desksAvailableState]);
        setShowModal(false);
      }
    }
  };

  return (
    <div className="booking-page-container">
      <div className="booking-page-header">Your bookings</div>
      <div className="booking-page-tab">
        <span
          className={active === "All" ? "active-booking" : ""}
          onClick={() => setActive("All")}
        >
          All
        </span>
        <span
          className={active === "Desk" ? "active-booking" : ""}
          onClick={() => setActive("Desk")}
        >
          Desk
        </span>
        <span
          className={active === "Room" ? "active-booking" : ""}
          onClick={() => setActive("Room")}
        >
          Room
        </span>
      </div>
      <div className="booking-page-sub">Active Booking</div>
      <div>
        {meetingsAvailable.length > 0 && (active === "All" || active === "Room")
          ? meetingsAvailable.map((n) => {
              return (
                <div className="booking-item">
                  <div className="booking-img">
                    <img alt="" src={n.roomImage}></img>
                    <div>
                      <img alt="" src={Room} height="20"></img>Room
                    </div>
                  </div>
                  <div className="booking-content-container">
                    <div className="booking-meeting-name">
                      {n.roomName} Meeting room
                    </div>
                    <div className="success-sub kanini-logo-booking">
                      <span>
                        <p>
                          <img alt="" src={KaniniLogo} height="15"></img>
                        </p>
                        Booking id{" "}
                      </span>
                      <span>#{n.meetingId}</span>
                    </div>
                    <div className="booking-acc-span">
                      <span>
                        <img alt="" src={MeetingNameImage} height="14"></img>{" "}
                        {n.meetingName}
                      </span>
                      <span>
                        <img alt="" src={Location} height="20"></img>{" "}
                        {n.roomPlace}
                      </span>
                      <span>
                        <img alt="" src={EmployeeCount} height="17"></img>{" "}
                        {n.roomCount} people
                      </span>
                      <span>
                        <img alt="" src={CalendarImage} height="17"></img>{" "}
                        {n.roomDate}{" "}
                      </span>
                      <span>
                        <img alt="" src={Clock} height="20"></img> {n.roomTime}
                      </span>
                    </div>
                  </div>
                  <div className="booking-button-container">
                    <div
                      className="booked-button"
                      onClick={() => onUpdateRoom(n)}
                    >
                      View and Modify booking
                    </div>
                  </div>
                </div>
              );
            })
          : ""}

        {desksAvailableState.length > 0 &&
        (active === "All" || active === "Desk")
          ? desksAvailableState.map((n) => {
              return (
                <div className="booking-item">
                  <div className="booking-img">
                    <img alt="" src={n.deskImage}></img>
                    <div>
                      <img alt="" src={Desk} height="20"></img>Desk
                    </div>
                  </div>
                  <div className="booking-content-container">
                    <div className="booking-meeting-name">
                      Desk at {n.deskPlace}
                    </div>
                    <div className="success-sub kanini-logo-booking">
                      <span>
                        <p>
                          <img alt="" src={KaniniLogo} height="15"></img>
                        </p>
                        Booking id{" "}
                      </span>
                      <span>#{n.deskId}</span>
                    </div>
                    <div className="booking-acc-span">
                      <span>
                        <img alt="" src={Location} height="20"></img>{" "}
                        {n.deskPlace}
                      </span>
                      <span>
                        <img alt="" src={EmployeeCount} height="17"></img>{" "}
                        {n.deskPeopleCount} people
                      </span>
                      <span>
                        <img alt="" src={CalendarImage} height="17"></img>{" "}
                        {n.deskDate}{" "}
                      </span>
                    </div>
                  </div>
                  <div className="booking-button-container">
                    {n.checkIn === "In" ? (
                      <div className="checked-in">
                        <img alt="" src={CheckImage} height="16"></img>
                        Checked-in
                      </div>
                    ) : (
                      ""
                    )}
                    {n.checkIn === "Out" ? (
                      <div className="checked-out">
                        <img alt="" src={CheckImage} height="16"></img>
                        Checked-in & Checked-out
                      </div>
                    ) : (
                      ""
                    )}
                    {n.checkIn === "In" || n.checkIn === "Yet" ? (
                      <div
                        className="booked-button"
                        onClick={() => {
                          setShowModal(true);
                          setCheckList(n);
                        }}
                      >
                        Check {n.checkIn === "In" ? "Out" : "in"}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              );
            })
          : ""}
      </div>
      <Modal
        show={showModal}
        dialogClassName="forgot-modal forgot-input"
        backdropClassName="forgot-backdrop"
      >
        <Modal.Body>
          <div className="modal-close-header">
            <div>
              Check {checkList && checkList.checkIn === "Yet" ? "In" : "Out"}{" "}
              Details
            </div>
            <img
              alt=""
              onClick={() => setShowModal(false)}
              src={CloseButtonImage}
              height="23"
            ></img>
          </div>
          <div className="modal-sub-book">
            <div>{checkList.deskPlace}</div>
            <div className="success-sub success-modal-check">
              <span>
                <p>
                  <img alt="" src={KaniniLogo} height="20"></img>
                </p>
                Booking id{" "}
              </span>
              <span>#{checkList.deskId}</span>
            </div>
          </div>
          <div className="modal-sub2-book">
            <span>
              <img alt="" src={CalendarImage} height="20"></img>{" "}
              {checkList.deskDate}
            </span>
            <span>
              <img alt="" src={Clock} height="20"></img> {checkList.deskTime}
            </span>
          </div>
          <div className="check-modal-book">
            <span onClick={() => UpdateCheckedIn()}>
              Check {checkList.checkIn === "Yet" ? "In" : "Out"}
            </span>
            <span onClick={() => setShowModal(false)}>Cancel</span>
          </div>
          <div></div>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default BookingPage;
