<?php

    $inData = getRequestInfo();
    $name = $inData["search"];
    $LoginId = $inData["LoginId"];
    
    $names = explode(" ", $name);
    

    // Check connection
    $conn = new mysqli("localhost", "PandaMan", "JackBlack2008", "PANDA");
	  if ($conn->connect_error) returnWithError($conn->connect_error, 503, $conn);

    else if(count($names) > 1){
    
      $contacts = array();
		 
      $stmt = $conn->prepare("SELECT * FROM CONTACTS WHERE ((FirstName LIKE '%$names[1]%' AND LastName LIKE '%$names[0]%')
      OR(FirstName LIKE '%$names[0]%' AND LastName LIKE '%$names[1]%')) AND LoginId = $LoginId");
      $stmt->execute();
		  $result = $stmt->get_result();
      $stmt->close();
	  	while($row = $result->fetch_assoc()){
            
            $contacts[] = array("FirstName"=>$row[FirstName],"LastName"=>$row[LastName],"Email"=>$row[Email],"Phone"=>$row[Phone],"DOB"=>$row[DOB],"ContactId"=>$row[ContactId]) ;
		  }
      returnWithInfo( $contacts ); 
		  $conn->close();
		  Exit();
	  }
     
     else{
    
      $contacts = array();
		 
      $stmt = $conn->prepare("SELECT * FROM CONTACTS WHERE (FirstName LIKE '%$name%' OR LastName LIKE '%$name%') AND LoginId = $LoginId");
      $stmt->execute();
		  $result = $stmt->get_result();
      $stmt->close();
	  	while($row = $result->fetch_assoc()){
            
            $contacts[] = array("FirstName"=>$row[FirstName],"LastName"=>$row[LastName],"Email"=>$row[Email],"Phone"=>$row[Phone],"DOB"=>$row[DOB],"ContactId"=>$row[ContactId]) ;
		  }
      returnWithInfo( $contacts ); 
		  $conn->close();
		  Exit();
	  }
     
    function getRequestInfo(){
      return json_decode(file_get_contents('php://input'), true);
	  }

	  function sendResultInfoAsJson( $obj ){
	  	header('Content-type: application/json');
		  echo $obj;
	  }
	
	  function returnWithError( $err ){
		  $retValue = '{"error":"' . $err . '"}';
		  sendResultInfoAsJson( $retValue );
	  }
     
  	function returnWithInfo( $searchResults ){
		  $retValue = json_encode( $searchResults );
		  sendResultInfoAsJson( $retValue );
	  }
    
    mysqli_close($con);
?>
