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

$qtdComprou = $conexao->comandoArray("select count(1) as qtd from cliente_produto where COD_PRODUTO = {$_POST["codproduto"]}");

if(isset($qtdComprou["qtd"]) && $qtdComprou["qtd"] != NULL && $qtdComprou["qtd"] > 0){
    die(json_encode(array('mensagem' => 'Curso não pode ser excluido, pois ja foi comprado por: '. $qtdComprou["qtd"]. ' clientes', 'situacao' => false)));
}

$produto  = new Produto($conexao);
$produto->COD_PRODUTO = $_POST["codproduto"];

$msg_retorno = '';
$sit_retorno = true;

$res = $produto->excluir();

if ($res === FALSE) {
    $msg_retorno = 'Erro ao excluir produto! Causado por:' . $conexao->mostraErro();
    $sit_retorno = false;
} else {
    $msg_retorno = "Produto excluido com sucesso!";
}

echo json_encode(array('mensagem' => $msg_retorno, 'situacao' => $sit_retorno));
