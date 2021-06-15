import { readCookie } from './cookieHandler.js';
import {hide} from './animationHandler.js';

var urlBase = "http://panda-contact.xyz";
var apiLoc = "/LAMPAPI";
var apiExtension = "php";

async function displayContact()
{
    var searchBar = document.querySelector(".searchBar").value;
    var jsonPayload = JSON.stringify({ LoginId: readCookie(), search: searchBar });
    var url = urlBase + apiLoc + '/Search.' + apiExtension;

    var response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: jsonPayload
    });

    switch (response.status) {
        case 200:
            //json object contains list of contacts for this user
            var contacts = await response.json();
            return contacts;
        case 404:
            break;
        case 503:
            console.log("An error occured, try again.");
            break;
    }
}

async function createContact()
{
	// gets user input
	var first = document.querySelector(".fname").value;
	var last = document.querySelector(".lname").value;
	var number = document.querySelector(".phone").value;
	var DOB = document.querySelector(".dob").value;
	var Email = document.querySelector(".email").value;
    var createError = document.querySelector(".createContactError");
	

	var jsonPayload = JSON.stringify({LoginId: readCookie(), FirstName: first, LastName: last, Phone: number, DOB: DOB, Email: Email});
	var url = urlBase + apiLoc + '/Create.' + apiExtension;
    var response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: jsonPayload
    });

    switch (response.status) {
        case 200:
            hide();
            break;
        case 201:
            hide();
            break;
        case 401:
            createError.innerHTML = "Not logged in.";
            break;
        case 503:
            createError.innerHTML ="An error occured, try again.";
            break;
        case 400:
            createError.innerHTML = "Contact fields improperly formatted.";
            break;
    }

}

async function updateContact(fields) {
    var jsonPayload = JSON.stringify(
        {LoginId: readCookie(), 
        FirstName: fields.first, 
        LastName: fields.last, 
        Phone: fields.phone, 
        DOB: fields.DOB, 
        Email: fields.email,
        ContactId: fields.id});

	var url = urlBase + apiLoc + '/Update.' + apiExtension;

    var response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: jsonPayload
    });

    switch (response.status) {
        case 200:
            return [true, ""];
        case 401:
            return [false, "Not logged in."];
        case 503:
            return [false, "An error occured, try again."];
        case 400:
            return [false, "Contact fields improperly formatted."];
        default:
            return [false, "An error occured, try again."];
    }
}

async function deleteContact(id) {
    var jsonPayload = JSON.stringify({ContactId: id});
    var url = urlBase + apiLoc + '/Delete.' + apiExtension;

    var response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: jsonPayload
    });

    switch (response.status) {
        case 200:
            return [true, ""];
        case 401:
            return [false, "Not logged in."];
        case 503:
            return [false, "An error occured, try again."];
        default:
            return [false, "An error occured, try again."];
    }
}

export {displayContact, createContact, updateContact, deleteContact};