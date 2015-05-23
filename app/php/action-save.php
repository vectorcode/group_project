<?php
	use PHPImageWorkshop\ImageWorkshop; // Use the namespace of ImageWorkshop
	require_once('PHPImageWorkshop/ImageWorkshop.php'); // Be sure of the path to the class

	$backUrl = $_POST['background']['url'];
 	$waterUrl = $_POST['watermark']['url'];
 	$waterOpacity = $_POST['watermark']['opacity'];
 	$waterPositionX = $_POST['watermark']['posX'];
 	$waterPositionY = $_POST['watermark']['posY'];

	$backgroundLayer = ImageWorkshop::initFromPath($backUrl);
 	$watermarkLayer = ImageWorkshop::initFromPath($waterUrl);
 	$watermarkLayer->opacity($waterOpacity);
 	$backgroundLayer->addLayer(1, $watermarkLayer, $waterPositionX, $waterPositionY, "LT");
 	

 	// Saving the result
	$dirPath = "../uploads/2015";
	$filename = time().'.png';
	$createFolders = true;
	$imageQuality = 95; // useless for GIF, usefull for PNG and JPEG (0 to 100%)
  
	$backgroundLayer->save($dirPath, $filename, $createFolders, $imageQuality);
    

  
?>