document.addEventListener("DOMContentLoaded", function(){

const user = document.querySelector("h1 .usr_grp_clr");
const perfil = document.querySelector(".opp-perf");

if(!user || !perfil) return;

const clases = [...user.classList];

const grupo = clases.find(c => c.startsWith("group-"));

if(grupo){
   perfil.classList.add(grupo);
}

});
