<?php

header('Content-type: text/html; charset=utf-8');
session_start();
//validação caso a sessão caia
if (!isset($_SESSION)) {
    die("<script>alert('Sua sessão caiu, por favor logue novamente!!!');window.close();</script>");
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
$site = 'http://' . $_SERVER['SERVER_NAME'] . '/site3/admin/';
$banner = new Banner($conexao);

$res = $banner->procurar($_POST);
$qtd = $conexao->qtdResultado($res);
if ($qtd > 0) {
    $nome = 'Rel. Banner';
    $html .= '<table width="100%" id="table_banner">';
    $html .= '<thead>';
    $html .= '<tr>';
    $html .= '<th>Data Cad.</th>';
    $html .= '<th>Titulo</th>';
    $html .= '<th>Arquivo</th>';
    $html .= '<th>Status</th>';
    $html .= '</tr>';
    $html .= '</thead>';
    $html .= '<tbody>';
    while ($banner = $conexao->resultadoArray($res)) {
        $html .= '<tr>';
        $html .= '<td>' . $banner["dtcadastro2"] . '</td>';
        $html .= '<td>' . utf8_encode($banner["titulo"]) . '</td>';
        $html .= '<td><a target="_blank" href="' . $site . '/arquivos/' . $banner["arquivo"] . '">Abrir arquivo</a></td>';
        $html .= '<td>' . trocaStatus($banner["status"]) . '</td>';
        $html .= '</tr>';
    }
    $html .= '</tbody>';
    $html .= '</table>';
    $_POST["html"] = preg_replace('/\s+/', ' ', str_replace("> <", "><", $html));
    $paisagem = "sim";
    if (isset($_POST["tipo"]) && $_POST["tipo"] == "xls") {
        include "./GeraExcel.php";
    } else {
        include "./GeraPdf.php";
    }
} else {
    echo '<script>alert("Sem banners encontrados!");window.close();</script>';
}

function trocaStatus($status) {
    switch ($status) {
        case 'a':
            $status = "Ativo";
            break;
        case 'i':
            $status = "Inativo";
            break;
    }
    return $status;
}
