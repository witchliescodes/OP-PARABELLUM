$(document).ready(function() {
  $(".satus").each(function() {
    const cont = this;

    const bg = window.getComputedStyle(cont).backgroundImage.toLowerCase();

    if (!bg || bg === "none") return;


    if (bg.includes("unread")) {
      cont.classList.add("nuevo");
    } else if (bg.includes("read")) {
      cont.classList.add("leido");
    }


    if (bg.includes("hot")) cont.classList.add("hot");
    if (bg.includes("locked")) cont.classList.add("cerrado");


    if (bg.includes("sticky")) cont.classList.add("nota");
    if (bg.includes("announce")) cont.classList.add("anuncio");
	if (bg.includes("topic")) cont.classList.add("tem");  
	  
  cont.style.backgroundImage = "none";
  });
});
