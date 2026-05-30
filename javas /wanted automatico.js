async function cargarWanteds() {

  const wrap = document.querySelector('.wrap-want');

  if (!wrap) return;

  wrap.innerHTML = '';

  try {

    const response = await fetch('/f23-wanted', {
      credentials: 'same-origin',
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error('No se pudo cargar el foro de wanteds');
    }

    const html = await response.text();

    const doc = new DOMParser().parseFromString(
      html,
      'text/html'
    );

    const temas = [...doc.querySelectorAll('.tema')];

    if (!temas.length) {

      wrap.innerHTML = `
        <p class="wanted-empty">
          No hay wanteds disponibles.
        </p>
      `;

      return;

    }

    const normalizar = (texto = '') =>
      texto
        .replace(/\s+/g, ' ')
        .trim();

    const extraerNumero = (texto = '') =>
      parseInt(
        texto.replace(/[^\d]/g, ''),
        10
      ) || 0;

    const fallbackAvatar =
      'https://2img.net/i.imgur.com/NQinKJB.png';

    const grupos = {
      'group-5': 'piratas',
      'group-8': 'armada'
    };

    const wanteds = temas
      .map(tema => {

        const link =
          tema.querySelector('.topictitle');

        if (!link) return null;

        const tituloTema =
          normalizar(link.textContent)
          .toLowerCase();

        if (!tituloTema.includes('[wanted]')) {
          return null;
        }

        const grupoEl =

          tema.querySelector('.autorp .group-5') ||
          tema.querySelector('.autorp .group-8') ||
          tema.querySelector('.autorp a span') ||
          tema.querySelector('.autorp a');

if (!grupoEl) return null;

const perfilUrl =
  grupoEl.closest('a')?.href || '';

        const clases =
          grupoEl.classList
            ? [...grupoEl.classList]
            : [];

        const claseGrupo =
          clases.find(clase =>
            clase.startsWith('group-')
          ) || '';

  return {

  url:
    link.href || '#',

  perfilUrl,

  nombre:
    normalizar(
      grupoEl.textContent
    ) || 'Desconocido',

  avatar:
    tema.querySelector('.avalist img')
    ?.src || fallbackAvatar,

          recompensa:
            normalizar(
              tema.querySelector('.descp')
              ?.textContent
            ) || 'Sin recompensa',

          valorWanted:
            extraerNumero(
              tema.querySelector('.descp')
              ?.textContent || ''
            ),

          colorGrupo:
            grupoEl.style.color || '',

          faccion:
            grupos[claseGrupo] || 'otros'

        };

      })

      .filter(Boolean)

      .sort((a, b) =>
        b.valorWanted - a.valorWanted
      );

    if (!wanteds.length) {

      wrap.innerHTML = `
        <p class="wanted-empty">
          No se encontraron wanteds válidos.
        </p>
      `;

      return;

    }
	  
for (const wanted of wanteds) {

  try {

    const htmlPerfil =
      await fetch(
        wanted.perfilUrl,
        {
          credentials: 'same-origin',
          cache: 'no-store'
        }
      ).then(r => r.text());

    const docPerfil =
      new DOMParser().parseFromString(
        htmlPerfil,
        'text/html'
      );

    const avatarPerfil =
      docPerfil.querySelector(
        '.perfilavatar img'
      )?.src;

    if (avatarPerfil) {

      wanted.avatar =
        avatarPerfil;

    }

  }

  catch(err){

    console.warn(
      'Avatar no encontrado para:',
      wanted.nombre
    );

  }

}

    const fragment =
      document.createDocumentFragment();

    wanteds.forEach(data => {

      const card =
        document.createElement('article');

      card.className =
        `wanted-card ${data.faccion}`;

      card.dataset.grupo =
        data.faccion;

      card.dataset.valor =
        data.valorWanted;

      card.innerHTML = `

        <a
          href="${data.url}"
          class="wanted-link"
        >

          <div class="wanted-avatar">

            <img
              src="${data.avatar}"
              alt="${data.nombre}"
              loading="lazy"
              decoding="async"
              onerror="
                this.onerror=null;
                this.src='${fallbackAvatar}';
              "
            >

          </div>

          <div class="wanted-info">

            <h1>

              <i class="game-icon game-icon-half-dead"></i>

              Death or alive

            </h1>

            <h3
              class="wanted-name"
              style="color:${data.colorGrupo}"
            >

              ${data.nombre}

            </h3>

            <div class="wanted-price">

              ${data.recompensa}

            </div>

          </div>

        </a>

      `;

      fragment.appendChild(card);

    });

    wrap.appendChild(fragment);

    iniciarFiltroWanteds();

  }

  catch (error) {

    console.error(
      'Error cargando wanteds:',
      error
    );

    wrap.innerHTML = `
      <p class="wanted-empty">
        Error cargando wanteds.
      </p>
    `;

  }

}

function iniciarFiltroWanteds() {

  const labels = [
    ...document.querySelectorAll(
      '.p-w-p label'
    )
  ];

  const cards = [
    ...document.querySelectorAll(
      '.wanted-card'
    )
  ];

  if (!labels.length || !cards.length) {
    return;
  }

  const filtrar = (faccion) => {

    cards.forEach(card => {

      const visible =
        faccion === 'todos' ||
        card.dataset.grupo === faccion;

      card.hidden = !visible;

    });

  };

  labels.forEach(label => {

    label.onclick = () => {

      labels.forEach(l =>
        l.classList.remove('activo')
      );

      label.classList.add('activo');

      filtrar(
        label.dataset.faccion || 'todos'
      );

    };

  });

  const labelPiratas =
    document.querySelector(
      '.p-w-p label[data-faccion="piratas"]'
    );

  if (labelPiratas) {

    labelPiratas.classList.add(
      'activo'
    );

    filtrar('piratas');

  }

}

document.addEventListener(
  'DOMContentLoaded',
  cargarWanteds
);
