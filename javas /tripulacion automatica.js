async function cargarTripulaciones(){

  try{

    const wrap =
    document.querySelector(
      '.a-trp'
    );



    if(!wrap) return;



    wrap.innerHTML = '';


    const response =
    await fetch(
      '/f21-tripulaciones',
      {
        credentials:'same-origin',
        cache:'no-store'
      }
    );



    if(!response.ok){

      throw new Error(
        `HTTP ${response.status}`
      );

    }



    const html =
    await response.text();


    const parser =
    new DOMParser();



    const doc =
    parser.parseFromString(
      html,
      'text/html'
    );



    const topics =
    [
      ...doc.querySelectorAll(
        '.tema'
      )
    ];



    if(!topics.length){

      wrap.innerHTML = `
        <p class="tripu-empty">
          No hay tripulaciones.
        </p>
      `;

      return;

    }



    const grupos = {

      'group-5': 'piratas',
      'group-6': 'marina',
      'group-7': 'baroque',
      'group-8': 'armada',
      'group-9': 'gobierno',
      'group-10': 'civiles'

    };



    const fragment =
    document.createDocumentFragment();



    for(const fila of topics){

      try{




        const tema =
        fila.querySelector(
          '.topictitle'
        );



        if(!tema){

          continue;

        }




        const tituloTema =

        tema.textContent
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, ' ')
        .trim()
        .toLowerCase();



const esTripulacion =
/\[\s*(tripu|tripulacion|tripulación)\s*\]/i
.test(tituloTema);

if(!esTripulacion){
  continue;
}




        const grupoEl =

          fila.querySelector(
            '.group-5'
          )

          ||

          fila.querySelector(
            '.group-6'
          )

          ||

          fila.querySelector(
            '.group-7'
          )

          ||

          fila.querySelector(
            '.group-8'
          )

          ||

          fila.querySelector(
            '.group-9'
          )

          ||

          fila.querySelector(
            '.group-10'
          );



        let faccion =
        'otros';



        if(grupoEl){

          const claseGrupo =

          [...grupoEl.classList]
          .find(clase =>

            clase.startsWith(
              'group-'
            )

          );



          faccion =

          grupos[claseGrupo]
          || 'otros';

        }



        const resTema =
        await fetch(
          tema.href,
          {
            credentials:'same-origin',
            cache:'no-store'
          }
        );



        if(!resTema.ok){

          continue;

        }



        const htmlTema =
        await resTema.text();


        const docTema =
        parser.parseFromString(
          htmlTema,
          'text/html'
        );



        const tripu =
        docTema.querySelector(
          '.tripu-card'
        );



        if(!tripu){

          continue;

        }


        const card =
        document.createElement(
          'article'
        );



        card.className =
        `tripu-preview ${faccion}`;



        card.dataset.grupo =
        faccion;



        card.innerHTML =
        tripu.outerHTML;



        fragment.appendChild(
          card
        );

      }

      catch(err){

        console.log(
          '[Tema tripulación]',
          err
        );

      }

    }

if(!fragment.children.length){

  wrap.innerHTML = `
    <p class="tripu-empty">
      No hay tripulaciones ahora mismo.
    </p>
  `;

  return;

}


    wrap.appendChild(
      fragment
    );



    iniciarFiltroTripulaciones();

  }

  catch(err){

    console.log(
      '[Tripulaciones]',
      err
    );

  }

}





function iniciarFiltroTripulaciones(){



  const labels =
  document.querySelectorAll(
    '.lbls label'
  );



  const cards =
  document.querySelectorAll(
    '.tripu-preview'
  );



  if(
    !labels.length ||
    !cards.length
  ){
    return;
  }



  labels.forEach(label => {



    label.addEventListener(
      'click',
      () => {



        labels.forEach(l => {

          l.classList.remove(
            'activo'
          );

        });



        label.classList.add(
          'activo'
        );



        const faccion =
        label.dataset.faccion;




        cards.forEach(card => {



          const mostrar =

            card.dataset.grupo
            === faccion;



          card.style.display =

            mostrar
            ? ''
            : 'none';

        });

      }
    );

  });



  const piratas =
  document.querySelector(
    '.lbls label[data-faccion="piratas"]'
  );



  if(piratas){

    piratas.click();

  }

}





document.addEventListener(
  'DOMContentLoaded',
  cargarTripulaciones
);
