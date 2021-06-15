<?php

    // pulls all results at once

	$conn = new mysqli("localhost", "PandaMan", "JackBlack2008", "PANDA");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
    $logins = array();
		$contacts = array();
   
		$stmtOne = $conn->prepare("select * from LOGINS");
		$stmtOne->execute();
		$resultOne = $stmtOne->get_result();
		$stmtOne->close();
		while($rowOne = $resultOne->fetch_assoc())
		{
            // $rowOne['LoginId'], $rowOne['FirstName'], $rowOne['LastName'], $rowOne['Login'], $rowOne['Passcode']
            $logins[] = $rowOne;
		}
   
    $stmtTwo = $conn->prepare("select * from CONTACTS");
    $stmtTwo->execute();
    $resultTwo = $stmtTwo->get_result();
    $stmtTwo->close();
		while($rowTwo = $resultTwo->fetch_assoc())
		{
       
			// $rowTwo['ContactId'], $rowTwo['FirstName'], $rowTwo['LastName'], $rowTwo['Email'], $rowTwo['Phone'], $rowTwo['DOB'], $rowTwo['LoginID'], $rowTwo['TimeCreated']
            $contacts[] = $rowTwo;
		}
		
    $info = array();
		$info["logins"] = $logins;
		$info["contacts"] = $contacts;
    
		returnWithInfo( $info );
		
		$conn->close();
	}

	function getRequestInfo()
	{
        // input path for a php request.
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo( $searchResults )
	{
		$retValue = json_encode( $searchResults );
		sendResultInfoAsJson( $retValue );
	}
	
?>