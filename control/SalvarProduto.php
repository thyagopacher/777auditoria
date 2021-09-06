<?php

/*
 * @author Thyago Henrique Pacher - thyago.pacher@gmail.com
 */

session_start();
if (!isset($_SESSION)) {
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
$produto = new Produto($conexao);

$variables = (strtolower($_SERVER['REQUEST_METHOD']) == 'GET') ? $_GET : $_POST;
foreach ($variables as $key => $value) {
    $produto->$key = $value;
}
if(!isset($produto->aparecesite) || $produto->aparecesite == NULL || $produto->aparecesite == ""){
    $produto->aparecesite = "n";
}
if(!isset($produto->home) || $produto->home == NULL || $produto->home == ""){
    $produto->home = "n";
}
if (isset($_FILES['imagem'])) {
    $upload = new Upload($_FILES['imagem']);
    if ($upload->erro == '') {
        $produto->imagem = $upload->nome_final;
    }
}

if (isset($produto->NOM_PRODUTO) && $produto->NOM_PRODUTO != NULL && $produto->NOM_PRODUTO != "") {
    if (!isset($produto->desconto) || $produto->desconto == NULL || $produto->desconto == "") {
        $produto->desconto = '0,00';
    }
    if (!isset($produto->VAL_PRODUTO) || $produto->VAL_PRODUTO == NULL || $produto->VAL_PRODUTO == "") {
        $produto->VAL_PRODUTO = '0,00';
    }
}

$msg_retorno = '';
$sit_retorno = true;

if (isset($produto->COD_PRODUTO) && $produto->COD_PRODUTO != NULL && $produto->COD_PRODUTO != "") {
    $res = $produto->atualizar();
} else {
    $sql = "select COD_PRODUTO 
    from produto where NOM_PRODUTO = '". utf8_decode($produto->NOM_PRODUTO)."'";
    $produtop = $conexao->comandoArray($sql);

    if (isset($produtop["COD_PRODUTO"]) && $produtop["COD_PRODUTO"] != NULL && $produtop["COD_PRODUTO"] != "") {
        die(json_encode(array('mensagem' => "Curso já cadastrado, por favor reveja o código em: {$produtop["COD_PRODUTO"]}", 'situacao' => false)));
    }
    $res = $produto->inserir();
}

if ($res == FALSE) {
    $msg_retorno = 'Erro ao salvar curso!'. $conexao->mostraErro();
    $sit_retorno = false;
} else {
    $msg_retorno = "Curso salvo com sucesso!";
    $cache = new Cache();
    if (isset($produto->home) && $produto->home != NULL && $produto->home == "s" && isset($produto->aparecesite) && $produto->aparecesite != NULL && $produto->aparecesite == "s")
        $cache->save('inicioProdutosSite', $inicioProdutosSite, '240 minutes');
}

if (isset($upload->erro) && $upload->erro != NULL && $upload->erro != '') {
    $msg_retorno .= ' Problemas com o envio do arquivo: ' . $upload->erro;
}
echo json_encode(array('mensagem' => $msg_retorno, 'situacao' => $sit_retorno));
