
<?php

    $inData = getRequestInfo();

    $firstName = $inData["firstName"];
    $lastName = $inData["lastName"];
    $login = $inData["login"];
    $password = $inData["password"];


    $conn = new mysqli("localhost", "PandaMan", "JackBlack2008", "PANDA"); 	
    if($conn->connect_error)
    {
        returnWithError($conn->connect_error, 503, $conn); // Service Unavailable, database
    }
    else
    {
        if (empty($firstName)) {
            returnWithError("First Name cannot be empty.", 400, $conn);
        } elseif (empty($lastName)) {
            returnWithError("Last Name cannot be empty.", 400, $conn);
        } elseif (empty($login)) {
            returnWithError("Login cannot be empty.", 400, $conn);
        } elseif (empty($password)) {
            returnWithError("Password cannot be empty.", 400, $conn);
        }


        $validation = $conn->prepare("SELECT Login FROM LOGINS WHERE Login=?");
        $validation->bind_param("s", $inData["login"]);
        $validation->execute();
        $validation_result = $validation->get_result();
        $validation->close();

        if ( $row = $validation_result->fetch_assoc() )
        {
            returnWithError("Username already exists.", 200, $conn); // Ok, but error);
        }
        else
        {
            $stmt = $conn->prepare("INSERT INTO LOGINS (FirstName, LastName, Login, Passcode) VALUES (?,?,?,?)");
            $stmt->bind_param("ssss", $inData["firstName"], $inData["lastName"], $inData["login"], $inData["password"]);
            $stmt->execute();
            $stmt->close();

            $loginId = $conn->prepare("SELECT LoginId FROM LOGINS WHERE Login=? and Passcode=?");
            $loginId->bind_param("ss", $inData["login"], $inData["password"]);
            $loginId->execute();
            $loginId_result = $loginId->get_result();
            $loginId->close();
            $row = $loginId_result->fetch_assoc();
            
            $json_result["loginId"] = $row["LoginId"];

            sendResultInfoAsJson(json_encode($json_result), 201); // Created
        }

        $conn->close();
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