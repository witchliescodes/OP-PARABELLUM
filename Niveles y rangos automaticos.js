document.addEventListener("perfilListo", function(){
// Niveles automaticos
function calcularNivel(pa){
return Math.min(12, Math.floor((pa - 1) / 5) + 1);
}

// Calcular el rango según REP y PP	
function rangoMarina(rep,pp){

if(rep >= 1000 && pp >= 120) return "Almirante de Flota";
if(rep >= 700 && pp >= 100) return "Almirante";
if(rep >= 450 && pp >= 80) return "Vice-Almirante";
if(rep >= 300 && pp >= 60) return "Contra-Almirante";
if(rep >= 200 && pp >= 50) return "Comodoro";
if(rep >= 120 && pp >= 40) return "Capitán";
if(rep >= 80) return "Teniente";
if(rep >= 40) return "Cabo";

return "Recluta";

}
	
function rangoGobierno(rep,pp) {

if(rep >= 1000 && pp >= 120) return "Gobernador";
if(rep >= 800 && pp >= 110) return "Líder CP0";
if(rep >= 600 && pp >= 80) return "Miembro CP0";
if(rep >= 400 && pp >= 100) return "Líder CP9";
if(rep >= 200 && pp >= 70) return "Miembro CP9";
if(rep >= 300 && pp >= 70) return "Líder CP 1-8";
if(rep >= 100) return "Miembro CP 1-8";
if(rep >= 50) return "Agente";

return "Agente en Practicas";
	
}	
	
function rangoRevos(rep,pp) {
	
if(rep >= 1000 && pp >= 120) return "Líder de la Revolución";
if(rep >= 700 && pp >= 100) return "Segundo al Mando";
if(rep >= 300) return "Líder de División";
if(rep >= 150) return "Comandante";
if(rep >= 50) return "Revolucionario";

return "Libertario";
	
}		

function rangoCazadores(rep,pp) {

if(rep >= 600 && pp >= 120) return "Mr. 0 / Miss All Sunday";	
if(rep >= 600 && pp >= 100) return "Mr. 1 / Miss Doublefinger";
if(rep >= 600 && pp >= 80) return "Mr. 2 / Miss Bon Kure";
if(rep >= 300) return "Agente";
if(rep >= 100) return "Agente Fronterizo";
if(rep >= 50) return "Billion";

return " Million";
	
}
	
function rangoPiratas(wanted){

if(wanted >= 3000000000) return "Rey Pirata";
if(wanted >= 2000000000) return "Yonko";
if(wanted >= 1000000000) return "Comandante";
if(wanted >= 500000000) return "Calamidad";
if(wanted >= 100000000) return "Supernova";
if(wanted >= 50000000) return "Pirata Destacado";
if(wanted >= 15000000) return "Pirata";
if(wanted >= 5000000) return "Criminal";
if(wanted >= 100000) return "Bandido";

return "Novato";

}	
	
function rangoCiviles(rep, berries){

if(rep >= 200 && berries >= 1200000000000) return "Noble";
if(rep >= 200) return "Celebridad";

return "Ciudadano";

}
	
const {pa,pp,rep,wanted,berries} = window.perfilDatos;
	

document.querySelector(".bellvl .valor").textContent =
calcularNivel(pa);


// GRUPOS
let grupo = "";

const grupos = document.querySelectorAll('[id^="g"][id$="-name"]');

for(let el of grupos){
if(el.id !== "g1-name"){
grupo = el.id;
break;
}
}

let nombreGrupo = "Sin grupo";
let rango = "Sin rango";
let icono = `<i class="game-icon game-icon-ghost"></i>`;

if(grupo==="g2-name"){
nombreGrupo="Staff";
rango="Administrador";
icono=`<i class="game-icon game-icon-laurel-crown"></i>`;
}

else if(grupo==="g4-name"){
nombreGrupo="Armada Marina";
rango=rangoMarina(rep,pp);
icono=`<i class="game-icon game-icon-ship-wheel"></i>`;
}

else if(grupo==="g3-name"){
nombreGrupo="Piratas";
rango=rangoPiratas(wanted);
icono=`<i class="game-icon game-icon-crowned-skull"></i>`;
}
	
else if(grupo==="g8-name"){
nombreGrupo="Gobierno Mundial";
rango=rangoGobierno(rep,pp);
icono=`<i class="game-icon game-icon-crowned-skull"></i>`;
}	
	
else if(grupo==="g6-name"){
nombreGrupo="Revolucionarios";
rango=rangoRevos(rep,pp);
icono=`<i class="game-icon game-icon-crowned-skull"></i>`;
}	
	
else if(grupo==="g5-name"){
nombreGrupo="Cazarrecompensas";
rango=rangoCazadores(rep,pp);
icono=`<i class="game-icon game-icon-crowned-skull"></i>`;
}	

else if(grupo==="g7-name"){
nombreGrupo="Civiles";
rango=rangoCiviles(rep, berries);
icono=`<i class="game-icon game-icon-crowned-skull"></i>`;
}

const fac = document.querySelector(".facgrup");

if(fac){

fac.innerHTML = `
<div class="iconofac">${icono}</div>
<div class="nombrefac">${nombreGrupo}</div>
<div class="rangofaccion">${rango}</div>
`;

}

});
