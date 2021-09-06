<?php

/*
 * classe para pagina
 */
Class Pagina {

    public $codpagina;
    private $conexao;

    public function __construct($conn) {
        $this->conexao = $conn;
    }

    public function __destruct() {
        unset($this);
    }

    public function inserir() {
        if (!isset($this->dtcadastro) || $this->dtcadastro == NULL || $this->dtcadastro == "") {
            $this->dtcadastro = date('Y-m-d H:i:s');
        }
        if (!isset($this->codfuncionario) || $this->codfuncionario == NULL || $this->codfuncionario == "") {
            $this->codfuncionario = $_SESSION["codpessoa"];
        }
        return $this->conexao->inserir("pagina", $this);
    }

    public function atualizar() {
        return $this->conexao->atualizar("pagina", $this);
    }

    public function excluir() {
        return $this->conexao->excluir("pagina", $this);
    }

    public function procuraCodigo() {
        return $this->conexao->procurarCodigo("pagina", $this);
    }

}
