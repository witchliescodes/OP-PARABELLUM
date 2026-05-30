document.addEventListener("DOMContentLoaded", () => {
  const elementos = document.querySelectorAll(".new-message, .toread-message");
  if (!elementos.length) return;

  let mps = 0;

  for (const el of elementos) {
    const match = el.textContent.match(/\d+/);
    if (match) {
      mps = parseInt(match[0], 10);
      break; 
    }
  }

  if (mps > 0) {
    const body = document.body;

    body.classList.add("oppmp");


    document.documentElement.style.setProperty("--mensajes", `"${mps}"`);

    const notif = document.querySelector(".oppmsj");
    if (notif) {
      notif.dataset.newMps = "true";
    }
  }
});
