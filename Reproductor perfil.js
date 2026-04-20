document.addEventListener("DOMContentLoaded", function () {

setTimeout(function () {
    crearRadioRetro();
}, 700);


// =========================
// RADIO RETRO PRO FINAL
// =========================
function crearRadioRetro() {

const contenedor = document.querySelector(".music .valor");
if (!contenedor) return;

let contenido = contenedor.innerHTML.trim();
if (!contenido || contenido === "-") return;


// ---------------------
// LIMPIAR LINEAS
// ---------------------
let lineas = contenido
.replace(/<br\s*\/?>/gi, "\n")
.split("\n")
.map(x => x.trim())
.filter(x => x.length > 0)
.slice(0, 20);


// ---------------------
// SACAR ID YOUTUBE
// ---------------------
function sacarID(url) {

try {

if (url.includes("watch?v=")) {
return url.split("v=")[1].split("&")[0];
}

if (url.includes("youtu.be/")) {
return url.split("youtu.be/")[1].split("?")[0];
}

if (url.includes("/embed/")) {
return url.split("/embed/")[1].split("?")[0];
}

return "";

} catch (e) {
return "";
}

}


// ---------------------
// PLAYLIST
// ---------------------
let lista = lineas.map(linea => {

let partes = linea.split("|");

return {
titulo: partes[0]?.trim() || "Unknown",
imagen: partes[1]?.trim() || "",
id: sacarID(partes[2]?.trim() || "")
};

}).filter(x => x.id);

if (!lista.length) return;


// ---------------------
// HTML
// ---------------------
contenedor.innerHTML = "";

const radio = document.createElement("div");
radio.className = "radio-retro";

radio.innerHTML = `

<div class="radio-cover">
<img class="cover-img" src="">
</div>

<div class="radio-title">Cargando...</div>

<div class="radio-controls">

<button class="prev">
<i class="fi fi-rr-rewind"></i>
</button>

<button class="play">
<i class="fi fi-rr-play"></i>
</button>

<button class="next">
<i class="fi fi-rr-forward"></i>
</button>

<div class="radio-volume">

<button type="button" class="vol-btn">
<i class="fi fi-rr-volume"></i>
</button>

<div class="vol-popup">
<input
type="range"
class="volumen"
min="0"
max="100"
value="100"
orient="vertical">
</div>

</div>

</div>

<div class="radio-progress">
<div class="bar"></div>
</div>

<div id="yt-player" style="display:none;"></div>

`;

contenedor.appendChild(radio);


// ---------------------
// ELEMENTOS
// ---------------------
const titulo = radio.querySelector(".radio-title");
const cover = radio.querySelector(".cover-img");
const playBtn = radio.querySelector(".play");
const nextBtn = radio.querySelector(".next");
const prevBtn = radio.querySelector(".prev");
const barra = radio.querySelector(".bar");
const volumen = radio.querySelector(".volumen");
const volBtn = radio.querySelector(".vol-btn");
const volPopup = radio.querySelector(".vol-popup");

let actual = 0;
let player = null;
let sonando = false;
let intervalo = null;


// ---------------------
// SISTEMA VOLUMEN
// ---------------------

let popupAbierto = false;


// abrir / cerrar
volBtn.addEventListener("click", function(e){

e.preventDefault();
e.stopPropagation();

popupAbierto = !popupAbierto;

if(popupAbierto){
volPopup.style.display = "flex";
}else{
volPopup.style.display = "none";
}

});


// click dentro popup
volPopup.addEventListener("click", function(e){
e.stopPropagation();
});


// cerrar afuera
document.addEventListener("click", function(){

popupAbierto = false;
volPopup.style.display = "none";

});


// volumen real
function aplicarVolumen(){

if(!player) return;

let valor = parseInt(volumen.value) || 0;

player.setVolume(valor);

if(valor <= 0){
player.mute();
}else{
player.unMute();
}

}


// mover barra
volumen.addEventListener("input", aplicarVolumen);
volumen.addEventListener("change", aplicarVolumen);


// oculto al inicio
volPopup.style.display = "none";

// ---------------------
// API YOUTUBE
// ---------------------
function cargarAPI() {

if (window.YT && window.YT.Player) {
    iniciarPlayer();
    return;
}

if (!document.querySelector("#youtube-api")) {
    let tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    tag.id = "youtube-api";
    document.head.appendChild(tag);
}

// esperar hasta que cargue
let espera = setInterval(function(){

    if (window.YT && window.YT.Player) {
        clearInterval(espera);
        iniciarPlayer();
    }

}, 300);

}

// ---------------------
// PLAYER
// ---------------------
function iniciarPlayer() {

player = new YT.Player("yt-player", {

height: "0",
width: "0",
videoId: lista[0].id,

playerVars: {
autoplay: 0,
controls: 0,
rel: 0
},

events: {

onReady: function () {
player.setVolume(volumen.value);
actualizarTrack();
},

onStateChange: function (e) {

if (e.data === YT.PlayerState.PLAYING) {
sonando = true;
playBtn.innerHTML = `<i class="fi fi-rr-pause"></i>`;
iniciarBarra();
actualizarTitulo();
}

if (e.data === YT.PlayerState.PAUSED) {
sonando = false;
playBtn.innerHTML = `<i class="fi fi-rr-play"></i>`;
detenerBarra();
}

if (e.data === YT.PlayerState.ENDED) {
siguiente();
}

}

}

});

}


// ---------------------
// FUNCIONES
// ---------------------
function actualizarTitulo() {
setTimeout(() => {
try {
let data = player.getVideoData();
if (data.title) titulo.textContent = data.title;
} catch(e){}
}, 500);
}

function actualizarTrack() {
titulo.textContent = lista[actual].titulo;
cover.src = lista[actual].imagen || "";
}

function cargar(i) {
actual = i;
actualizarTrack();
barra.style.width = "0%";
player.loadVideoById(lista[i].id);
setTimeout(() => player.playVideo(), 400);
}

function siguiente() {
actual++;
if (actual >= lista.length) actual = 0;
cargar(actual);
}

function anterior() {
actual--;
if (actual < 0) actual = lista.length - 1;
cargar(actual);
}


// ---------------------
// BOTONES
// ---------------------
playBtn.onclick = function () {
if (!player) return;
if (!sonando) player.playVideo();
else player.pauseVideo();
};

nextBtn.onclick = function () {
if (player) siguiente();
};

prevBtn.onclick = function () {
if (player) anterior();
};


// ---------------------
// BARRA
// ---------------------
function iniciarBarra() {

detenerBarra();

intervalo = setInterval(() => {

try {

let actualTime = player.getCurrentTime();
let total = player.getDuration();

if (total > 0) {
barra.style.width = ((actualTime / total) * 100) + "%";
}

} catch(e){}

}, 250);

}

function detenerBarra() {
clearInterval(intervalo);
}


// ---------------------
cargarAPI();

}

});
