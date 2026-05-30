document.addEventListener("DOMContentLoaded", () => {

  function limpiar(texto){
    return texto
      .replace(":", "")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();
  }

  document.querySelectorAll(".bopost").forEach(post => {

    // =====================
    // CACHE DE CAMPOS
    // =====================

    const campos = {};

    post.querySelectorAll(".pf").forEach(pf => {

      const label = pf.querySelector(".pf-label .label");
      const content = pf.querySelector(".pf-content");

      // si no hay contenido
      if(!content) return;

      // solo guardar campos con label
      if(label){

        const nombre = limpiar(label.textContent);

        campos[nombre] = {
          html: content.innerHTML.trim(),
          text: content.textContent.trim(),
          el: content
        };

      }

    });

    // =====================
    // HELPERS
    // =====================

    function ponerHTML(selector, valor){

      const el = post.querySelector(selector);

      if(!el || !valor) return;

      const span = el.querySelector(".valor");

      if(span){
        span.innerHTML = valor;
      }

    }

    function ponerTexto(selector, valor){

      const el = post.querySelector(selector);

      if(!el || !valor) return;

      const span = el.querySelector(".valor");

      if(span){
        span.textContent = valor;
      }

    }

    // =====================
    // TEXTO
    // =====================

    ponerHTML(".pr-raz", campos["raza"]?.html);
    ponerHTML(".pr-alt", campos["altura"]?.html);
    ponerHTML(".pr-aku", campos["akuma"]?.html);
    ponerHTML(".pr-vid", campos["vida"]?.html);
    ponerHTML(".pr-ene", campos["energía"]?.html);

    // =====================
    // PORTADA (CAMPO IMAGEN)
    // =====================

    const portada = post.querySelector(".pf .pf-content img");

    if(portada){

      post.querySelector(".pr-ban")
        ?.appendChild(portada.cloneNode(true));

    }

  });

});
