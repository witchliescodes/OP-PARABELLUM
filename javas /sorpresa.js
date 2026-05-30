document.addEventListener("DOMContentLoaded", () => {
  let foroActual = new URLSearchParams(location.search).get("f");

  if (!foroActual) {
    const inputF = document.querySelector("input[name='f']");
    if (inputF) foroActual = inputF.value;
  }

	
  if (!foroActual) {
    const match = document.body.innerHTML.match(/\/f(\d+)-/);
    if (match) foroActual = match[1];
  }

  const modo = new URLSearchParams(location.search).get("mode");

	
  const FOROS_PERMITIDOS = ["16", "14", "22"];
  const RANGOS_PERMITIDOS = [{ min: 27, max: 100 }];

  function foroPermitido(id) {
    if (!id) return false;

    if (FOROS_PERMITIDOS.includes(id)) return true;

    const num = +id;
    return RANGOS_PERMITIDOS.some(r => num >= r.min && num <= r.max);
  }

  if (!foroPermitido(foroActual) || !["newtopic", "reply"].includes(modo)) {
    return; 
  }


  const CONFIG_FOROS = {
    "16": {
      newtopic: {
        imagen: "https://images2.imgbox.com/dd/1c/dvkDbwP5_o.png",
        mensajes: ["Ese personaje necesita historia", "Lore en proceso…", "No olvides los traumitas", "¡Tú puedes!"]
      },
      reply: {
        imagen: "https://images2.imgbox.com/03/69/xvEGXA9w_o.png",
        mensajes: ["Corrigiendo detallitos…", "Esa ficha no se va a arreglar sola", "-sonido de taller mecánico-", "¡Vamos que se puede!"]
      }
    },
    "14": {
      newtopic: {
        imagen: "https://images2.imgbox.com/95/95/AAFin1am_o.png",
        mensajes: ["¡Bienve! ¿Adiós? o... ¿hasta luego?"]
      },
      reply: {
        imagen: "https://images2.imgbox.com/60/53/MV9VHhuB_o.png",
        mensajes: ["¡Demosle la bienvenida!", "¡Hagamos comunidad!"]
      }
    }
  };

  const CONFIG_RANGO = {
    newtopic: {
      imagen: "https://images2.imgbox.com/5d/1d/XinFO11C_o.png",
      mensajes: ["La historia comienza aquí…", "¿Listo para rolear?", "El destino de tu personaje te espera", "Empieza la historia…"]
    },
    reply: {
      imagen: "https://images2.imgbox.com/a5/b2/x36vIuyx_o.png",
      mensajes: ["¡Responde con estilo!", "El turno es tuyo", "Que fluya el rol~"]
    }
  };

  let config = CONFIG_FOROS[foroActual] || CONFIG_RANGO;
  if (!config || !config[modo]) return;

	
  if (!document.getElementById("jug-style")) {
    const style = document.createElement("style");
    style.id = "jug-style";
    style.textContent = `
.jug-msg {
    position: fixed;
    bottom: 20px;
    left: 20px;
    background: var(--tcolor3);
    backdrop-filter: blur(6px);
    color: var(--color-6);
    border-radius: 14px;
    font-size: 1em;
    max-width: 260px;
    z-index: 99999;
    box-shadow: 0 5px 20px var(--tcolor3);
    animation: funFade 0.4s ease;
}
.jug-msg img {
    width: 200px;
    height: 200px;
    object-fit: contain;
}
.jug-text {
    padding: 10px;
    text-align: center;
}
.jug-close {
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
    padding: 6px;
    opacity: 0.5;
    background: var(--color-3);
    border-top-right-radius: 14px;
    border-bottom-left-radius: 14px;
}
@keyframes funFade {
  0% { opacity:0; transform:translateY(40px); }
  100% { opacity:1; transform:translateY(0); }
}`;
    document.head.appendChild(style);
  }

  const data = config[modo];
  const mensaje = data.mensajes[Math.floor(Math.random() * data.mensajes.length)];

  const box = document.createElement("div");
  box.className = "jug-msg";

  box.innerHTML = `
    <img src="${data.imagen}" loading="lazy">
    <div class="jug-text">${mensaje}</div>
    <div class="jug-close">✕</div>
  `;

  box.querySelector(".jug-close").onclick = () => box.remove();

  requestAnimationFrame(() => {
    document.body.appendChild(box);
  });

});
