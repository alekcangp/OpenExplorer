<?php

$servername = "localhost";
$uname = "id10228016_openexplorer";
$password = "Darina57";
$dbname = "id10228016_openexplorer";
$uid = $_POST['uid'];

// Create connection
$conn = new mysqli($servername, $uname, $password, $dbname);
// Check connection
if ($conn->connect_error) {
   // die("Connection failed: " . $conn->connect_error);
} 

$sql = "DELETE FROM openexplorer WHERE id = '$uid'";
$conn->query($sql);

$conn->close();

?>