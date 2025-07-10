console.log("Pass")

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