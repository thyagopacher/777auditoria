<?php

/**
 * controladora de login comexito
 */
session_start();
include "../model/Conexao.php";
$conexao = new Conexao();

include '../model/Cliente.php';
$cliente = new Cliente($conexao);
$cliente->DES_EMAIL = $_POST["email"];
$cliente->DES_SENHA = $_POST["senha"];
$pessoa2 = $cliente->login();

if (!isset($pessoa2["COD_CLIENTE"]) || $pessoa2["COD_CLIENTE"] == NULL || $pessoa2["COD_CLIENTE"] == "") {
    die(json_encode(array('mensagem' => 'Erro ao entrar, e-mail ou senha inválidos!!!', 'situacao' => false)));
} else {
    $cliente_produto = $conexao->comandoArray("select COD_CLIENTE from cliente_produto where COD_CLIENTE = {$pessoa2["COD_CLIENTE"]}");
    if (isset($cliente_produto["COD_CLIENTE"]) && $cliente_produto["COD_CLIENTE"] != NULL && $cliente_produto["COD_CLIENTE"] != "") {
        $_SESSION["MM_Username"] = $_POST["email"];
        $_SESSION["Senha"] = $_POST["senha"];
        $_SESSION["Nome"] = $pessoa2["NOM_CLIENTE"];
        $_SESSION["Codigo"] = $pessoa2["COD_CLIENTE"];
        $_SESSION["Ultimo"] = $pessoa2["DAT_ULT_ACESSO"];
        $_SESSION["MM_UserAuthorization"] = 'true';

        die(json_encode(array('mensagem' => 'Logado com sucesso!!!', 'situacao' => true, 'nome' => $pessoa2["NOM_CLIENTE"],
            'codpessoa' => $pessoa2["COD_CLIENTE"], 'email' => $_POST["email"], 'senha' => $_POST["senha"])));
    }else{
        
        include 'Email.php';
        $email = new Email();
        $email->mensagem   = "O login do cliente está gerando problemas 
        para entrar: {$pessoa2["COD_CLIENTE"]} reveja o cliente
        deve ter vários cadastros com mesmo e-mail!";
        $email->assunto    = 'Verificar login '. date("d/m/Y H:i:s");
        $email->para_email = 'contato@comexito.com.br';
        $email->para       = 'ComExito';
        $resEnvioEmail     = $email->envia();
        
        die(json_encode(array('mensagem' => 'Achou o login mas por algum motivo não tem curso correlacionado email enviado para suporte entraremos em contato!', 'situacao' => false, 'nome' => $pessoa2["NOM_CLIENTE"],
            'codpessoa' => $pessoa2["COD_CLIENTE"], 'email' => $_POST["email"], 'senha' => $_POST["senha"])));        
    }
}    