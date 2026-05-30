document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const btnAumentar = document.getElementById("btn-aumentar");
  const btnDisminuir = document.getElementById("btn-disminuir");

  // Si no existen los botones, no hacer nada
  if (!btnAumentar && !btnDisminuir) return;

  let tamanoActual = 16;
  const incremento = 2;
  const MIN = 12;
  const MAX = 25;

  // Cargar valor guardado
  const guardado = localStorage.getItem("tamanoFuente");

  if (guardado) {
    tamanoActual = parseFloat(guardado);
  } else {
    const estilo = window.getComputedStyle(body).fontSize;
    tamanoActual = parseFloat(estilo) || 16;
  }

  // Aplicar tamaño inicial
  body.style.fontSize = tamanoActual + "px";

  // Función única para actualizar
  const actualizar = () => {
    body.style.fontSize = tamanoActual + "px";
    localStorage.setItem("tamanoFuente", tamanoActual);
  };

  // Eventos
  btnAumentar?.addEventListener("click", () => {
    if (tamanoActual < MAX) {
      tamanoActual += incremento;
      actualizar();
    }
  });

  btnDisminuir?.addEventListener("click", () => {
    if (tamanoActual > MIN) {
      tamanoActual -= incremento;
      actualizar();
    }
  });
});
