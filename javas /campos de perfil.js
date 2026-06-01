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
const berries = parseInt(obtenerCampo("Berries").replace(/\D/g,"")) || 0;
const wanted = parseInt(obtenerCampo("Wanted").replace(/\D/g,"")) || 0;

window.perfilDatos = {
   pa,
   pp,
   pr,
   rep,
   berries,
   wanted
};

ponerHTML(".PAcampo", pa);
ponerHTML(".PPcampo", pp);
ponerHTML(".PRcampo", pr);
ponerHTML(".REPcampo", rep);

ponerHTML(".mensajes", obtenerCampo("Mensajes"));
ponerHTML(".registro", obtenerCampo("Fecha de inscripción"));

ponerHTML(".pedad", obtenerCampo("Edad"));
ponerHTML(".palt", obtenerCampo("Altura"));
ponerHTML(".praza", obtenerCampo("Raza"));
ponerHTML(".pisl", obtenerCampo("Isla"));
ponerHTML(".pberr", obtenerCampo("Berries"));
ponerHTML(".pwant", obtenerCampo("Wanted"));
ponerHTML(".paku", obtenerCampo("Akuma"));	
ponerHTML(".pb", obtenerCampo("PB"));
ponerHTML(".fra", obtenerCampoHTML("Frase"));
ponerHTML(".music", obtenerCampoHTML("Playlist"));
	
ponerHTML(".vida", obtenerCampoHTML("Vida"));	
ponerHTML(".energia", obtenerCampoHTML("Energía"));		
ponerHTML(".fuerza", obtenerCampoHTML("Fuerza"));		
ponerHTML(".resistencia", obtenerCampoHTML("Resistencia"));	
ponerHTML(".velocidad", obtenerCampoHTML("Velocidad"));		
ponerHTML(".inteligencia", obtenerCampoHTML("Inteligencia"));	
	
ponerHTML(".cronos", obtenerCampoHTML("Cronologia"));	

	
	
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
	
/*ULTIMA VISITA*/	
const ultimaEl =
document.querySelector(".ultima");

if(ultimaEl){

const texto =
ultimaEl.textContent;

const meses = {

Ene:"01",
Feb:"02",
Mar:"03",
Abr:"04",
May:"05",
Jun:"06",
Jul:"07",
Ago:"08",
Sep:"09",
Oct:"10",
Nov:"11",
Dic:"12",

Enero:"01",
Febrero:"02",
Marzo:"03",
Abril:"04",
Mayo:"05",
Junio:"06",
Julio:"07",
Agosto:"08",
Septiembre:"09",
Octubre:"10",
Noviembre:"11",
Diciembre:"12"

};

const match =
texto.match(
/(\d{1,2})\s+([A-Za-zÁÉÍÓÚáéíóú]+)\s+(\d{4}).*?(\d{1,2}:\d{2})/
);

if(match){

const dia =
match[1].padStart(2,"0");

const mes =
meses[match[2]];

const año =
match[3];

const hora =
match[4];

if(mes){

ultimaEl.innerHTML =
`Conexión:&nbsp;${dia}/${mes}/${año} | ${hora}`;

}

}

}
/* ESTADO */

const estadoEl =
document.querySelector(".estado");

if(estadoEl){

const texto =
estadoEl.textContent
.trim()
.toLowerCase();

if(
texto.includes("fuera")
){

estadoEl.innerHTML =
`<i class="fi fi-rr-wifi-slash"></i> Fuera de línea`;

estadoEl.classList.add(
"estado-offline"
);

}

else if(

texto.includes("línea")
||
texto.includes("linea")
||
texto.includes("conectado")
||
texto.includes("online")

){

estadoEl.innerHTML =
`<i class="fi fi-rr-wifi"></i> En línea`;

estadoEl.classList.add(
"estado-online"
);

}

}	
	
// EVENTO FINAL
document.dispatchEvent(new Event("perfilListo"));

});
