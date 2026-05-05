document.addEventListener("DOMContentLoaded", () => {

  // =====================
  // ???? CONTEXTO BASE
  // =====================
  const url = new URL(window.location.href);
  const foroID = url.searchParams.get("f");
  const modo = url.searchParams.get("mode");

  // =====================
  // ???? DETECTAR FORO REAL
  // =====================
  let foroActual = foroID;

  // 1. input hidden
  if (!foroActual) {
    const inputF = document.querySelector("input[name='f']");
    if (inputF) {
      foroActual = inputF.value;
    }
  }

  // 2. fallback links
  if (!foroActual) {
    const links = document.querySelectorAll("a[href*='/f']");
    links.forEach(link => {
      const match = link.href.match(/\/f(\d+)-/);
      if (match) {
        foroActual = match[1];
      }
    });
  }

  // =====================
  // ???? FILTRO
  // =====================
  const FOROS_PERMITIDOS = ["1", "7"];

  if (
    !FOROS_PERMITIDOS.includes(foroActual) ||
    (modo !== "newtopic" && modo !== "reply")
  ) {
    return;
  }

  // =====================
  // ???? CSS
  // =====================
  const style = document.createElement("style");
  style.innerHTML = `
.jug-msg {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: var(--tcolor3);
  backdrop-filter: blur(6px);
  color: var(--color-5);
  border-radius: 14px;
  font-size: 13px;
  max-width: 260px;
  z-index: 99999;
  box-shadow: 0 5px 20px var(--tcolor3);
  animation: funFade 0.4s ease;
  display: flex;
  gap: 10px;
  align-items: end;
  flex-flow: row-reverse;
  overflow: hidden;
}

.jug-msg img {
  width: 10vw;
  height: 13vw;
  object-fit: cover;
}

.jug-text {
  flex: 1;
  position: absolute;
  background: var(--color-7);
  padding: 10px;
  width: -webkit-fill-available;
  text-align: center;
  line-height: 1.5em;
  font-size: 1em;
}

.jug-close {
  cursor: pointer;
  font-size: 12px;
  opacity: 0.7;
  position: absolute;
  top: 0;
  right: 0;
  background: var(--color-3);
  padding: 10px;
  border-bottom-left-radius: 10px;
}

.jug-close:hover {
  opacity: 1;
}

@keyframes funFade {
  0% { opacity: 0; transform: translateY(40px) scale(0.9); }
  60% { transform: translateY(-5px) scale(1.02); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}
  `;
  document.head.appendChild(style);

  // =====================
  // ???? HTML
  // =====================
  const box = document.createElement("div");
  box.className = "jug-msg";

  box.innerHTML = `
    <img src="">
    <div class="jug-text"></div>
    <div class="jug-close">✕</div>
  `;

  // =====================
  // ???? RANDOM
  // =====================
  function random(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // =====================
  // ???? CONFIG
  // =====================
  const CONFIG_FOROS = {

    "7": {
      newtopic: {
        imagen: "https://cdn-icons-png.flaticon.com/512/4140/4140048.png",
        mensajes: [
          "¿Cómo va esa ficha?",
          "Ese personaje necesita historia",
          "Lore en proceso…",
          "No olvides los traumitas",
          "¡Tú puedes!"
        ]
      },
      reply: {
        imagen: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
        mensajes: [
          "Corrigiendo detallitos…",
          "Ese code no se va a arreglar solo",
          "-sonido de taller mecánico-"
        ]
      }
    },

    "1": {
      newtopic: {
        imagen: "https://images2.imgbox.com/95/95/AAFin1am_o.png",
        mensajes: [
          "¡Bienve! ¿Adiós? o... ¿hasta luego?"
        ]
      },
      reply: {
        imagen: "https://images2.imgbox.com/60/53/MV9VHhuB_o.png",
        mensajes: [
          "¡Eso, denle la bienve al nuevo!",
		  "¡Hagamos comunidad!"
        ]
      }
    }

  };

  // =====================
  // ???? LÓGICA FINAL
  // =====================
  const config = CONFIG_FOROS[foroActual];

  if (!config || !config[modo]) return;

  const imagen = config[modo].imagen;
  const mensaje = random(config[modo].mensajes);

  // =====================
  // ⏳ MOSTRAR CON DELAY
  // =====================
  setTimeout(() => {

    document.body.appendChild(box);

    const text = box.querySelector(".jug-text");
    const img = box.querySelector("img");

    text.innerText = mensaje;
    img.src = imagen;

    box.querySelector(".jug-close").onclick = () => box.remove();

  }, 600);

});
