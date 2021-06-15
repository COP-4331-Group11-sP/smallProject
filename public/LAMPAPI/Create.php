<?php
  $inData = getRequestInfo();

	  $FirstName = $inData["FirstName"];
	  $LastName = $inData["LastName"];
	  $Email = $inData["Email"];
	  $Phone = $inData["Phone"];
	  $DOB = $inData["DOB"];
	  $LoginId = $inData["LoginId"];

    $conn = new mysqli("localhost", "PandaMan", "JackBlack2008", "PANDA");
	  if ($conn->connect_error) returnWithError($conn->connect_error, 503, $conn);
 
    if(empty($FirstName)) returnWithError("First Name cannot be empty.", 400, $conn);
    else if(!filter_var($FirstName, FILTER_VALIDATE_REGEXP,
    array("options"=>array("regexp"=>"/^[a-zA-Z\s]+$/")))) 
    returnWithError("Improper first name formatting", 400, $conn);
    

    if(empty($LastName)) returnWithError("Last Name cannot be empty.", 400, $conn);
    else if(!filter_var($LastName, FILTER_VALIDATE_REGEXP, 
    array("options"=>array("regexp"=>"/^[a-zA-Z\s]+$/")))) 
    returnWithError("Improper last name formatting", 400, $conn);
	  

    if(empty($Email)) returnWithError("Email cannot be empty.", 400, $conn);
    if(!filter_var($Email, FILTER_VALIDATE_EMAIL)) 
   	returnWithError("Improper Email formatting : Ex. (JohnDoe@bellsouth.net)", 400, $conn);

    if(empty($Phone)) returnWithError("Phone number cannot be empty.", 400, $conn);
    if(!preg_match("/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/", $Phone)) 
   	returnWithError("Improper phone number formatting : Ex. (123-456-7890", 400, $conn);

    if(empty($DOB)) returnWithError("Date of birth cannot be empty.", 400, $conn);
    if (!preg_match("/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/",$DOB))
    returnWithError( "Improper Date of Birth formatting Ex. (03/05/2005)", 400, $conn);
	
	  else
	  {
		  $stmt = $conn->prepare("INSERT into CONTACTS (FirstName, LastName, Email, Phone, DOB, LoginId) VALUES(?,?,?,?,?,?)");
		  $stmt->bind_param("sssssi", $FirstName, $LastName, $Email, $Phone, $DOB, $LoginId);
		  $stmt->execute();
		  $stmt->close();
		  $conn->close();
		  Exit();
	  }

	  function getRequestInfo()
    {
        return json_decode(file_get_contents('php://input'), true);
    }

    function sendResultInfoAsJson($obj, $code)
    {
        http_response_code($code);
        header('Content-type: application/json');
        echo $obj;
    }

    function returnWithError($err, $code, $conn)
    {
        $conn->close();
        $retValue->error = $err;
        $retValue = json_encode($retValue);
        sendResultInfoAsJson($retValue, $code);
        exit();
    }
?>