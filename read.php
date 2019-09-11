<?php

$servername = "**********";
$uname = "**********";
$password = "**********";
$dbname = "**********";

// Create connection
$conn = new mysqli($servername, $uname, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "SELECT form FROM openexplorer";

$result = $conn->query($sql);

$data = array();



	

//while($row = mysqli_fetch_array($result)){
  //  $column[] = $row[$key];
//}


while ($row = mysqli_fetch_array($result)) {
    array_push($data, $row["form"]);
}
echo json_encode($data);



//while($row = mysqli_fetch_array($result)) 
//{
//echo $row['form'].",";
//}
//$result = $conn->query($sql);
//echo $result;
//if ($result->num_rows > 0) {
    // output data of each row
   // $row = $result->fetch_assoc();
  //  $arrayx = $row["addresses"];
   // if ($arrayx == '') {$arrayx = "[]";}
    
//} else {  $arrayx = "[]"; }
//echo "Error" . $sql . "<br>" . $conn->error;

//if ($conn->query($sql) === TRUE) {
    //echo "Read successfully";
//} else {
//echo "Error3" . $sql . "<br>" . $conn->error;
//}


$conn->close();

?>