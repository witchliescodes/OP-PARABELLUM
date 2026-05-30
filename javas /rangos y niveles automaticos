window.RangosOP = {

  calcularNivel(pa){

    return Math.min(
      12,
      Math.floor((pa - 1) / 5) + 1
    );

  },

  rangoMarina(rep,pp){

    if(rep >= 1000 && pp >= 120) return "Almirante de Flota";
    if(rep >= 700 && pp >= 100) return "Almirante";
    if(rep >= 450 && pp >= 80) return "Vice-Almirante";
    if(rep >= 300 && pp >= 60) return "Contra-Almirante";
    if(rep >= 200 && pp >= 50) return "Comodoro";
    if(rep >= 120 && pp >= 40) return "Capitán";
    if(rep >= 80) return "Teniente";
    if(rep >= 40) return "Cabo";

    return "Recluta";

  },

  rangoGobierno(rep,pp){

    if(rep >= 1000 && pp >= 120) return "Gobernador";
    if(rep >= 800 && pp >= 110) return "Líder CP0";
    if(rep >= 600 && pp >= 80) return "Miembro CP0";
    if(rep >= 400 && pp >= 100) return "Líder CP9";
    if(rep >= 300 && pp >= 70) return "Líder CP 1-8";
    if(rep >= 200 && pp >= 70) return "Miembro CP9";
    if(rep >= 100) return "Miembro CP 1-8";
    if(rep >= 50) return "Agente";

    return "Agente en Practicas";

  },


  rangoRevos(rep,pp){

    if(rep >= 1000 && pp >= 120)
      return "Líder de la Revolución";

    if(rep >= 700 && pp >= 100)
      return "Segundo al Mando";

    if(rep >= 300)
      return "Líder de División";

    if(rep >= 150)
      return "Comandante";

    if(rep >= 50)
      return "Revolucionario";

    return "Libertario";

  },


  rangoCazadores(rep,pp){

    if(rep >= 600 && pp >= 120)
      return "Mr. 0 / Miss All Sunday";

    if(rep >= 600 && pp >= 100)
      return "Mr. 1 / Miss Doublefinger";

    if(rep >= 600 && pp >= 80)
      return "Mr. 2 / Miss Bon Kure";

    if(rep >= 300)
      return "Agente";

    if(rep >= 100)
      return "Agente Fronterizo";

    if(rep >= 50)
      return "Billion";

    return "Million";

  },

  rangoPiratas(wanted){

    if(wanted >= 3000000000)
      return "Rey Pirata";

    if(wanted >= 2000000000)
      return "Yonko";

    if(wanted >= 1000000000)
      return "Comandante";

    if(wanted >= 500000000)
      return "Calamidad";

    if(wanted >= 100000000)
      return "Supernova";

    if(wanted >= 50000000)
      return "Pirata Destacado";

    if(wanted >= 15000000)
      return "Pirata";

    if(wanted >= 5000000)
      return "Criminal";

    if(wanted >= 100000)
      return "Bandido";

    return "Vándalo";

  },


  rangoCiviles(rep,berries){

    if(rep >= 200 && berries >= 1200000000000)
      return "Noble";

    if(rep >= 200)
      return "Celebridad";

    return "Ciudadano";

  }

};


const CONFIG_GRUPOS = {

  "15": {
    nombre: "Staff",
    icono: "game-icon-laurel-crown",
    rango: () => "Administrador"
  },
	
  "2": {
    nombre: "Moderador",
    icono: "game-icon-police-badge",
    rango: () => "Moderador"
  },
	
  "12": {
    nombre: "Moderador Jr",
    icono: "game-icon-police-badge",
    rango: () => "Moderador Jr"
  },
   "11": {
    nombre: "Narrador",
    icono: "game-icon-paper-windmill",
    rango: () => "Narrador"
  },
   "13": {
    nombre: "Narrador Jr",
    icono: "game-icon-paper-windmill",
    rango: () => "Narrador Jr"
  },
	
  "5": {
    nombre: "Piratas",
    icono: "game-icon-crowned-skull",
    rango: (d) =>
      window.RangosOP.rangoPiratas(d.wanted)
  },

  "6": {
    nombre: "Armada Marina",
    icono: "game-icon-ship-wheel",
    rango: (d) =>
      window.RangosOP.rangoMarina(d.rep,d.pp)
  },

  "7": {
    nombre: "Baroque Works",
    icono: "game-icon-cowled",
    rango: (d) =>
      window.RangosOP.rangoCazadores(d.rep,d.pp)
  },

  "8": {
    nombre: "Armada Revolucionaria",
    icono: "game-icon-revolt",
    rango: (d) =>
      window.RangosOP.rangoRevos(d.rep,d.pp)
  },

"9": {
  nombre: "Gobierno Mundial",
  icono: "game-icon-crown",
  rango: (d) =>
    window.RangosOP.rangoGobierno(
      d.rep,
      d.pp
    )
},

"10": {
  nombre: "Civiles",
  icono: "game-icon-bookmarklet",
  rango: (d) =>
    window.RangosOP.rangoCiviles(
      d.rep,
      d.berries
    )
}

};


