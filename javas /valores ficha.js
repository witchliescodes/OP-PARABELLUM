function arreglarDatif(){

$(".datif").each(function(){

const $datif = $(this);

$datif.contents().each(function(){


if(this.nodeType !== 3) return;

const texto =
this.textContent.trim();


if(!texto) return;


if(texto === "") return;


if(
$(this).prev().hasClass("datival")
)
return;



$(
`<span class="datival">${texto}</span>`
).insertBefore(this);

$(this).remove();

});

});

}


$(function(){

arreglarDatif();

});

new MutationObserver(function(){

arreglarDatif();

}).observe(

document.body,

{
childList:true,
subtree:true
}

);
