window.addEventListener("load", () => {

  const estados = {};


  function numero(texto = "") {

    const n = parseInt(
      String(texto)
        .replace(/[^\d-]/g, "")
    );

    return isNaN(n)
      ? 0
      : n;

  }



  function limpiar(texto = "") {

    return String(texto)
      .replace(":", "")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();

  }



  function obtenerCampo(post, nombre) {

    const buscado =
      limpiar(nombre);

    const campos =
      post.querySelectorAll(".pf");

    for(const pf of campos) {

      const label =
        pf.querySelector(".pf-label");

      const content =
        pf.querySelector(".pf-content");

      if(!label || !content)
        continue;

      const texto =
        limpiar(label.textContent);

      if(texto === buscado) {

        return content.textContent.trim();

      }

    }

    return "";

  }


  const posts =
    [...document.querySelectorAll(".bopost[id]")]
      .filter(post =>
        post.querySelector(".rol-p") &&
        post.querySelector(".pr-vid .valor") &&
        post.querySelector(".pr-ene .valor")
      );



  posts.forEach(post => {

    try {

      const vidaEl =
        post.querySelector(
          ".pr-vid .valor"
        );

      const energiaEl =
        post.querySelector(
          ".pr-ene .valor"
        );

      if(!vidaEl || !energiaEl)
        return;


      const personaje =
        post.querySelector(".p-name")
        ?.textContent
        ?.trim();

      if(!personaje)
        return;



      if(!estados[personaje]) {

        estados[personaje] = {

          vida: numero(
            obtenerCampo(post, "Vida")
          ),

          energia: numero(
            obtenerCampo(post, "Energía")
          )

        };

      }



      let vida =
        estados[personaje].vida;

      let energia =
        estados[personaje].energia;


      const mensaje =
        post.querySelector(".rol-p")
        ?.innerHTML || "";



      mensaje.replace(
        /\[vida:\s*([+-]?\d+)\s*\]/gi,
        (_, valor) => {

          vida += parseInt(valor);

          return "";

        }
      );


      mensaje.replace(
        /\[energia:\s*([+-]?\d+)\s*\]/gi,
        (_, valor) => {

          energia += parseInt(valor);

          return "";

        }
      );


      vida =
        Math.max(0, vida);

      energia =
        Math.max(0, energia);



      vidaEl.textContent =
        vida;

      energiaEl.textContent =
        energia;



      estados[personaje] = {

        vida,
        energia

      };



      post.dataset.hp =
        vida;

      post.dataset.en =
        energia;


      console.log(
        `[Sistema RPG] ${personaje}|${post.id}|HP:${vida} EN:${energia}`
      );

    } catch(err) {

      console.error(
        "[Sistema RPG ERROR]",
        post,
        err
      );

    }

  });

});
