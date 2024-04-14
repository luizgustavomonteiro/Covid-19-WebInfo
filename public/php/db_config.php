<?php

$servername = "localhost";
$database = "datacovid";
$username = "root";
$password = "";


$conn = new mysqli($servername, $username, $password, $database);


if ($conn->connect_error) {
    die("Erro ao conectar ao banco de dados: " . $conn->connect_error);
} else {
    die("Conexão com o banco de dados efetuada com sucesso!");
}
