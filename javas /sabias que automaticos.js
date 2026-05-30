const SABIAS = {

  tema: "/t34-peticion-sabias-que",

  fallbackAvatar: "https://2img.net/i.imgur.com/NQinKJB.png",

  iniciado: false

};


function limpiarTexto(texto = ""){

  return texto
    .replace(/\s+/g, " ")
    .trim();

}


function crearSlide(
  avatar,
  nombre,
  texto
){

  return `
    <article class="sabias-item">

      <div class="sabias-avatar">
        <img src="${avatar}" alt="">
      </div>

      <div class="sabias-texto">

        <div class="sabias-nombre">
          ${nombre}
        </div>

        ${texto}

      </div>

    </article>
  `;

}


function crearEstadoVacio(){

  return `
    <div class="sabias-empty">
      Ninguna curiosidad disponible
    </div>
  `;

}


function obtenerPostsSabias(doc){

  return [
    ...doc.querySelectorAll(".bopost")
  ].slice(1);

}

function obtenerDataPost(post){


  const avatar =
  post.querySelector(".p-ava img")
  ?.getAttribute("src")
  || SABIAS.fallbackAvatar;


  const nombre =
  limpiarTexto(

    post.querySelector(".p-name")
    ?.textContent || ""

  );


  const texto =
  post.querySelector(".rol-p")
  ?.innerHTML
  ?.trim() || "";

  return {

    avatar,
    nombre,
    texto

  };

}


async function iniciarSabiasQue(){

  try{

    if(SABIAS.iniciado) return;


    const slider =
    document.querySelector(
      ".sabias-slider"
    );

    if(!slider) return;


    const res =
    await fetch(SABIAS.tema);

    if(!res.ok){

      throw new Error(
        `HTTP ${res.status}`
      );

    }

    const html =
    await res.text();

    const parser =
    new DOMParser();

    const doc =
    parser.parseFromString(
      html,
      "text/html"
    );

    const posts =
    obtenerPostsSabias(doc);


    if(!posts.length){

      slider.innerHTML =
      crearEstadoVacio();

      return;

    }


    const slidesHTML =
    posts
      .map(post => {

        const data =
        obtenerDataPost(post);

        if(!data.texto) return "";

        return crearSlide(
          data.avatar,
          data.nombre,
          data.texto
        );

      })
      .join("");


    if(!slidesHTML){

      slider.innerHTML =
      crearEstadoVacio();

      return;

    }


    slider.innerHTML =
    slidesHTML;

    iniciarSliderSabias();

    SABIAS.iniciado = true;

  }

  catch(err){

    console.log(
      "[Sabías Qué]",
      err
    );

  }

}


function iniciarSliderSabias(){

  try{

    const slider =
    document.querySelector(
      ".sabias-slider"
    );

    if(!slider) return;

    const items =
    [...slider.querySelectorAll(
      ".sabias-item"
    )];

    if(!items.length) return;

    const prev =
    document.querySelector(
      ".sabias-btn.prev"
    );

    const next =
    document.querySelector(
      ".sabias-btn.next"
    );

    let actual = 0;

    function mostrar(index){

      items.forEach((item, i) => {

        item.style.display =
        i === index
          ? "flex"
          : "none";

      });

    }

    mostrar(actual);

    next?.addEventListener("click", () => {

      actual =
      (actual + 1)
      % items.length;

      mostrar(actual);

    });


    prev?.addEventListener("click", () => {

      actual =
      (actual - 1 + items.length)
      % items.length;

      mostrar(actual);

    });

  }

  catch(err){

    console.log(
      "[Slider Sabías]",
      err
    );

  }

}


document.addEventListener(
  "DOMContentLoaded",
  iniciarSabiasQue
);
