
import md5 from './md5.js'
import {readCookie, saveCookie} from './cookieHandler.js';
var urlBase = "http://panda-contact.xyz";
var apiLoc = "/LAMPAPI";
var apiExtension = "php";


function doLogin()
{
	var login = document.querySelector(".usernameInput").value;
	var password = document.querySelector(".passwordInput").value;
	var errorDisplay = document.querySelector(".loginError");
    var hash = md5( password );
	
	var jsonPayload = JSON.stringify({login: login, password: hash});
	var url = urlBase + apiLoc + '/Login.' + apiExtension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
            if (this.readyState == 4) 
            {
                switch (this.status) 
                {
                    case 200:
                      
                        var jsonObject = JSON.parse( xhr.responseText );
                        var loginId = jsonObject.loginId;
                        saveCookie(loginId);
						window.location.href = "/contact";
                    	break;
					case 401:
						errorDisplay.innerHTML= "Your password is incorrect. Please try again.";
						break;
					case 404:
						errorDisplay.innerHTML= "Your username was not found. Please try again or register below.";
						break;
					case 503:
						errorDisplay.innerHTML= "An error occured. Our pandas are working on it!";
						break;
					case 400:
						errorDisplay.innerHTML= "Your username or password was formatted incorrectly. Please try again!";
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

function checkLogin() {
	var urlBase = "http://panda-contact.xyz";
	console.log(readCookie());
	if ((readCookie() == -1 || !readCookie()) && window.location.href == urlBase + "/contact") {
		window.location.href = "/";
	} else if (readCookie() > -1 && (window.location.href == urlBase + "/" || window.location.href == urlBase + "/register/")) {
		window.location.href = "/contact";
	}
}

function doLogout()
{
	saveCookie(-1);
	window.location.href = "/";
}

export {doLogin, doLogout, checkLogin}; 



