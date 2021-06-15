//LOGIN PAGE
import '../styles/loginPages.css';
import '../styles/App.css';
import 'bootstrap/dist/css/bootstrap.css';
import {Button, Image, Form, Navbar, ButtonGroup} from 'react-bootstrap';
import enterPandaIcon from "../assets/vers2EnterPandaIcon.svg"
import React from "react";
import {doLogin, checkLogin} from "../handlers/loginHandler.js";

export default function LoginPage()
{
  return(
    
    <div onLoad={checkLogin}>
      <Navbar className = "welMessage mb-5 shadow">
        Welcome! Please login below!
      </Navbar>  

      
      <Form className="registerForm mx-auto shadow">
        <p className="loginError errorText"></p>
        <Form.Group as={Form.Row} className="mb-2">
          <Form.Label>Username</Form.Label>
          <Form.Control className="usernameInput" placeholder="Enter Username" />
        </Form.Group>
          
        <Form.Group as={Form.Row} className="mb-2">
          <Form.Label>Password</Form.Label>
          <Form.Control className="passwordInput" type="password" placeholder="Enter Password" />
        </Form.Group>
        
        <ButtonGroup>
          <Button variant="dark" className="registerButton mx-1 rounded" href="/register">Register</Button>
          <Button variant="danger" className="enterButton mx-1 rounded" onClick={doLogin}>Enter<Image className='enterImage' src={enterPandaIcon}/></Button>
        </ButtonGroup>
      </Form>
     </div>

  
  );
}