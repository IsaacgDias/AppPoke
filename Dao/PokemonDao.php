<?php
require_once("../model/Pokemon.php");

class PokemonDao {
    public function buscarPorID($id) {
        try {
                $url = "https://pokeapi.co/api/v2/pokemon/$id";
                $resposta = file_get_contents($url);

                if(!$resposta) {
                    throw new Exception("Erro ao acessar a PokeAPI");
                }
            
            $dados = json_decode($resposta, true);
            
            $pokemon = new Pokemon();
            $pokemon->setID($dados['id']);
            $pokemon->setNome(ucfirst($dados['name']));
            $pokemon->setImagem($dados['sprites']['front_default']);

            $tipos = array_map(function($tipo) {
                return $tipo['type']['name'];

            }, $dados['types']);

            $pokemon->setTipo(implode(', ', $tipos));
            return $pokemon;

        } catch (Exception $e) {
            echo "Erro ao buscar Pokémon: " . $e->getMessage();
            return null;
        }
    }
}

?>