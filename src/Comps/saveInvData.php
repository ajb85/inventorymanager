<?php

error_reporting(E_ALL);
//Attempt to hide location of data files
//Eventually "defaultUser" could be replaced by account name
$directory = "./data/defaultUser/";
$extention = ".json";

// get_contents = [dataToSave, dir+fileName]
$raw_data = json_decode(file_get_contents('php://input'));
$new_data = $raw_data[0];
$fileName = $raw_data[1];
echo(json_encode($new_data));
echo($fileName);
$data_file = $directory . $fileName . $extention;

$original_data = json_decode(file_get_contents($data_file));

//modifyList gives an array of objects.  Everything else gives an object.
//If modifyList, everything in $new_data is the complete new file.
//Otherwise, the object is just being updated with the inputted data.
if (is_array($new_data)) {
  $original_data = $new_data;
} else {
  foreach($new_data as $key => $value) {
      $original_data->$key = $value;
  }
}
//Test to see if the correct file is being accessed
echo($data_file);

file_put_contents($data_file, json_encode($original_data));

?>
