document.addEventListener("DOMContentLoaded", function () {

function limpiarNombreCampo(texto){
return texto.replace(":","").replace(/\s+/g," ").trim().toLowerCase();
}

function obtenerCampo(nombre){

const labels = document.querySelectorAll("dt");
const buscado = limpiarNombreCampo(nombre);

for(let label of labels){

let texto = limpiarNombreCampo(label.textContent);

if(texto === buscado){

const valor = label.nextElementSibling
?.querySelector(".field_uneditable");

return valor?.textContent.trim() || "-";

}

}

return "-";

}

function obtenerCampoHTML(nombre){

const labels = document.querySelectorAll("dt");
const buscado = limpiarNombreCampo(nombre);

for(let label of labels){

let texto = limpiarNombreCampo(label.textContent);

if(texto === buscado){

const dd = label.nextElementSibling;
if(!dd) return "-";

const campo = dd.querySelector(".field_uneditable");

return campo
? campo.innerHTML.trim().replace(/"/g,"")
: "-";

}

}

return "-";

}

function ponerTexto(selector,valor){

const el = document.querySelector(selector);
if(!el) return;

const span = el.querySelector(".valor");

if(span) span.textContent = valor ?? "-";

}

function ponerHTML(selector,valor){

const el = document.querySelector(selector);
if(!el) return;

const span = el.querySelector(".valor");

if(span) span.innerHTML = valor ?? "-";

}


// DATOS
const pa = parseInt(obtenerCampo("PA")) || 0;
const pp = parseInt(obtenerCampo("PP")) || 0;
const pr = parseInt(obtenerCampo("PR")) || 0;
const rep = parseInt(obtenerCampo("REP")) || 0;

window.perfilDatos = {
pa, pp, pr, rep
};

ponerTexto(".PAcampo", pa);
ponerTexto(".PPcampo", pp);
ponerTexto(".PRcampo", pr);
ponerTexto(".REPcampo", rep);

ponerTexto(".mensajes", obtenerCampo("Mensajes"));
ponerTexto(".registro", obtenerCampo("Fecha de inscripción"));

ponerTexto(".pedad", obtenerCampo("Edad"));
ponerTexto(".palt", obtenerCampo("Altura"));
ponerTexto(".praza", obtenerCampo("Raza"));
ponerTexto(".pisl", obtenerCampo("Isla"));
ponerTexto(".pberr", obtenerCampo("Berries"));
ponerTexto(".paku", obtenerCampo("Akuma"));
ponerTexto(".pb", obtenerCampo("PB"));

ponerHTML(".fra", obtenerCampoHTML("Frase"));
ponerHTML(".music", obtenerCampoHTML("Playlist"));
ponerHTML(".vida", obtenerCampoHTML("Vida"));	
ponerHTML(".energia", obtenerCampoHTML("Energía"));		
ponerHTML(".fuerza", obtenerCampoHTML("Fuerza"));		
ponerHTML(".resistencia", obtenerCampoHTML("Resistencia"));	
ponerHTML(".velocidad", obtenerCampoHTML("Velocidad"));		
ponerHTML(".inteligencia", obtenerCampoHTML("Inteligencia"));	
	
// INVENTARIO Y CUPONERA
setTimeout(() => {

const origen = document.querySelectorAll('.award');
const objDestino = document.querySelector('.objsecc .valor');
const medDestino = document.querySelector('.seccup .valor');

if(!objDestino || !medDestino) return;

origen.forEach(item => {

   if(item.classList.contains('objeto')){
      objDestino.appendChild(item);
   }

   if(item.classList.contains('medalla')){
      medDestino.appendChild(item);
   }

});

}, 500);

	
// ONLINE
setTimeout(()=>{

const el = document.querySelector(".estado");
if(!el) return;

let texto = el.textContent.toLowerCase();

if(texto.includes("en línea") || texto.includes("en linea")){
el.classList.add("on");
el.innerHTML = `<i class="fi fi-rr-wifi"></i> En línea`;
}else{
el.classList.add("off");
el.innerHTML = `<i class="fi fi-rr-wifi-slash"></i> Fuera de línea`;
}

},500);


// ÚLTIMA VISITA
const ultimaEl = document.querySelector(".ultima");

if(ultimaEl){

let texto = ultimaEl.textContent;
texto = texto.split(":").slice(1).join(":").trim();

const [fechaParte,hora] = texto.split(" - ");

if(fechaParte && hora){

const partes = fechaParte.split(" ");

const dia = partes[1];
const mesTexto = partes[2];
const año = partes[3];

const meses = {
Ene:"01",Feb:"02",Mar:"03",Abr:"04",
May:"05",Jun:"06",Jul:"07",Ago:"08",
Sep:"09",Oct:"10",Nov:"11",Dic:"12"
};

ultimaEl.textContent =
`Última visita: ${dia}/${meses[mesTexto]}/${año} | ${hora}`;

}

}


// EVENTO FINAL
document.dispatchEvent(new Event("perfilListo"));

});
