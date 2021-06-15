
<?php

	$inData = getRequestInfo();
	
	$id = 0;
	$firstName = "";
	$lastName = "";

	$conn = new mysqli("localhost", "PandaMan", "JackBlack2008", "PANDA"); 	
	if($conn->connect_error)
	{
		http_response_code(503); // Service Unavailable, database
		returnWithError($conn->connect_error);
	}
	else
	{
		// Attempt to retrieve login information.
		$login_attempt = $conn->prepare("SELECT LoginId,FirstName,LastName FROM LOGINS WHERE Login=? AND Passcode=?");
		$login_attempt->bind_param("ss", $inData["login"], $inData["password"]);
		$login_attempt->execute();
		$login_result = $login_attempt->get_result();
		$login_attempt->close();

		if( $row = $login_result->fetch_assoc()  )
		{
			http_response_code(200); // Ok, user returned
			returnWithInfo($row["FirstName"], $row["LastName"], $row["LoginId"]);
		}
		else
		{
			// Checks if the username exists without compromising userdata.
			$user_exist = $conn->prepare("SELECT Login FROM LOGINS WHERE Login=?");
			$user_exist->bind_param("s", $inData["login"]);
			$user_exist->execute();
			$does_user_exist = $user_exist->get_result();
			$user_exist->close();
			
			// If the user exists, it is an incorrect password, else they don't exist.
			if ($does_user_exist->fetch_assoc())
			{
				http_response_code(401); // Unauthorized
				returnWithError("Incorrect Password.");
			}
			else
			{
				http_response_code(404); // Not Found
				returnWithError("No User with this Username found.");
			}
		}

		$conn->close();
	}
	
	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson($obj)
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError($err)
	{
		$retValue->error = $err;
		$retValue = json_encode($retValue);
		sendResultInfoAsJson($retValue);
	}
	
	function returnWithInfo( $firstName, $lastName, $id )
	{
		$retValue->loginId = $id;
		$retValue->firstName = $firstName;
		$retValue->lastName = $lastName;
		$retValue = json_encode($retValue);
		sendResultInfoAsJson($retValue);
	}
	
?>
