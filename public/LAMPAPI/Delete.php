<?php

    $inData = getRequestInfo();
    $ContactId = $inData["ContactId"];
    
    $conn = new mysqli("localhost", "PandaMan", "JackBlack2008", "PANDA");
	  if ($conn->connect_error) returnWithError( $conn->connect_error );
     
    if(empty($ContactId)) returnWithError("Contact ID not passed");
    
    else
	  {
      $contact_exist = $conn->prepare("SELECT ContactId FROM CONTACTS WHERE ContactId = ?");
			$contact_exist->bind_param("i", $ContactId);
			$contact_exist->execute();
			$does_contact_exist = $contact_exist->get_result();
			$contact_exist->close();
			
			if (!$does_contact_exist->fetch_assoc()){
				returnWithError( "Contact ID is invalid", 401, $conn);
			}
      
		  $stmt = $conn->prepare("DELETE FROM CONTACTS WHERE ContactId = ?");
		  $stmt->bind_param("i",$ContactId);
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