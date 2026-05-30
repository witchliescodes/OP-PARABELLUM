document.addEventListener('DOMContentLoaded', () => {

  const pestanas = document.querySelectorAll('.pestana');
  const btnPrev = document.getElementById('prevPestana');
  const btnNext = document.getElementById('nextPestana');
  const indicador = document.querySelector('.indicador-pestana');

  if (!pestanas.length) return; 

  let pestanaActual = 1;
  const totalPestanas = pestanas.length;

  function cambiarPestana(nueva) {


    if (nueva < 1) nueva = totalPestanas;
    if (nueva > totalPestanas) nueva = 1;


    if (nueva === pestanaActual) return;


    const actual = document.querySelector('.pestana.active');
    if (actual) actual.classList.remove('active');


    const nuevaTab = document.getElementById(`pestana${nueva}`);
    if (nuevaTab) nuevaTab.classList.add('active');


    if (indicador) {
      indicador.textContent = `${nueva}/${totalPestanas}`;
    }

    pestanaActual = nueva;
  }


  btnPrev?.addEventListener('click', () => cambiarPestana(pestanaActual - 1));
  btnNext?.addEventListener('click', () => cambiarPestana(pestanaActual + 1));


  cambiarPestana(1);

});
