import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import {Button, Image, Form, Row, Col, Container, Nav, Navbar} from 'react-bootstrap';
import pandaIconSVG from "./pandaIconSVG.svg"
import enterPandaIcon from "./vers2EnterPandaIcon.svg"


function App() {
  return (
    <div className="App">

    <br/> <br/>
    {/*TITLE + PANDA ICON*/}
    <Navbar className = "pandaHeader">
          <p className = "title">&nbsp;&nbsp;&nbsp;&nbsp;PANDA&nbsp;</p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Image className = "Image" src={pandaIconSVG} roundedCircle/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<p className = "title"> CONTACT</p>
    </Navbar>

    <br/> 
    {/*WELCOME MESSAGE UNDER TITLE*/}
    <Navbar className = "welMessage">
    Welcome! You're one step away from a panda themed contact manager.
    </Navbar>
    
    <br/>
    {/*BOX WITH FORM INSIDE*/}
    <Container className = "formCleanup">
      <Form>
        <Form.Row>
          {/*FIRST NAME*/}
          <Col>
              <Form.Label> First Name: </Form.Label>
              <Form.Control placeholder="First name" />
          </Col>

          {/*LAST NAME*/}
          <Col>
              <Form.Label> Last Name: </Form.Label>
              <Form.Control placeholder="Last name" />
          </Col>
        </Form.Row>

        <br/>
         {/*USERNAME*/}
          <Form.Group controlId="Username">
            <Form.Label> Username: </Form.Label>
            <Form.Control type="Username" placeholder="Create Username" />
          </Form.Group>

         {/*PASSWORD*/}
         <Form.Group controlId="formGroupPassword">
           <Form.Label>Password:</Form.Label>
           <Form.Control type="password" placeholder=" Create Password" />
         </Form.Group>

        {/*BUTTON + MINI PANDA IMAGE*/}
         <Button className = "button"> Enter <Image className = "enterImage" src={enterPandaIcon}/> </Button>
      </Form> 
      </Container>
      
    </div>
  );
}

export default App;
