document.addEventListener("DOMContentLoaded", () => {

  const estados = document.querySelectorAll(".status");

  if(!estados.length) return;

  estados.forEach(status => {

    if(status.dataset.estadoProcesado) return;

    status.dataset.estadoProcesado = "true";

    const online = status.textContent.trim().length > 0;

    status.textContent = "";

    status.classList.add(
      online ? "on" : "off"
    );

    const icono = document.createElement("i");

    icono.className = online
      ? "fi fi-rr-wifi"
      : "fi fi-rr-wifi-slash";

    const texto = document.createElement("span");

    texto.textContent = online
      ? "En línea"
      : "Desconectado";

    status.append(icono, texto);

  });

});
