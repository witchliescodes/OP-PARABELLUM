window.addEventListener("load", function(){

setTimeout(function(){

document.querySelectorAll('.atr').forEach(stat=>{

   let barra = stat.querySelector('.valor');

   let num = parseInt(barra.textContent.trim()) || 0;

   let porcentaje = Math.min((num / 35) * 100, 100);

   let color = "#9e9e9e";

   if(num > 5) color = "#65e28e";
   if(num > 10) color = "#ffd76c";
   if(num > 15) color = "#ff7272";
   if(num > 25) color = "#b685ff";

   barra.style.setProperty("--w", porcentaje + "%");
   barra.style.setProperty("--c", color);

   barra.textContent = "";

   let numero = document.createElement("span");
   numero.className = "num";
   numero.textContent = num;

   stat.appendChild(numero);

});

},500);

});
