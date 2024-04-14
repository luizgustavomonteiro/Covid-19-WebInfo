<?php


include_once("db_config.php");


function logAccess($country)
{
    global $conn;


    $sql = "INSERT INTO covid_access_logs (country, access_time) VALUES (?, NOW())";


    $stmt = $conn->prepare($sql);


    $stmt->bind_param("s", $country);


    $stmt->execute();


    $stmt->close();
}

$country = $_POST['country'];
logAccess($country);
