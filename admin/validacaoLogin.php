<?php

ini_set('zlib.output_compression', '1');
header('Content-Type: text/html; charset=utf-8');
header('Cache-Control:public, max-age=31536000');
header('X-Powered-by: Thyago H. Pacher - thyago.pacher@gmail.com');
date_default_timezone_set('America/Sao_Paulo');
session_start();

if(strstr($_SERVER["SERVER_NAME"], 'www')){
    header('Location: http://comexito.com.br/site3/admin/home.php');
}

if(!isset($_SESSION["MM_Username_ADMIN"])){
    echo '<script>alert("Sua sessão caiu por favor faça login novamente!!!"); location.href="./index.php"</script>';
}

include "../model/ConexaoPDO.php";
$conexao = new ConexaoPDO();

include "../model/Cache.php";
$cache = new Cache();

$empresap = $cache->read('empresap');
if(!isset($empresap) || $empresap == NULL){
    $sql      = 'select * from empresa where codempresa = 1';
    $empresap = $conexao->comandoArray($sql);  
    $cache->save('empresap', $empresap, '180 minutes');
}

$pagina          = $_SERVER["REQUEST_URI"];
$separado_pagina = explode('/', $pagina);
$pagina          = $separado_pagina[count($separado_pagina) - 1];
$pagina          = explode('?', $pagina);//limpa código página
$pagina          = $pagina[0];

$nivelp = $cache->read('nivelpCodnivel'. $_SESSION["codnivel"]. 'Link'. $pagina);
if(!isset($nivelp) || $nivelp == NULL){
    $sql = "select nivelpagina.*, pagina.nome as pagina, modulo.nome as modulo, pagina.link as pagina_link 
                from nivelpagina 
                inner join pagina on pagina.codpagina = nivelpagina.codpagina    
                inner join modulo on modulo.codmodulo = pagina.codmodulo
                where nivelpagina.codnivel = '{$_SESSION["codnivel"]}' and pagina.link = '{$pagina}'";
    $nivelp = $conexao->comandoArray($sql);
    $cache->save('nivelpCodnivel'. $_SESSION["codnivel"]. 'Link'. $pagina, $nivelp, '180 minutes');
}

$_SESSION["codpagina"] = $nivelp["codpagina"];
