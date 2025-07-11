<?php
header('Content-Type: application/json');
require_once("../dao/PokemonDao.php");
require_once("../model/Pokemon.php");

if (isset($_POST['ids'])) {
    $ids = explode(',', $_POST['ids']);
    $ids = array_map('trim', $ids);

    $dao = new PokemonDao();
    $resultados = [];

    foreach ($ids as $id) {
        $pokemon = $dao->buscarPorID($id);
        if ($pokemon !== null) {
            $resultados[] = [
                'id' => $pokemon->getID(),
                'nome' => $pokemon->getNome(),
                'tipo' => $pokemon->getTipo(),
                'imagem' => $pokemon->getImagem()
            ];
        }
    }

    echo json_encode($resultados);
} else {
    echo json_encode(['erro' => 'Nenhum ID recebido']);
}