function numero(valor = ""){

  return Number(
    String(valor)
    .replace(/[^\d-]/g, "")
  ) || 0;

}

function obtenerGrupoClase(elemento){

  const clase =
  [...elemento.classList]
  .find(c => c.startsWith("post-group-"));

  if(!clase) return null;

  return clase.replace("post-group-","");

}

function obtenerDatosPost(post){

  const datos = {

    rep: 0,
    pp: 0,
    wanted: 0,
    berries: 0,
    rangoRol: "Ninguno"

  };

  post.querySelectorAll(".pf")
  .forEach(campo => {

    const label =
    campo.querySelector(".label")
    ?.textContent
    ?.trim()
    ?.toUpperCase();

    const valor =
    campo.querySelector(".pf-content")
    ?.textContent
    ?.trim();

    if(!label) return;

    if(label.includes("REP")){

      datos.rep = numero(valor);

    }

    else if(label.includes("PP")){

      datos.pp = numero(valor);

    }

    else if(label.includes("WANTED")){

      datos.wanted = numero(valor);

    }

    else if(label.includes("BERRIES")){

      datos.berries = numero(valor);

    }

    else if(label.includes("RANGO POR ROL")){

      datos.rangoRol = valor;

    }

  });

  return datos;

}


function obtenerRangoFinal(datos, grupo){

  if(
    datos.rangoRol &&
    datos.rangoRol !== "Ninguno"
  ){

    return datos.rangoRol;

  }

  return grupo.rango(datos);

}



document.addEventListener("perfilListo", function(){

  if(!window.perfilDatos) return;

  const {
    pa,
    pp,
    rep,
    wanted,
    berries
  } = window.perfilDatos;


  const nivelEl =
  document.querySelector(".bellvl .valor");

  if(nivelEl){

    nivelEl.textContent =
    window.RangosOP.calcularNivel(pa);

  }


  let grupoID = null;

  const grupos =
  document.querySelectorAll('[id^="g"][id$="-name"]');

  for(const el of grupos){

    if(el.id !== "g1-name"){

      grupoID =
      el.id.replace("g","")
      .replace("-name","");

      break;

    }

  }

  if(!grupoID) return;

  const grupo =
  CONFIG_GRUPOS[grupoID];

  if(!grupo) return;


  let rangoRol = "Ninguno";

  const camposPerfil =
  document.querySelectorAll("dl");

  camposPerfil.forEach(campo => {

    const label =
    campo.querySelector("dt")
    ?.textContent
    ?.trim()
    ?.toUpperCase();

    const valor =
    campo.querySelector(".field_uneditable")
    ?.textContent
    ?.trim();

    if(
      label &&
      label.includes("RANGO POR ROL")
    ){

      rangoRol = valor || "Ninguno";

    }

  });


  const datos = {

    rep,
    pp,
    wanted,
    berries,
    rangoRol

  };


  const fac =
  document.querySelector(".facgrup");

  if(!fac) return;

  fac.innerHTML = `
    <div class="iconofac">
      <i class="game-icon ${grupo.icono}"></i>
    </div>

    <div class="nombrefac">
      ${grupo.nombre}
    </div>

    <div class="rangofaccion">
      ${obtenerRangoFinal(datos, grupo)}
    </div>
  `;

});


function iniciarRangosPosts(){

  const posts =
  document.querySelectorAll(
    '[class*="post-group-"]'
  );

  if(!posts.length) return;

  posts.forEach(post => {

    const grupoID =
    obtenerGrupoClase(post);

    if(!grupoID) return;

    const grupo =
    CONFIG_GRUPOS[grupoID];

    if(!grupo) return;

    const datos =
    obtenerDatosPost(post);

    const caja =
    post.querySelector(".p-rang");

    if(!caja) return;

    caja.innerHTML = `
      <div class="prang-icon">
        <i class="game-icon ${grupo.icono}"></i>
      </div>

      <div class="prang-text">
        ${obtenerRangoFinal(datos, grupo)}
      </div>
    `;

  });

}


setTimeout(() => {

  iniciarRangosPosts();

}, 300);
