// -- Lógica do Modal bootstrap --

// Evento ao clicar em adicionar linha
let contador = 1;

$(document).ready(function () {
  $('#adicionarLinha').click(function () {

    let labelInicial = $('#campos-container label').first();

    if (labelInicial.text().trim() === 'Código:') { // Ao clicar muda Código para Código 1
      labelInicial.text('Código 1:');
      $('#campos-container input').first().attr('id', 'nome1');

    }

    contador++;
    
    // Adiciona uma nova linha ao clicar no botão
    $('#campos-container').append(`
      <label for="nome${contador}">Código ${contador}:</label>
      <input type="text" class="form-control mb-2" id="nome${contador}" name="nome[]" placeholder="Código">
    `);
  });

});

// Evento ao clicar em salvar
$('#salvarPokemons').click(function () {
  let ids = [];
  $('input[name="nome[]"]').each(function () {
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

      pokemons.forEach(function (poke) {
        $('#pokemonTable tbody').append(`
          <tr>
            <td>${poke.id}</td>
            <td>${poke.nome}</td>
            <td>${poke.tipo}</td>
            <td><img src="${poke.imagem}" width="50"></td>
            <td>✓</td>
          </tr>
        `);
      });

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
});



