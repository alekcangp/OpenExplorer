<?php

$ch = curl_init();
$headers = array(
'Accept: application/json',
'Content-Type: application/json',
'Authorization: op_pk_1c622ab2-85cf-46b8-bae6-8bcde9520f05'

);


//$prop = array('name'=> 'property_name','type'=> 'STRING','defaultValue'=> 'property_value');

//$data = array('openKey'=>'op_pk_1c622ab2-85cf-46b8-bae6-8bcde9520f05','developerAddress'=>'0xd62808C0bbc51f2370a184E08a1E24D3E3bE7483',
//'description'=>'test','fiatAmount'=>'1',
//'currency'=>'USD','conversionAmount'=>'0.1',
//'properties'=> array($prop)
 //);
//$data = json_encode($data);
//echo $data;

curl_setopt($ch, CURLOPT_URL, "https://api.openfuture.io/api/scaffolds/0x4Fc2AC2C62BfB52da97215028FaAC00fCFB443BF/summary");
curl_setopt($ch, CURLOPT_POST, 0);
//curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt( $ch,CURLOPT_SSL_VERIFYPEER, false );


// Timeout in seconds
//curl_setopt($ch, CURLOPT_TIMEOUT, 1);

$authToken = curl_exec($ch);
echo $authToken;

curl_close($ch);
  
?>