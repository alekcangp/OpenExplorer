<?php
$idu = $_POST['idu'];
$form = $_POST['form'];

$servername = "localhost";
$uname = "id10228016_openexplorer";
$password = "Darina57";
$dbname = "id10228016_openexplorer";

// Create connection
$conn = new mysqli($servername, $uname, $password, $dbname);
// Check connection
if ($conn->connect_error) {
   // die("Connection failed: " . $conn->connect_error);
} 

$sql = "INSERT INTO openexplorer (id, form) VALUES ('$idu', '$form')";

if ($conn->query($sql) === TRUE) {
    echo 1;//"New record created successfully";
  } else {

    $sql = "UPDATE openexplorer SET form='$form' WHERE id='$idu'";

    if ($conn->query($sql) === TRUE) {
        echo 1;//"Record updated successfully";
    } else {
    echo "Error" . $sql . "<br>" . $conn->error;
  }
    
}

$conn->close();

?>