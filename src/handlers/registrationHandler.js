import md5 from './md5.js';
import {saveCookie} from './cookieHandler.js';
var urlBase = "http://panda-contact.xyz";
var apiLoc = "/LAMPAPI";
var apiExtension = "php";

var loginId = 0;
var firstName = "";
var lastName = "";

function createAccount()
{
	firstName = document.querySelector(".firstName").value;
	lastName = document.querySelector(".lastName").value;
	var login = document.querySelector(".loginName").value;
	var password = document.querySelector(".loginPassword").value;
	var errorDisplay = document.querySelector(".registerError");

	console.log(password);

	if(password.length < 8)
	{
		errorDisplay.innerHTML= "Passwords cannot be less than 8 characters. Please try again."; 
		return;
	}
	else if(password.length > 160)
	{
		errorDisplay.innerHTML= "Passwords cannot be more than 160 characters. Please try again.";
		return;
	}
	else if(password.indexOf(" ") != -1)
	{
		errorDisplay.innerHTML= "Passwords cannot include any white spaces. Please try again.";
		return;
	}
	else if(password.indexOf("!") != -1 || password.indexOf("%") != -1 || password.indexOf("$") != -1 || password.indexOf("@") != -1 || password.indexOf("#") != -1)
	{
		errorDisplay.innerHTML= "Passwords cannot contain the following special characters: !, %, $, @. Please try again.";
		return;
	}
	var hash = md5(password);
	
	var jsonPayload = JSON.stringify({firstName: firstName, lastName: lastName, login: login, password: hash});
	var url = urlBase + apiLoc + '/CreateAccount.' + apiExtension;
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4)
			{
				switch(this.status)
				{
					case 200:
						errorDisplay.innerHTML = "This username already exists, please sign in.";
						break;
					case 201:
						var jsonObject = JSON.parse(xhr.responseText);
						var loginId = jsonObject.loginId;
						saveCookie(loginId);
						window.location.href = "/contact";
						break;
					case 400:
						errorDisplay.innerHTML = "Invalid type of input in one or more fields. Please try again.";
						break;
					case 503:
						errorDisplay.innerHTML = "An error occured. Our pandas are working on it!";
						break;
				}
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
	}
	
}

export {createAccount}; 



