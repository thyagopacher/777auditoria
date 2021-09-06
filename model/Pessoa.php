<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Class Pessoa {

    public $codpessoa;
    public $nome;
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
        if (!isset($this->codempresa) || $this->codempresa == NULL || $this->codempresa == "") {
            $this->codempresa = $_SESSION["codempresa"];
        }
        if (!isset($this->codfuncionario) || $this->codfuncionario == NULL || $this->codfuncionario == "") {
            $this->codfuncionario = $_SESSION["codpessoa"];
        }
        $this->senha = base64_encode($this->senha);
        return $this->conexao->inserir("pessoa", $this);
    }

    public function atualizar() {
        if(isset($this->senha) && $this->senha != NULL && $this->senha != ""){
            $this->senha = base64_encode($this->senha);
        }
        return $this->conexao->atualizar("pessoa", $this);
    }

    public function excluir() {
        return $this->conexao->excluir("pessoa", $this);
    }

    public function procurarCodigo() {
        return $this->conexao->procurarCodigo('pessoa', $this);
    }
    
    public function procurarEmail() {
        if(isset($this->codempresa) && $this->codempresa != NULL && $this->codempresa != ""){
            $and = " and codempresa = {$this->codempresa}";
        }
        return $this->conexao->comando('select codpessoa, nome, codempresa, morador, acessapainel, senha from pessoa where email = "'.$this->email.'"'. $and);
    }

    public function login() {
        $and = '';
        if(isset($this->codempresa) && $this->codempresa != NULL && $this->codempresa != ""){
            $and = " and pessoa.codempresa = ".$this->codempresa;
        }
        $sql = 'select pessoa.codpessoa, pessoa.nome, pessoa.codnivel, 
        pessoa.codempresa, pessoa.imagem, pessoa.status, pessoa.acessapainel, pessoa.apartamento, 
        pessoa.bloco, pessoa.dtcadastro, nivel.nome as nivel, pessoa.dtcadastro    
        from pessoa 
        inner join nivel on nivel.codnivel = pessoa.codnivel and nivel.codempresa = pessoa.codempresa
        where pessoa.email = "'.addslashes(trim($this->email)).'" 
        and pessoa.senha = "'.base64_encode(trim($this->senha)).'" 
        '.$and.' and pessoa.status = "a"';
        return $this->conexao->comandoArray($sql);
    }

    public function soNumero($str) {
        return preg_replace("/[^0-9]/", "", $str);
    }

    public function validaCPF() {
        $this->cpf = str_replace('.', "", str_replace('-', '', $this->cpf));
        if (!empty($this->cpf) && strlen(trim($this->cpf)) == 11) {
            $this->cpf = str_pad(preg_replace("/[^0-9]/", "", $this->cpf), 11, '0', STR_PAD_LEFT);
            if ($this->cpf != '00000000000' && $this->cpf != '11111111111' && 
                    $this->cpf != '22222222222' && $this->cpf != '33333333333' && $this->cpf != '44444444444' && $this->cpf != '55555555555' && 
                    $this->cpf != '66666666666' && $this->cpf != '77777777777' && $this->cpf != '88888888888' && $this->cpf != '99999999999') {
                for ($t = 9; $t < 11; $t++) {
                    for ($d = 0, $c = 0; $c < $t; $c++) {
                        $d += $this->cpf{$c} * (($t + 1) - $c);
                    }
                    $d = ((10 * $d) % 11) % 10;
                    if ($this->cpf{$c} != $d) { return false;}
                }
                return true;
            }
        }
    }

    public function geraSenha($tamanho = 8) {
        $lmin = 'abcdefghijklmnopqrstuvwxyz';
        $retorno = '';
        $caracteres = '';
        $caracteres .= $lmin;

        $len = strlen($caracteres);
        for ($n = 1; $n <= $tamanho; $n++) {
            $rand = mt_rand(1, $len);
            $retorno .= $caracteres[$rand - 1];
        }
        return $retorno;
    }
    
    public function criarFotoData(){
        $inputValue = $this->imagem;
        if (isset($inputValue)) {
            $nome_arquivo = "image_camphone_pessoa_emp{$this->codempresa}_{$this->codmorador}".date("Ymd").'.png';
            if (strpos($inputValue, "data:image/png;base64,") === 0) {
                $fd = fopen("../arquivos/{$nome_arquivo}", "wb");
                $data = base64_decode(substr($inputValue, strlen("data:image/png;base64,")));
            } else if (strpos($inputValue, "data:image/jpg;base64,") === 0) {
                $fd = fopen("../arquivos/{$nome_arquivo}", "wb");
                $data = base64_decode(substr($inputValue, strlen("data:image/jpg;base64,")));
            }

            if ($fd) {
                fwrite($fd, $data);
                fclose($fd);
                return $nome_arquivo;
            } else {
                die(json_encode(array('mensagem' => "Erro ao transferir arquivo para servidor!!!", 'situacao' => false)));
            }
        }else{
            die(json_encode(array('mensagem' => "Sem enviar imagem fica complicado converter!", 'situacao' => false)));
        }        
    }     
}
