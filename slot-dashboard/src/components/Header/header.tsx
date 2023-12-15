import React, { useState, useEffect } from "react";
import './header.css';
import KaniniLogo from './images/KaniniLogo.png';
import NotificationAlert from './images/NotificationAlert.png';
import RoomImage from './images/Room.png';
import DownGreyArrow from './images/downarrow-grey.svg';
import DownBlackArrow from './images/downarrow-black.svg';
import DeskImage from './images/desk.png';
import proImage from './images/avatar.png';
 import { Home } from "../Home/home";
 import  Footer  from "../Footer/footer";
 import  Event  from "../Event/event";
 import  EventView  from "../EventView/eventView";
 import { Room } from "../Room/room";
 import  ViewRoom  from "../ViewRoom/viewRoom";
 import { Desk } from "../Desk/desk";
 import  BookingPage  from "../BookingPage/bookingPage";
 import { useNavigate } from 'react-router-dom';
 import { Profile } from "../Profile/profile";
// import { Notification } from "../Notification/Notification";
// import { NotificationView } from "../NotificationView/NotificationView";
import { Calendar } from "../Calendar/calendar";
import data from './data.json';

interface BookingData {
  roomImage: string;
  roomName: string;
  meetingId: string;
  meetingName: string;
  roomPlace: string;
  roomCount: number;
  roomDate: string;
  roomTime: string;
}

interface UserData {
  firstName: string;
  lastName: string;
  profileImg: string;
}

const Header: React.FC = () => {
  const [selection, setSelection] = useState<string>('Home');
  const [show, setShow] = useState<boolean>(false);
  const [logoutShow, setLogoutShow] = useState<boolean>(false);
  const [eventViewData, setEventViewData] = useState<Record<string, any>>({});
  const [roomViewData, setRoomViewData] = useState<Record<string, any>>({});
  const [backEvent, setBackEvent] = useState<string>('');
  const [isUpdateRoom, setUpdateRoom] = useState<string>('');
  const [firstName, setFirstName] = useState(data.firstName);
  const [lastName, setLastName] = useState<string | undefined>(data.lastName);
  const [notificationData, setNotificationData] = useState<Record<string, any>>({});
  const [booking, setBooking] = useState<BookingData[]>([]);
  const navigate = useNavigate();
  const [updateBooked, setUpdateBooked] = useState<Record<string, any>>({});

  const triggerChangeSelection = (valueSelected: string) => {
    setSelection(valueSelected);
  };

  const onBooked = (data: BookingData) => {
    if (isUpdateRoom === "Update") {
      setBooking(booking.filter((n) => n.meetingId !== data.meetingId));
    }
    setBooking([...booking, data]);
  };

  const userDataFetch = (): UserData | null => {
    const storedUserDataJSON = localStorage.getItem('userData');
    return storedUserDataJSON ? JSON.parse(storedUserDataJSON) : null;
  };

  const onUpdate = () => {
    const userData = userDataFetch();
    if (userData !== null) {
      setFirstName(data.firstName);
      setLastName(data.lastName);
    }
  };

  useEffect(() => {
    onUpdate();
  }, []);

  return (
    <div className="landingpage-container">
           <div className="header-container">
                <div className="kanini-logo-header" onClick={()=>setSelection('Home')}>
                        <img alt="" src={KaniniLogo} height='20px'></img>
                            <div>Kanini </div>
                            <div> Workspace</div>
                </div>
        <div className="kanini-header-selection">
            <div className={selection==='Home'?"active-selection":''} onClick={()=>setSelection('Home')}>Home</div>
                <div className={['Room','Desks'].includes(selection)?"active-selection":''}><span>Book Space
                    <img alt="" src={['Room','Desks'].includes(selection)?DownBlackArrow:DownGreyArrow} height={14}  onClick={()=>setShow(setShow => !setShow)}></img></span>
                {show?<div className="bookspace-dropdown">
                        <div onClick={()=>{setSelection('Room');setShow(false);}}><img alt="" src={RoomImage} height='16'></img>Room</div>
                        <div onClick={()=>{setSelection('Desks');setShow(false);}}><img alt="" src={DeskImage} height='16'></img>Desks</div>
                    </div>:''}
                </div>
        <div className={selection==='Bookings'?"active-selection":''} onClick={()=>setSelection('Bookings')}>Your bookings</div>
        <div className={selection==='Events'?"active-selection":''} onClick={()=>setSelection('Events')}>Events</div>
        <div className={selection==='Calendar'?"active-selection":''} onClick={()=>setSelection('Calendar')}>Calender</div>
        </div>
        <div className="kanini-header-name"><span><img alt="" src={NotificationAlert} height='20' className="notification-img"></img> 
        <img alt="" src={proImage} height='28' className="avatar-header"></img>
        <label className="logout-button-profile" onClick={()=>{setLogoutShow(logoutShow=>!logoutShow);}}> {firstName+' '+lastName} <img alt="" src={DownBlackArrow} height='14'></img></label>
        </span>
        {logoutShow?
        <div className="profile-logout">
            <span onClick={()=>{setSelection('Profile');setLogoutShow(false)}}> View Profile</span>
            <span onClick={()=>navigate("/")}>Logout</span>
        </div>:""}
        </div>

    </div>
     <div className="landing-page-main-container">
        {selection==='Home'?<Home userName={firstName || ""} TriggerChangeSelection={triggerChangeSelection} EventSet={setEventViewData} setBack={setBackEvent} setUpdateRoom={setUpdateRoom} setRoomViewData={setRoomViewData}/>:
        selection==='Events'?<Event TriggerChangeSelection={triggerChangeSelection} EventSet={setEventViewData} setBack={setBackEvent}/>:
        selection==='Room'?<Room TriggerChangeSelection={triggerChangeSelection} setUpdateRoom={setUpdateRoom} setRoomViewData={setRoomViewData}/>:
        selection==='ViewRoom'?<ViewRoom setBooking={onBooked} roomViewData={roomViewData} isUpdateRoom={isUpdateRoom} UpdateBooked={onBooked} TriggerChangeSelection={triggerChangeSelection}/>:
        selection==='Desks'?<Desk TriggerChangeSelection={triggerChangeSelection}/>:
        selection==='Bookings'?<BookingPage bookedMeets={booking} setUpdateBooked={setUpdateBooked} setUpdateRoom={setUpdateRoom} TriggerChangeSelection={triggerChangeSelection} setRoomViewData={setRoomViewData}/>:
        selection==='Profile'?<Profile TriggerChangeSelection={triggerChangeSelection} onProUpdate={onUpdate}/>:
        selection==='Calendar'?<Calendar/>:
        ""}
    </div> 
      <Footer/>
    </div>
  );
};

export default Header;
