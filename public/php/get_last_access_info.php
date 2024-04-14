<?php

include_once("db_config.php");


$sql = "SELECT country, access_time FROM covid_access_logs ORDER BY access_time DESC LIMIT 1";
$result = $conn->query($sql);

if ($result->num_rows > 0) {

    $row = $result->fetch_assoc();


    echo json_encode($row);
} else {
    echo json_encode(array('country' => 'Nenhum', 'access_time' => 'Nenhum'));
}

$conn->close();
