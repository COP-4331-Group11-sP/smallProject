<?php

  $inData = getRequestInfo();

  $FirstName = $inData["FirstName"];
	$LastName = $inData["LastName"];
	$Email = $inData["Email"];
	$Phone = $inData["Phone"];
	$DOB = $inData["DOB"];
	$LoginId = $inData["LoginId"];
  $ContactId = $inData["ContactId"];
  
  $conn = new mysqli("localhost", "PandaMan", "JackBlack2008", "PANDA");
	if ($conn->connect_error) returnWithError($conn->connect_error, 503, $conn);
 
   if(empty($ContactId)) returnWithError("ContactId was not passed.", 401, $conn);
   
   if(empty($FirstName)) returnWithError("First Name Field Empty", 400, $conn);
   else if(!filter_var($FirstName, FILTER_VALIDATE_REGEXP,
   array("options"=>array("regexp"=>"/^[a-zA-Z\s]+$/")))) 
   returnWithError("Improper first name formatting");
    

    if(empty($LastName)) returnWithError("Last Name Field Empty", 400, $conn);
    else if(!filter_var($LastName, FILTER_VALIDATE_REGEXP, 
    array("options"=>array("regexp"=>"/^[a-zA-Z\s]+$/")))) 
    returnWithError("Improper last name formatting");
	  

    if(empty($Email)) returnWithError("Email Field Empty", 400, $conn);
    if(!filter_var($Email, FILTER_VALIDATE_EMAIL)) 
   	returnWithError("Improper Email formatting : Ex. (JohnDoe@bellsouth.net)", 400, $conn);

    if(empty($Phone)) returnWithError("Phone Field Empty", 400, $conn);
    if(!preg_match("/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/", $Phone)) 
   	returnWithError("Improper phone number formatting : Ex. (123-456-7890", 400, $conn);

    if(empty($DOB)) returnWithError("Date of Birth Field Empty", 400, $conn);
    if (!preg_match("/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/",$DOB))
    returnWithError( "Improper Date of Birth formatting Ex. (03/05/2005)", 400, $conn);
    
  else{
  
  
    $contact_exist = $conn->prepare("SELECT ContactId FROM CONTACTS WHERE ContactId = ?");
		$contact_exist->bind_param("i", $ContactId);
		$contact_exist->execute();
		$does_contact_exist = $contact_exist->get_result();
		$contact_exist->close();
			
		if (!$does_contact_exist->fetch_assoc()){
		  returnWithError( "Contact ID is invalid", 401, $conn);
		}
      
		$stmt = $conn->prepare("UPDATE CONTACTS SET FirstName = ?, LastName = ?, Email =?, Phone = ?, DOB = ? WHERE ContactId = ? AND LoginId = ?");
		$stmt->bind_param("sssssii", $FirstName, $LastName, $Email, $Phone, $DOB, $ContactId, $LoginId);
		$stmt->execute();
		$stmt->close();
		$conn->close();
    Exit();
	}

	function getRequestInfo(){
    return json_decode(file_get_contents('php://input'), true);
  }

  function sendResultInfoAsJson($obj, $code){
    http_response_code($code);
    header('Content-type: application/json');
    echo $obj;
  }

  function returnWithError($err, $code, $conn){
    $conn->close();
    $retValue->error = $err;
    $retValue = json_encode($retValue);
    sendResultInfoAsJson($retValue, $code);
    exit();
  }
    
?>