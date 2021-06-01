import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import {Button, Image, Form, Row, Col, Container, Nav, Navbar} from 'react-bootstrap';
import pandaIconSVG from "./pandaIconSVG.svg"
import enterPandaIcon from "./vers2EnterPandaIcon.svg"

function App() {
  return (
    <div className="App">

    <br/><br/>

    {/*TITLE + PANDA ICON*/}
    <Navbar className = "pandaHeader">
          <p className = "title">&nbsp;&nbsp;&nbsp;&nbsp;PANDA&nbsp;</p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Image className = "Image" src={pandaIconSVG} roundedCircle/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<p className = "title"> CONTACT</p>
    </Navbar>

    <br/>

    {/*WELCOME MESSAGE UNDER TITLE*/}
    <Navbar className = "welMessage">
    Welcome! Please login below!
    </Navbar>  

    <br/>

    <Container className="formCleanup" >
      <Form>
          <Form.Label>Username</Form.Label>
            <Form.Control placeholder="Enter Username" />
            <br/>
          <Form.Label>Password</Form.Label>
            <Form.Control placeholder="Enter Password" />

            <br/>

            <Button className = "registerButton"> &nbsp;&nbsp;&nbsp;Register &nbsp;&nbsp; 
            </Button>

          <Button className = "enterButton"> Enter <Image className = "enterImage" src={enterPandaIcon}/> 
          </Button>
      </Form>
     </Container>
     </div>
  );
}

export default App;

