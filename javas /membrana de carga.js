(function () {

  function initPreloader() {

    const loader = document.getElementById("preloader");
    if (!loader) {
      document.documentElement.classList.remove("loading");
      return;
    }

    const progressBar = loader.querySelector(".loader-progress");
    const text = loader.querySelector(".loader-text");
    const ship = loader.querySelector(".loader-ship");
    const wheel = loader.querySelector(".ship-wheel");

    const mensajes = [
      "Reuniendo a la tripulación...",
      "Zarpando hacia el Grand Line...",
      "Cargando aventuras...",
      "Buscando el One Piece...",
      "Preparando el Sunny...",
      "¡A toda vela!",
      "El mar guarda secretos..."
    ];


    text.textContent = mensajes[0];


    let progreso = 0;
    let terminado = false;
    let ultimoTiempo = 0;
    let mensajeIndex = 0;

    function animarBarra(timestamp) {

      if (terminado) return;

      if (!ultimoTiempo) {
        ultimoTiempo = timestamp;
      }

      const delta = timestamp - ultimoTiempo;

      if (delta > 90) {

        ultimoTiempo = timestamp;

        if (progreso < 88) {

          progreso += Math.random() * 4 + 1;

          progressBar.style.width = progreso + "%";

          ship.style.left =
            Math.min(progreso, 98) + "%";


          const speed = 1.2 - (progreso / 100);

          wheel.style.animationDuration =
            Math.max(0.45, speed) + "s";

          const nuevoIndex =
            Math.floor(progreso / 15);

          if (
            nuevoIndex !== mensajeIndex &&
            mensajes[nuevoIndex]
          ) {

            mensajeIndex = nuevoIndex;

            text.textContent =
              mensajes[mensajeIndex];
          }
        }
      }

      requestAnimationFrame(animarBarra);
    }


    function finalizar() {

      if (terminado) return;

      terminado = true;

      progressBar.style.width = "100%";

      ship.style.left = "98%";

      wheel.style.animationDuration = "0.4s";

      text.textContent = "¡Listo para zarpar!";

      setTimeout(() => {

        loader.classList.add("hidden");

        /* MOSTRAR EL FORO */

        document.documentElement
          .classList
          .remove("loading");

        setTimeout(() => {

          loader.remove();

        }, 600);

      }, 250);
    }


    const seguridad = setTimeout(() => {

      finalizar();

    }, 7000);

    requestAnimationFrame(animarBarra);


    Promise.all([

      document.fonts.ready,

      new Promise(resolve => {

        if (document.readyState === "complete") {

          resolve();

        } else {

          window.addEventListener(
            "load",
            resolve,
            { once: true }
          );
        }
      })

    ]).then(() => {

      clearTimeout(seguridad);

      finalizar();
    });
  }


  if (document.readyState === "loading") {

    document.addEventListener(
      "DOMContentLoaded",
      initPreloader
    );

  } else {

    initPreloader();
  }

})();
