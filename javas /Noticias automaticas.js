function cargarAnuncios(){

  fetch('/f12-')
    .then(r => r.text())
    .then(html => {

      const doc = new DOMParser().parseFromString(html, 'text/html');
      const filas = doc.querySelectorAll('.tema');

      let contenido = '';
      let count = 0;

      const nombresTipo = {
        'trama-global': 'Trama Global',
        'evento-global': 'Evento Global',
        'mini-evento': 'Mini Evento',
        'anuncio': 'Anuncio',
        'parche': 'Nota',
        'trama': 'Trama',
        'evento': 'Evento',
        'mision': 'Misión'
      };

      filas.forEach((fila) => {
        if(count >= 6) return;

        const link = fila.querySelector('.topictitle');
        if(!link) return;

        let titulo = link.textContent.trim();
        const url = link.href;
        const topicID = url.match(/t(\d+)/)?.[1] || count;

        let tipo = '';

        const tipoTexto = fila.querySelector('.toptt dfn')?.textContent.toLowerCase() || '';

        const tiposMap = {
          'trama global': 'trama-global',
          'evento global': 'evento-global',
          'mini evento': 'mini-evento',
          'anuncio': 'anuncio',
          'nota': 'parche',
          'trama': 'trama',
          'evento': 'evento',
          'mision': 'mision'
        };

		  
        for (let key in tiposMap) {
          if (tipoTexto.includes(key)) {
            tipo = tiposMap[key];
            break;
          }
        }

        if (!tipo) {
          const match = titulo.match(/\[(.*?)\]/);
          if (match) {
            const etiqueta = match[1].toLowerCase();

            for (let key in tiposMap) {
              if (etiqueta.includes(key)) {
                tipo = tiposMap[key];
                break;
              }
            }
          }
        }

        const tiposPermitidos = [
          'anuncio',
          'parche',
          'trama',
          'evento',
          'trama-global',
          'evento-global',
          'mini-evento',
          'mision'
        ];

        if (!tiposPermitidos.includes(tipo)) return;

        const tipoNombre = nombresTipo[tipo] || tipo;


        titulo = titulo
          .replace(/\[.*?\]\s*/, '')
          .replace(/^(anuncio:|nota:|trama:|evento:)\s*/i, '');


        let fecha = '';
        const fechaEl = fila.querySelector('.autfe dfn');

        if (fechaEl) {
          fecha = fechaEl.textContent.trim();
        }


        const desc = fila.querySelector('.descp')?.textContent.trim() || '';


        contenido += `
          <article class="notis-an topic-${topicID} tipo-${tipo}">
            
            <div class="notis-an-info">

              <!-- ???? ETIQUETA -->
              <div class="notis-an-tag tipo-${tipo}">
                <span class="tag-icon"></span>
                <span class="tag-text">${tipoNombre}</span>
              </div>
              
              <h3 class="notis-an-titulo">
                <a href="${url}">${titulo}</a>
              </h3>
              
              <span class="notis-an-fecha">${fecha}</span>
              <p class="notis-an-desc">${desc}</p>
              
            </div>

          </article>
        `;

        count++;
      });

      document.querySelector('#pretab-an').innerHTML = contenido;

    })
    .catch(err => console.log('Error cargando anuncios:', err));
}

document.addEventListener('DOMContentLoaded', cargarAnuncios);
