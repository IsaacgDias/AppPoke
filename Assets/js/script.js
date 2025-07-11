// -- Lógica do Modal bootstrap --

// Evento ao clicar em adicionar linha
let contador = 1;

$(document).ready(function () {

  inicializarEventos();

  function inicializarEventos() {
    $('#adicionarLinha').click(adicionarLinha);
    $('#salvarPokemons').click(salvarPokemons);
    $('#staticBackdrop').on('shown.bs.modal', resetarCampos);
    $('#pokemonTable tbody').on('click', '.btn-remover', removerPokemonTable)
  }

  // Adiciona nova linha no input no modal
  function adicionarLinha() {
    let labelInicial = $('#campos-container label').first();

    if (labelInicial.text().trim() === 'Código:') {
      labelInicial.text('Código 1:');
      $('#campos-container input').first().attr('id', 'codigo1');
    }

    contador++;

    $('#campos-container').append(`
      <label for="codigo${contador}">Código ${contador}:</label>
      <input type="text" class="form-control mb-2" id="codigo${contador}" name="codigo[]" placeholder="Código">
    `);
  }
  
  // Salva os pokemons fazendo a requisição AJAX
  function salvarPokemons() {
    let ids = [];
    $('input[name="codigo[]"]').each(function () {
      if ($(this).val().trim() !== '') {
        ids.push($(this).val().trim());
      }
    });

    if (ids.length === 0) {
      alert("Digite um ID!");
      return;
    }

    $.ajax({
      url: '../controller/PokemonController.php',
      method: 'POST',
      data: { ids: ids.join(',') },
      dataType: 'json',
      success: function (pokemons) {
        if (pokemons.erro) {
          alert(pokemons.erro);
          return;
        }

        adicionarPokemonsNaTabela(pokemons)

        // Fecha o modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('staticBackdrop'));
        modal.hide()

      },
      error: function (xhr, error) {
        alert('Erro ao buscar Pokémon.');
        console.error("Erro AJAX:", error);
        console.log("Resposta completa:", xhr.responseText);
      }
    });
  }

  // Adiciona os pokemons recebidos na tabela
  function adicionarPokemonsNaTabela(pokemons) {
    pokemons.forEach(function (poke) {
      $('#pokemonTable tbody').append(`
        <tr>
          <td>${poke.id}</td>
          <td>${poke.nome}</td>
          <td>${poke.tipo}</td>
          <td><img src="${poke.imagem}" width="50"></td>
          <td>
            <button class="btn btn-danger btn-sm btn-remover" title="Remover Pokémon">
              <i class="bi bi-trash"></i>
            </button>
          </td>
        </tr>
      `);
    });
  }

  // Reseta o conteúdo do container com o input inicial toda vez que o modal abrir
  function resetarCampos() { 
    $('#campos-container').html(`
      <label for="codigo1">Código:</label>
      <input type="text" class="form-control mb-2" id="codigo1" name="codigo[]" placeholder="Código">
    `);
    contador = 1;
  }

  // Remove Pokemon ao clicar no botão da lixeira
  function removerPokemonTable() {
    $(this).closest('tr').remove();
  }

});



