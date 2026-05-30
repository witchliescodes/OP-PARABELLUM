document.addEventListener("DOMContentLoaded", () => {

  document.querySelectorAll(".bopost").forEach(post => {

    const modal = post.querySelector(".inv-modal");
    const itemsBox = post.querySelector(".inv-items");

    if(!modal || !itemsBox) return;


    const objetos = post.querySelectorAll(
      ".award.objeto"
    );

    objetos.forEach(obj => {

      itemsBox.appendChild(
        obj.cloneNode(true)
      );

    });


    post.querySelector(".inv-btn")
      ?.addEventListener("click", () => {

        modal.classList.add("active");

      });


    post.querySelector(".inv-close")
      ?.addEventListener("click", () => {

        modal.classList.remove("active");

      });


    modal.addEventListener("click", e => {

      if(e.target === modal){

        modal.classList.remove("active");

      }

    });

  });

});
