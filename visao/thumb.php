<?php

header('Pragma: public');
header('Cache-Control: max-age=86400');
header('Expires: '. gmdate('D, d M Y H:i:s \G\M\T', time() + 86400));

$wid = (int) $_GET["w"];
$hei = (int) $_GET["h"];

$stringArquivo = "../arquivos/" . $_GET['img'];
$im = new Imagick($stringArquivo);
$im->setImageFormat("png");
$im->setResolution((int)$_GET["w"], (int)$_GET["h"]);
header("Content-Type: image/png");

echo $im;