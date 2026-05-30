document.addEventListener("DOMContentLoaded", () => {
  const notifBoton = document.getElementById("fa_notifications");

  if (!notifBoton) return;

  notifBoton.addEventListener("click", () => {

    setTimeout(() => {

      const notifLista =
        document.getElementById("notif_list");

      if (!notifLista) return;

      notifLista.style.left = "";
      notifLista.style.right = "20px";
      notifLista.style.top = "90px";

    }, 50);

  });

  document.addEventListener("click", (e) => {

    const notifLista =
      document.getElementById("notif_list");

    if (!notifLista) return;

    if (
      !notifBoton.contains(e.target) &&
      !notifLista.contains(e.target)
    ) {

      notifLista.style.display = "";

    }

  });

});
