import '../styles/contactPage.css';
import '../styles/App.css'
import pandaIconSVG from "../assets/pandaIconSVG.svg";
import biggerPandaIconSVG from "../assets/biggerPandaIconSVG.svg";
import {Form, Button, Image, Container, InputGroup} from 'react-bootstrap'
import ContactCard from '../components/ContactCard.js';
import {show,hide} from '../handlers/animationHandler.js';
import {displayContact, createContact} from '../handlers/contactHandler.js';
import React, { useState } from 'react';
import {checkLogin, doLogout} from '../handlers/loginHandler.js';
import NumberFormat from 'react-number-format';

function ContactPage() {
  const [cardList, setCardList] = useState([<></>]);

  setInterval(checkLogin(), 1000*10);

  async function handleSearch() {
    var contacts = await displayContact();
    setCardList([]);
    
    var cards = [];
    for (var i = 0; i < contacts.length; i++) 
    {
      cards.push(<ContactCard 
                  key={i+1} 
                  className="contactCardFormat" 
                  first={contacts[i].FirstName} 
                  last={contacts[i].LastName} 
                  DOB={contacts[i].DOB} 
                  phone={contacts[i].Phone} 
                  email={contacts[i].Email} 
                  id={contacts[i].ContactId}/>);
    }
    setCardList(cards);
  }
  
  
  return (
    <div onLoad={checkLogin}>
      <Button className="position-absolute m-3 logoutButton toBlur" onClick={doLogout}>Logout</Button>

      <div className="overlay"></div>

      <div className="popup-container position-fixed top-0 start-0 d-flex justify-content-center align-items-center vw-100 vh-100">
      <Form className="popup position-relative">
        <Image className="popup-img" src={biggerPandaIconSVG} roundedCircle />
        <Button className="btn-close position-absolute top-0 end-0 m-lg-5 m-3 popup-close" variant="link" aria-label="close" onClick={hide}></Button>
        <div style = {{color: "#13182b"}}>Please fill out the fields below:</div>
        
          <Form.Group as={Form.Row} className="mb-lg-2">
            <Form.Label>First Name:</Form.Label>
            <Form.Control className="popupFormFields fname rounded-3" placeholder="First Name" />
          </Form.Group>

          <Form.Group as={Form.Row} className="mb-lg-2">
            <Form.Label>Last Name:</Form.Label>
            <Form.Control className="popupFormFields lname rounded-3" placeholder="Last Name" />
          </Form.Group>

          <Form.Group as={Form.Row} className="mb-lg-2">
            <Form.Label>Phone:</Form.Label>
            <NumberFormat format="###-###-####" type="tel" className="popupFormFields phone rounded-3 form-control" placeholder="###-###-####" />
          </Form.Group>

          <Form.Group as={Form.Row} className="mb-lg-2">
            <Form.Label>Date of Birth:</Form.Label>
            <NumberFormat format="##/##/####" type="tel" className="popupFormFields dob rounded-3 form-control" placeholder="MM/DD/YYYY" />
          </Form.Group>

          <Form.Group as={Form.Row} className="mb-lg-2">
            <Form.Label>E-mail:</Form.Label>
            <Form.Control type="email" className="popupFormFields email rounded-3" placeholder="E-mail" />
          </Form.Group>

          <Button variant="danger" type ="button" className="addContactbutton btn-popup" onClick={createContact}>
            <Image className="btn-popup-img" src={pandaIconSVG} />
          </Button>

          <p className="errorText createContactError"></p>
      </Form>
      </div>

      <Container className="toBlur sticky-top">
        <InputGroup className="mb-5" size="lg">
          <Form.Control className="searchBar border-end-0" placeholder="Search for Contact..." />
          <InputGroup.Append>
            <Button variant="link" size="lg" className="searchButton border-start-0" onClick={handleSearch}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
              </svg>
            </Button>
            <Button variant="danger" size="sm" type="button" className="addContactbutton ms-3" 
            onClick={() =>{
                            show();
                            var toClear = document.querySelectorAll(".popupFormFields");
                            for (var i = 0; i < toClear.length; i++) {
                              toClear[i].value = "";
                            }
                            document.querySelector(".createContactError").innerHTML = "";
                          }}>
              <Image className="addContactImg"  src={pandaIconSVG}/>
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Container>
      
      
      <Container className="containerFormat justify-content-center d-flex flex-wrap gap-3 rounded-3 mt-3 toBlur">
            {cardList}
      </Container>  
      
    </div>
  );
}

export default ContactPage;
