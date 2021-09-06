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

date_default_timezone_set('America/Sao_Paulo');
$conexao = new Conexao();
$pagina  = new Pagina($conexao);

$variables = (strtolower($_SERVER['REQUEST_METHOD']) == 'GET') ? $_GET : $_POST;
foreach ($variables as $key => $value) {
    $pagina->$key = $value;
}

$msg_retorno = '';
$sit_retorno = true;

if(isset($pagina->codpagina) && $pagina->codpagina != NULL && $pagina->codpagina != ""){
    $res = $pagina->atualizar();
}else{
    $res = $pagina->inserir();
}

if ($res == FALSE) {
    $msg_retorno = 'Erro ao salvar pagina! Causado por:'. $conexao->mostraErro();
    $sit_retorno = false;
} else {
    $msg_retorno = "Pagina salva com sucesso!";
}

if (isset($upload->erro) && $upload->erro != NULL && $upload->erro != '') {
    $msg_retorno .= ' Problemas com o envio do arquivo: ' . $upload->erro;
}
echo json_encode(array('mensagem' => $msg_retorno, 'situacao' => $sit_retorno));
