<?php
class Pokemon {
    private $id;
    private $nome;
    private $tipo;
    private $imagem;

    // ID
    public function getID() {
        return $this->id;
    }

    public function setID($id) {
        $this->id = $id;
    }

    // Nome
    public function getNome() {
        return $this->nome;
    }
    public function setNome($nome) {
        $this->nome = $nome;
    }

    // Tipo
    public function getTipo() {
        return $this->tipo;
    }
    public function setTipo($tipo) {
        $this->tipo = $tipo;
    }

    // Imagem
    public function getImagem() {
        return $this->imagem;
    }
    public function setImagem($imagem) {
        $this->imagem = $imagem;
    }
}
