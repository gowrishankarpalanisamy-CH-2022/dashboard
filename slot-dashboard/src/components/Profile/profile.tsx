import React, { useState, useEffect } from "react";
import "./profile.css";
import EditProfile from "./images/editProfile.png";
import { FormControl } from "react-bootstrap";
import DownBlackArrow from "./images/downarrow-black.svg";
import  UpdateUser  from "./data.json";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ProfileProps {
  onProUpdate: () => void;
  TriggerChangeSelection: (selection: string) => void;
}

export const Profile: React.FC<ProfileProps> = (props) => {
  const [empId, setEmpId] = useState<string | undefined>();
  const [firstName, setFirstName] = useState<string | undefined>();
  const [lastName, setLastName] = useState<string | undefined>();
  const [showOffice, setShowOffice] = useState<boolean>(false);
  const [location, setLocation] = useState<string | undefined>();
  const [department, setDepartment] = useState<string | undefined>();
  const [title, setTitle] = useState<string | undefined>();
  const [emailId, setEmailId] = useState<string | undefined>();
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>();
  const [profileImg, setProfileImg] = useState<string | undefined>();

  useEffect(() => {
    const userDataFetch = () => {
      const storedUserDataJSON = localStorage.getItem("userData");
      const userData = JSON.parse(storedUserDataJSON || "");
      return userData;
    };
    const userData = userDataFetch();

    if (userData !== null) {
      setEmpId(userData.employeeId);
      setFirstName(userData.firstName);
      setLastName(userData.lastName);
      setLocation(userData.location);
      setDepartment(userData.department);
      setTitle(userData.title);
      setEmailId(userData.email);
      setPhoneNumber(userData.phone);
      setProfileImg(userData.profileImg);
    }
  }, []);

  const onUploadFile = async (image: React.ChangeEvent<HTMLInputElement>) => {
    if (image.target.files && image.target.files[0]) {
      const reader = new FileReader();
      const blob = await fetch(URL.createObjectURL(image.target.files[0])).then(
        (res) => res.blob()
      );
      reader.onload = () => {
        const base64 = reader.result as string;
        setProfileImg(base64);
      };
      if (image.target.files[0]) {
        reader.readAsDataURL(blob);
      }
    }
  };

  const UpdateUserDetails = () => {
    const payload = {
      employeeId: empId,
      firstName: firstName,
      lastName: lastName,
      location: location,
      department: department,
      title: title,
      email: emailId,
      phone: phoneNumber,
      profileImg: profileImg,
    };
  };
  return (
    <div className="profile-container">
      <div className="profile-header">User Profile</div>
      <div className="profile-img-container">
        <div className="profile-img">
          <img alt="" src={profileImg}></img>
        </div>
        <div className="edit-button">
          <img alt="" src={EditProfile}></img>
          <FormControl
            className="file-upload"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onUploadFile(e)
            }
            accept=".jpg,.png,.jpeg"
            type="file"
          />
        </div>
      </div>
      <div className="">
        <div>
          <div className="edit-pro-input-container">
            <span className="span-search">
              <div className="desc-input-room">
                <FormControl
                  placeholder="Employee ID"
                  value={empId}
                  onChange={(e) => setEmpId(e.target.value)}
                ></FormControl>
              </div>
              {empId ? (
                <div className="room-search-label room-desc-label">
                  Employee ID
                </div>
              ) : (
                ""
              )}
            </span>
            <span className="span-search">
              <div className="desc-input-room">
                <FormControl
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                ></FormControl>
              </div>
              {firstName ? (
                <div className="room-search-label room-desc-label">
                  First Name
                </div>
              ) : (
                ""
              )}
            </span>
          </div>
          <div className="edit-pro-input-container">
            <span className="span-search">
              <div className="desc-input-room">
                <FormControl
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                ></FormControl>
              </div>
              {lastName ? (
                <div className="room-search-label room-desc-label">
                  Last Name
                </div>
              ) : (
                ""
              )}
            </span>
            <div className="room-search-container user-profile-location">
              <span
                className="span-search"
                onClick={() => {
                  setShowOffice((showOffice) => !showOffice);
                }}
              >
                <div>{location}</div>
                <img alt="" src={DownBlackArrow} height="20"></img>
                <div className="room-search-label">Location</div>
              </span>
              {showOffice ? (
                <div className="office-dropdown user-location-dropdown">
                  <div
                    className={
                      location === "Chennai" ? "office-dropdown-active" : ""
                    }
                    onClick={() => {
                      setLocation("Chennai");
                      setShowOffice(false);
                    }}
                  >
                    Rattha Tek Meadows,Chennai
                  </div>
                  <div
                    className={
                      location === "Bangalore" ? "office-dropdown-active" : ""
                    }
                    onClick={() => {
                      setLocation("Bangalore");
                      setShowOffice(false);
                    }}
                  >
                    Kanini, Bangalore
                  </div>
                  <div
                    className={
                      location === "Pune" ? "office-dropdown-active" : ""
                    }
                    onClick={() => {
                      setLocation("Pune");
                      setShowOffice(false);
                    }}
                  >
                    Futura, Pune
                  </div>
                  <div
                    className={
                      location === "Coimbatore" ? "office-dropdown-active" : ""
                    }
                    onClick={() => {
                      setLocation("Coimbatore");
                      setShowOffice(false);
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
          <div className="edit-pro-input-container">
            <span className="span-search">
              <div className="desc-input-room">
                <FormControl
                  placeholder="Department"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                ></FormControl>
              </div>
              {department ? (
                <div className="room-search-label room-desc-label">
                  Department
                </div>
              ) : (
                ""
              )}
            </span>
            <span className="span-search">
              <div className="desc-input-room">
                <FormControl
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                ></FormControl>
              </div>
              {title ? (
                <div className="room-search-label room-desc-label">Title</div>
              ) : (
                ""
              )}
            </span>
          </div>

          <div className="input-profile">
            <span className="span-search">
              <div className="desc-input-room">
                <FormControl
                  placeholder="Email ID"
                  value={emailId}
                  onChange={(e) => setEmailId(e.target.value)}
                ></FormControl>
              </div>
              {emailId ? (
                <div className="room-search-label room-desc-label">
                  Email address
                </div>
              ) : (
                ""
              )}
            </span>
          </div>
          <div className="input-profile">
            <span className="span-search">
              <div className="desc-input-room">
                <FormControl
                  placeholder="Phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                ></FormControl>
              </div>
              {phoneNumber ? (
                <div className="room-search-label room-desc-label">
                  Phone number
                </div>
              ) : (
                ""
              )}
            </span>
          </div>
          <div className="profile-update-button">
            <span onClick={() => UpdateUserDetails()}>Update</span>
            <span onClick={() => props.TriggerChangeSelection("Home")}>
              Cancel
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
