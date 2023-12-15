import React, { useState } from "react";
import './desk.css';
import CalenderImage from './images/calender.png';
import DeskImage from './images/DeskImage.png';
import DownBlackArrow from './images/downarrow-black.svg';
import LocationImage from './images/Location.png';
import Calendar from 'react-calendar';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import AddImage from './images/AddImage.svg';
import { Modal, FormControl } from 'react-bootstrap';
import CloseButtonImage from './images/closeButton.png';
import SearchImage from './images/search.png';
import Person1 from './images/Person1.png';
import Tick from './images/tick.gif';
import Clock from './images/Time.png';
import EmployeeCount from './images/empolyee_count.png';
import KaniniLogo from './images/KaniniLogo.png';

interface Employee {
  personName: string;
  personImage: string;
}

export const Desk: React.FC<{ TriggerChangeSelection: (value: string) => void }> = (props) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showOffice, setShowOffice] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedOffice, setSelectedOffice] = useState('Futura, Pune');
  const [selectDate, setSelectDate] = useState('12/14/2023');
  const [searchEmp, setSearchEmp] = useState('');
  const employees: Employee[] = [
    { personName: 'Thanaraj', personImage: Person1 },
    { personName: 'Vikash', personImage: Person1 },
  ];
  const [filterEmployees, setFilterEmployee] = useState(employees);
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [addedEmployee, setAddedEmployee] = useState<Employee[]>([]);
  const [addedEmployeeDesk, setAddedEmployeeDesk] = useState<Employee[]>([]);
  const [booked, setBookedModal] = useState(false);

  const onSearchFilter = (value: string) => {
    setFilterEmployee(
      employees.filter(
        (emp) =>
          emp.personName.toLowerCase().includes(value.toLowerCase()) 
      )
    );
    setSearchEmp(value);
    if (
      employees.filter(
        (emp) =>
          emp.personName.toLowerCase().includes(value.toLowerCase())
      ).length > 0
    ) {
      setShowSearchBox(true);
    } else {
      setShowSearchBox(false);
    }
  };

  const onAddedEmployeeDesk = () => {
    const emp = addedEmployee.map((u) => ({ ...u, approved: true }));
    setAddedEmployeeDesk(emp);
    setShowAddModal(false);
  };

  const onSetAddedEmployee = (value: Employee) => {
    addedEmployee.push(value);
    setAddedEmployee([...addedEmployee]);
    console.log(addedEmployee);
    setShowSearchBox(false);
    setSearchEmp('');
  };
  return (<>
    <Modal show={showAddModal} dialogClassName="forgot-modal" backdropClassName="forgot-backdrop" className="add-colleague-modal">
            <Modal.Body>
                <div className="modal-close-button" onClick={()=>setShowAddModal(false)}><img alt="" src={CloseButtonImage} height='23'></img></div>
                <div className="header-modal-add">Add Colleagues</div>
                <div className="add-colleague-search-bar">
                    <span><FormControl placeholder="Search" value={searchEmp} onChange={(e)=>onSearchFilter(e.target.value)} type="text"/></span>
                    <span><img alt="" src={SearchImage} height="17"></img></span>
                </div>
                {showSearchBox?<div className="search-box-desk">
                {filterEmployees?.map((n)=>
                {
                    return( <div onClick={()=>{onSetAddedEmployee(n)}}><img alt="" src={n.personImage} height="25"></img>{n.personName}</div>)
                })
                }
                </div>:''}
                <div className="desk-added-emp">
                {addedEmployee?.map((n)=>
                {
                    return(<div>
                        <img alt="" src={n.personImage} height="25"></img>{n.personName}
                    </div>)
                })}
                </div>
                <div className="bottom-button-modal">
                    <span className={addedEmployee.length>0?"active-modal-emp":""} onClick={()=>onAddedEmployeeDesk()}>Add</span>
                    <span onClick={()=>{setShowAddModal(false);setAddedEmployee([])}}>Cancel</span></div>
            </Modal.Body>
        </Modal>
    <div className="desk-view-container">
        <div className="desk-view-content-container">
            <div className="book-desk-header">Book a desk</div>
            <div className="book-desk-subheader">Book a desk for the day to use in the common area of any kanini location</div>
            <div className="view-meeting-name-container">
                <div className='room-search-container view-room-selection-container desk-book-select'>
            <span className='span-search' onClick={()=>{
                setShowOffice(showOffice => !showOffice)
                setShowCalendar(false)
            }}><div><img alt="" src={LocationImage} height='18'></img>{selectedOffice}</div> 
            <img alt="" src={DownBlackArrow} height='20'></img>
            <div className='room-search-label'>Location</div>
            </span>
            {showOffice?
                    <div className="office-dropdown view-room-dropdown">
                    <div className={selectedOffice==='Rattha Tek Meadows,Chennai'?"office-dropdown-active":''} onClick={()=>{setSelectedOffice('Rattha Tek Meadows,Chennai');setShowOffice(false);}}>Rattha Tek Meadows,Chennai</div>
                    <div className={selectedOffice==='Kanini, Bangalore'?"office-dropdown-active":''} onClick={()=>{setSelectedOffice('Kanini, Bangalore');setShowOffice(false);}}>Kanini, Bangalore</div>
                    <div className={selectedOffice==='Futura, Pune'?"office-dropdown-active":''} onClick={()=>{setSelectedOffice('Futura, Pune');setShowOffice(false);}}>Futura, Pune</div>
                    <div className={selectedOffice==='Kanini, Coimbatore'?"office-dropdown-active":''} onClick={()=>{setSelectedOffice('Kanini, Coimbatore');setShowOffice(false);}}>Kanini, Coimbatore</div>
                    </div>
                    :''}
            <span className='span-search' onClick={()=>{
                setShowOffice(false)
                setShowCalendar(showCalendar=>!showCalendar)
            }}><div><img alt="" src={CalenderImage} height='18'></img>{selectDate}</div> 
            <img alt="" src={DownBlackArrow} height='20'></img>
            <div className='room-search-label'>Date</div>
            </span>
            {showCalendar ? (
  <div className='calendar-div-room'>
    <Calendar
      onChange={(value) => {
        setSelectDate(value instanceof Date ? value.toLocaleDateString("en-US") : '');
        setShowCalendar(false);
      }}
      value={selectDate ? new Date(selectDate) : new Date()}
    />
  </div>
) : null} 
        </div>
            </div>
            <div className="add-colleagues-container">
                {addedEmployeeDesk.length>0?
                <div className="desk-added-emp-list">
                {addedEmployee.map((n)=>
                {
                    return(<div>
                        <img alt="" src={n.personImage} height="25"></img>{n.personName}
                    </div>)
                })}
                <div><img alt="" src={AddImage} height="25" onClick={()=>setShowAddModal(true)}></img></div>
                </div>
                :<span onClick={()=>setShowAddModal(true)}><img alt="" src={AddImage} height="25"></img>Add Colleagues</span>}
            </div>
            <div className="book-desk-button">
                <div className={addedEmployeeDesk.length>0?"":"active-book-desk-disable"} onClick={()=>{if(addedEmployeeDesk.length>0){setBookedModal(true)}}}>Book a desk</div>
                <div>18 desk available</div>
            </div>
        </div>
        <div className="desk-view-image-container">
            <img alt="" src={DeskImage}></img>
        </div>
    </div>


    <Modal show={booked} dialogClassName="forgot-modal forgot-input" backdropClassName="forgot-backdrop" className="add-colleague-modal">
            <Modal.Body>
                <div className="modal-close-button" onClick={()=>props.TriggerChangeSelection('Home')}><img alt="" src={CloseButtonImage} height='23'></img></div>
                <div className="forgot-image" ><img alt="" src={Tick} height='100'></img></div>
                <div className="forgot-header">
                    <div className="success-msg">You've successfully booked a desk.</div>
    
                <div className="success-sub"><span><p><img alt="" src={KaniniLogo} height='20'></img></p>Booking Id </span><span>#6541</span></div>
                </div>
                    <div className="success-acc">
                        <span><img alt="" src={LocationImage} height='14'></img>Futura, Pune</span>
                        <span><img alt="" src={EmployeeCount} height='14'></img>2 people</span>
                        <span><img alt="" src={CalenderImage} height='14'></img>July 11, 2022 </span>
                        <span><img alt="" src={Clock} height='14'></img>11:00am- 05:00pm</span>
                    </div>
                    <div className="continue-button">
                        <div onClick={()=>props.TriggerChangeSelection('Home')}>Continue</div></div>
            </Modal.Body>
        </Modal>
    </>)
}