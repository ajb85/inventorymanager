<?php
error_reporting(E_ALL);
//Hiding the directory of the data in PHP
$directory = "./data/defaultUser/";
$extention = ".json";

//file name is given in the JS file, read here, and combined with dir/ext
$fileName = file_get_contents('php://input');
$data_file = $directory . $fileName . $extention;

// Loading file
$original_data = json_decode(file_get_contents($data_file));

// Return the current high score data to the server response
echo(json_encode($original_data));
?>
