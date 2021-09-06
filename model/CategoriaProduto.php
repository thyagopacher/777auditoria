<?php

/* 
 * @author Thyago Henrique Pacher - thyago.pacher@gmail.com
 */


Class CategoriaProduto{
    
    public $codcategoria;
    public $nome;
    public $dtcadastro;
    public $imagem;
    
    private $conexao;
    
    public function __construct($conexao) {
        $this->conexao = $conexao;
    }
    
    public function __destruct() {
        unset($this);
    }     
    
    public function inserir(){
        if(!isset($this->dtcadastro) || $this->dtcadastro == NULL || $this->dtcadastro == ""){
            $this->dtcadastro = date("Y-m-d H:i:s");
        }         
        return $this->conexao->inserir('categoriaproduto', $this);
    }

    public function atualizar(){      
        return $this->conexao->atualizar('categoriaproduto', $this);
    }

    public function procurarCodigo(){
        return $this->conexao->procurarCodigo('categoriaproduto', $this);
    }
    
    public function excluir(){
        return $this->conexao->excluir('categoriaproduto', $this);
    }

}