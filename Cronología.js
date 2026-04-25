// =========================
// CRONOLOGÍA PREMIUM
// =========================
document.addEventListener("DOMContentLoaded", function () {

setTimeout(()=>{

const zona = document.querySelector(".cronos .valor");
if(!zona) return;

let raw = zona.innerHTML;

/* separar categorías */
const bloques = raw.split(/\[categoria\]/i);

let finalHTML = "";

bloques.forEach(bloque=>{

   if(!bloque.trim()) return;

   const partes = bloque.split(/\[\/categoria\]/i);
   if(partes.length < 2) return;

   const titulo = partes[0].trim();
   let contenido = partes[1].trim();

   /* separar cada entrada por doble salto */
let items = contenido
.split(/(?=<(?:strong|b)>\d+\.)/i)
.filter(item => item.replace(/<br\s*\/?>/gi,"").trim() !== "");

   let htmlItems = "";

items.forEach(item=>{

   item = item.replace(/<br\s*\/?>/gi,"").trim();

   if(!item) return;

      let numero = "";
      let fecha = "";

      /* número */
let numMatch = item.match(/<(strong|b)>(.*?)<\/(strong|b)>/i);
if(numMatch) numero = numMatch[2];

      /* fecha */
      let fechaMatch = item.match(/\[fecha\](.*?)\[\/fecha\]/i);
      if(fechaMatch) fecha = fechaMatch[1];

      /* limpiar */
      item = item
        .replace(/<strong>.*?<\/strong>/i,"")
        .replace(/\[fecha\].*?\[\/fecha\]/i,"")
        .trim();

htmlItems += `
<div class="cronoitem">

   <div class="cronofecha">${fecha}</div>

   <div class="cronopunto"></div>

   <div class="cronobody">
      <span class="crononum">${numero}</span>
      ${item}
   </div>

</div>
`;

   });

   finalHTML += `
   <div class="cronoblock">

      <div class="cronotitle">
         ${iconoCategoria(titulo)}
         <span>${titulo}</span>
      </div>

      <div class="cronocontent">
         ${htmlItems}
      </div>

   </div>
   `;

});

zona.innerHTML = finalHTML;


document.querySelectorAll(".cronotitle").forEach(btn=>{

   btn.addEventListener("click", function(){

      this.parentNode.classList.toggle("open");

   });

});


const first = document.querySelector(".cronoblock");
if(first) first.classList.add("open");

},500);


// =========================
// ICONOS
// =========================
function iconoCategoria(nombre){

nombre = nombre.toLowerCase();

if(nombre.includes("combate"))
return '<i class="fi fi-rr-sword"></i>';

if(nombre.includes("activo"))
return '<i class="fi fi-rr-flame"></i>';

if(nombre.includes("cerrado"))
return '<i class="fi fi-rr-document"></i>';

if(nombre.includes("evento"))
return '<i class="fi fi-rr-stars"></i>';

if(nombre.includes("tripulación"))
return '<i class="fi fi-rr-skull"></i>';

if(nombre.includes("global"))
return '<i class="fi fi-rr-world"></i>';

return '<i class="fi fi-rr-folder"></i>';

}
	
	});
