<?php

/* 
 * @author Thyago Henrique Pacher - thyago.pacher@gmail.com
 */

session_start();
if(!isset($_SESSION)){
    die(json_encode(array('mensagem' => 'Sua sessão caiu, por favor logue novamente!!!', 'situacao' => false)));
}  

function __autoload($class_name) {
    if (file_exists("../model/" . $class_name . '.php')) {
        include "../model/" . $class_name . '.php';
    } elseif (file_exists("../visao/" . $class_name . '.php')) {
        include "../visao/" . $class_name . '.php';
    } elseif (file_exists("./" . $class_name . '.php')) {
        include "./" . $class_name . '.php';
    }
}

$conexao = new Conexao();
$banner  = new Banner($conexao);

$variables = (strtolower($_SERVER['REQUEST_METHOD']) == 'GET') ? $_GET : $_POST;
foreach ($variables as $key => $value) {
    $banner->$key = $value;
}
if (isset($_FILES['arquivo'])) {
    $upload = new Upload($_FILES['arquivo']);
    if ($upload->erro == '') {
        $banner->arquivo = $upload->nome_final;
    }
}

$msg_retorno = '';
$sit_retorno = true;

if(isset($banner->codbanner) && $banner->codbanner != NULL && $banner->codbanner != ""){
    $res = $banner->atualizar();
}else{
    $res = $banner->inserir();
}

if ($res === FALSE) {
    $msg_retorno = 'Erro ao salvar banner! Causado por:' . mysqli_error($conexao->conexao);
    $sit_retorno = false;
} else {
    $msg_retorno = "Banner salvo com sucesso!";
    $cache = new Cache();
    $cache->save('banners', '', '1 minutes');
}

if (isset($upload->erro) && $upload->erro != NULL && $upload->erro != '') {
    $msg_retorno .= ' Problemas com o envio do arquivo: ' . $upload->erro;
}
echo json_encode(array('mensagem' => $msg_retorno, 'situacao' => $sit_retorno));
