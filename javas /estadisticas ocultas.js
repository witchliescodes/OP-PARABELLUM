$(function(){

const sections = [

{
selector: ".op-aest",
readyClass: "aest-ready",
removeText: [
"Usuarios registrados:"
]
},

{
selector: ".op-nest",
readyClass: "nest-ready",
removeText: [
"Miembros conectados en las últimas 48 horas:"
]
}

];



sections.forEach(config=>{

const $container =
$(config.selector);


if(
!$container.length ||
$container.hasClass(
config.readyClass
)
)

return;



$container.addClass(
config.readyClass
);



/* ELIMINAR BR */

$container
.find("br")
.remove();



/* LEER HTML */

let html =
$container.html();



/* QUITAR TEXTOS */

config.removeText.forEach(str=>{

const regex =
new RegExp(
str
.replace(
/[-\/\\^$*+?.()|[\]{}]/g,
'\\$&'
),

"gi"

);

html =
html.replace(
regex,
""
);

});



/* LIMPIAR COMAS */

html = html

/* quitar espacios raros */
.replace(/\s+/g," ")

/* doble coma */
.replace(/,+/g,",")

/* quitar espacio antes */
.replace(/\s+,/g,",")

/* agregar espacio después */
.replace(/,\s*/g,", ")

/* arreglar entre etiquetas */
.replace(/>,\s+</g,">, <")

/* limpiar bordes */
.replace(/^,\s*/,"")

.replace(/,\s*$/,"")

.trim();



/* REINSERTAR */

$container.html(
html
);



/* LIMPIAR NODOS VACIOS */

$container
.contents()

.filter(function(){

return (

this.nodeType===3 &&

!this.textContent
.trim()

);

})

.remove();



});

});
