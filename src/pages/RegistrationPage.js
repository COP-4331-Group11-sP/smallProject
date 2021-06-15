import '../styles/loginPages.css';
import '../styles/App.css';
import 'bootstrap/dist/css/bootstrap.css';
import {Button, Image, Form, Col, Row, Navbar, ButtonGroup} from 'react-bootstrap';
import enterPandaIcon from "../assets/vers2EnterPandaIcon.svg"
import {createAccount} from "../handlers/registrationHandler.js";
import {checkLogin} from '../handlers/loginHandler.js';

export default function RegistrationPage()
{
  return(
    <div onLoad={checkLogin}>
      <Navbar className = "welMessage mb-5 shadow">
        Welcome! You're one step away from a panda themed contact manager.
      </Navbar>
      
      <Form className="registerForm mx-auto shadow">
        <p className="registerError errorText"></p>
        <Row>
          <Form.Group as={Col} className="mb-2">
              <Form.Label>First Name:</Form.Label>
              <Form.Control className="firstName" placeholder="First name" />
          </Form.Group>
          <Form.Group as={Col} className="mb-2">
              <Form.Label> Last Name: </Form.Label>
              <Form.Control className="lastName" placeholder="Last name" />
          </Form.Group>
        </Row>
        <Form.Group controlId="Username" className="mb-2">
          <Form.Label> Username: </Form.Label>
          <Form.Control className="loginName" type="Username" placeholder="Create Username" />
        </Form.Group>
        <Form.Group controlId="formGroupPassword" className="mb-2">
          <Form.Label>Password:</Form.Label>
          <Form.Control className="loginPassword" type="password" placeholder=" Create Password" />
        </Form.Group>
        <ButtonGroup>
          <Button variant="dark" className = "registerButton mx-1 rounded" href="/">Return to Login</Button>
          <Button variant="danger" className = "enterButton mx-1 rounded" onClick= {createAccount}> Enter <Image className = "enterImage" src={enterPandaIcon}/> </Button>
        </ButtonGroup>
      </Form>
    </div>

  );
}