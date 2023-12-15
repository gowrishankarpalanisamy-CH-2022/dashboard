import React, { useState } from "react";
import { Modal, FormControl, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import KaniniCanvasImage from './images/kaniniCanvasImage.jpg'
import CanvasText from './images/CanvasText.png'
import KaniniLogo from './images/kaniniLogo.png'
import ForgotPassImage from './images/forgotPass.png'
import CloseButtonImage from './images/closeButton.png'
import data from "./data.json";
import './loginpage.css';

interface LoginPageProps {
  setUserData: (data: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = (props) => {
  const [show, setShow] = useState(false);
  const [emailId, setEmailId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const [forgotPassword, setForgotPassword] = useState<string>("");

  const callLoginAPI = async () => {
    try {
      if (data.emailId === emailId && data.password === password && data.emailId !== null){
        toast.success("Login Successful", {
          position: "top-right",
          theme: "colored",
          autoClose: 1000,
        });
        const userDataJSON = JSON.stringify(data.emailId);
        props.setUserData(userDataJSON);
        navigate("landingPage", { state: { userData: data.emailId } });
      } else {
        toast.error("login failed", {
          position: "top-right",
          theme: "colored",
          autoClose: 1000,
        });
      }
    } catch (error:any) {
      toast(error, {
        position: "top-right",
        theme: "colored",
        autoClose: 1000,
      });
    }
  };

  return (
    <>
      <Modal
        show={show}
        dialogClassName="forgot-modal forgot-input"
        backdropClassName="forgot-backdrop"
      >
        <Modal.Body>
          <div className="modal-close-button" onClick={() => setShow(false)}>
            <img alt="" src={CloseButtonImage} height="23"></img>
          </div>
          <div className="forgot-image">
            <img alt="" src={ForgotPassImage} height="65"></img>
          </div>
          <div className="forgot-header">
            <div>Forgot Password?</div>
            <div>No worries, we'll send you reset instructions.</div>
          </div>
          <div className="login-form-container forgot-pass-form">
            <label>Email ID</label>
            <FormControl
              type="text"
              placeholder="name@kanini.com"
              value={forgotPassword}
              onChange={(e) => setForgotPassword(e.target.value)}
            ></FormControl>
            <Button
              className={
                forgotPassword
                  ? "forgot-login-button"
                  : "forgot-login-button-active"
              }
            >
              SIGN IN
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      <div className="login-container">
        <div className="login-canvas-image">
          <img alt="" src={KaniniCanvasImage} height="100%" width="100%"></img>
          <img alt="" src={CanvasText} className="canvastext"></img>
        </div>
        <div className="login-container-box">
          <div className="login-box">
            <img className="login-logo" alt="" src={KaniniLogo} height="50px" ></img>
            <div className="login-header">
              <div>Sign In</div>
              <div>Welcome back! Please enter email id and password</div>
            </div>
            <div className="login-form-container">
              <label className="email-title">Email ID</label>
              <FormControl
              className="input-email"
                type="text"
                placeholder="name@kanini.com"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              ></FormControl>
              <label className="pwd-title">Password</label>
              <FormControl
                type="password"
                placeholder="**************"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></FormControl>
            </div>
            <div className="forgot-password" onClick={() => setShow(true)}>
              Forgot your password?
            </div>
            <Button
              className={
                emailId && password ? "login-button-active" : "login-button"
              }
              onClick={() => callLoginAPI()}
            >
              SIGN IN
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
