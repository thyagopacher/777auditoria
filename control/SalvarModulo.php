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
$modulo  = new Modulo($conexao);

$variables = (strtolower($_SERVER['REQUEST_METHOD']) == 'GET') ? $_GET : $_POST;
foreach ($variables as $key => $value) {
    $modulo->$key = $value;
}

$msg_retorno = '';
$sit_retorno = true;

if(isset($modulo->codmodulo) && $modulo->codmodulo != NULL && $modulo->codmodulo != ""){
    $res = $modulo->atualizar();
}else{
    $res = $modulo->inserir();
}

if ($res === FALSE) {
    $msg_retorno = 'Erro ao salvar modulo! Causado por:' . $conexao->mostraErro();
    $sit_retorno = false;
} else {
    $msg_retorno = "Modulo salvo com sucesso!";
}

echo json_encode(array('mensagem' => $msg_retorno, 'situacao' => $sit_retorno));
