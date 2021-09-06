<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Class NivelPagina{
    
    public $codnivel;
    public $codpagina;
    public $inserir;
    public $atualizar;
    public $excluir;
    public $procurar;
    public $mostrar;
    private $conexao;
    
    public function __construct($conn) {
        $this->conexao = $conn;
    }
    
    public function __destruct() {
        unset($this);
    }    
    
    public function inserir(){
        return $this->conexao->inserir('nivelpagina', $this);
    }
    
    public function atualizar(){
        return $this->conexao->atualizar('nivelpagina', $this);
    }  
    
    public function excluir(){
        return $this->conexao->excluir('nivelpagina', $this);
    }
    
    public function procuraCodigo(){
        return $this->conexao->procurarCodigo('nivelpagina', $this);
    }

}