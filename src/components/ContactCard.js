import '../styles/contactCard.css';
import '../styles/App.css';
import normalPandaIconSVG from "../assets/normalPandaIconSVG.svg";
import {updateContact, deleteContact} from '../handlers/contactHandler.js';
import {Card,Image,FormControl,Button, Popover, Overlay, ButtonGroup} from 'react-bootstrap'
import React, { useRef, useState } from 'react';
import NumberFormat from 'react-number-format';


export default function ContactCard(props) {
    const [isEditing, setEditingState] = useState(false);
    const [target, setTarget] = useState(null);
    const [show, setShow] = useState(false);
    const [alive, setAlive] = useState(true);

    const firstRef = useRef(null);
    const lastRef = useRef(null);
    const dobRef = useRef(null);
    const phoneRef = useRef(null);
    const emailRef = useRef(null);
    const delErrRef = useRef(null);
    const updErrRef = useRef(null);

    const [fields, setFields] = useState({first: props.first, 
                                          last: props.last, 
                                          DOB: props.DOB, 
                                          phone: props.phone, 
                                          email: props.email, 
                                          id: props.id});

    var nameField = null;
    if (isEditing) {
        nameField = [<FormControl size="sm" className="editField" ref={firstRef} placeholder="First" defaultValue={fields.first} />,
                     <FormControl size="sm" className="editField" ref={lastRef} placeholder="Last" defaultValue={fields.last} />];
    } else {
        nameField = <h1>{fields.first} {fields.last}</h1>;
    }
    var dobField = null;
    if (fields.DOB) {
        dobField =  generateField("Birthday", fields.DOB, dobRef);
    }
    var phoneField = null;
    if (fields.phone) {
        phoneField = generateField("Phone", fields.phone, phoneRef);
    }
    var emailField = null;
    if (fields.email) {
        emailField = generateField("Email", fields.email, emailRef);
    }

    function generateField(fieldText, fieldProp, identifier) {
        var fieldInner = <Card.Text ref={identifier}>{fieldProp}</Card.Text>;
        if (isEditing) {
            fieldInner = <FormControl size="sm" className={"editField"} ref={identifier} placeholder={fieldText} defaultValue={fieldProp} />;
            if (fieldText == "Phone") {
                fieldInner = <NumberFormat type="tel" format="###-###-####" className="editField form-control form-control-sm" getInputRef={identifier} placeholder="###-###-####" defaultValue={fieldProp} />;
            }
            if (fieldText == "Birthday") {
                fieldInner = <NumberFormat type="tel" format="##/##/####" className="editField form-control form-control-sm" getInputRef={identifier} placeholder="MM/DD/YYYY" defaultValue={fieldProp} />;
            }
        }
        var fields =    <div className="fieldContainer rounded shadow-sm mb-3">
                            <div style={{textAlign: "start", fontSize: "0.8em"}}>{fieldText}</div>
                            {fieldInner}
                        </div>;
        return fields;
    }

    async function submitEdit() {
        var newFirst = firstRef.current.value;
        var newLast = lastRef.current.value;
        var newDOB = dobRef.current.value;
        var newPhone = phoneRef.current.value;
        var newEmail = emailRef.current.value;
        var newFields = {first: newFirst, last: newLast, DOB: newDOB, phone: newPhone, email: newEmail, id: fields.id};

        var response = await updateContact(newFields);
        if (response[0]) {
            setFields(newFields);
            closeEdit();
        }
        updErrRef.current.innerHTML = response[1];
    }

    function closeEdit() {
        setEditingState(false);
    }

    function edit() {
        if (!isEditing) {
            setEditingState(true);
        } else {
            submitEdit();
        }
    }

    async function handleDelete() {
        var response = await deleteContact(fields.id);
        if (response[0]) {
            setAlive(false);
            setShow(!show);
        } 
        delErrRef.current.innerHTML = response[1];
    }

    function openPopup(event) {
        setShow(!show);
        setTarget(event.target);
    }

    function closePopup() {
        setShow(!show);
    }

    return (
        <Card style={props.style} className={[props.className, "shadow-lg ", alive ? " ":" d-none"]}>
            <div className="d-flex justify-content-between">
                <Button className={["cardBack ", isEditing ? " ":" invisible"]} variant="link" onClick={closeEdit}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="black" class="bi bi-arrow-left-circle" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
                    </svg>
                </Button>
                <Button className="cardEdit" variant="dark" onClick={edit}>{isEditing ? "Confirm":"Edit"}</Button>
            </div>
            <Card.Title>
                <Image className="Image mb-2" src={normalPandaIconSVG} roundedCircle />
                <p ref={updErrRef} className={["errorText ", isEditing ? " ":" d-none"]}></p>
                {nameField}
            </Card.Title>
            <Card.Body>
                {dobField}
                {phoneField}
                {emailField}
                <Button variant="danger" className={["cardDelete w-100 ", isEditing ? " ":" invisible"]} onClick={openPopup}>Delete</Button>
            </Card.Body>
            <Overlay show={show} target={target} placement="top">
                <Popover id="popover-contained" className="deletePopup p-1 shadow">
                    <p>Are you sure you would like to delete this contact? (If not, click delete again.)</p>
                    <p ref={delErrRef} className="errorText"></p>
                    <ButtonGroup>
                        <Button variant="dark" className="mx-1 rounded-1" onClick={closePopup}>No, Take me back.</Button>
                        <Button variant="danger" className="mx-1 rounded-1" onClick={handleDelete}>Yes, Dew it.</Button>
                    </ButtonGroup>
                </Popover>
            </Overlay>
        </Card>
    );
}
