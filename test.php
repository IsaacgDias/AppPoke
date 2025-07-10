<?php
require_once("Dao/PokemonDao.php");

$dao = new PokemonDao();

// Teste ID 1 (Bulbasaur)
$pokemon = $dao->buscarPorID(1);

if ($pokemon !== null) {
    echo "<h2>Nome: " . $pokemon->getNome() . "</h2>";
    
} else {
    echo "Pókemon não encontrado";
}

?>