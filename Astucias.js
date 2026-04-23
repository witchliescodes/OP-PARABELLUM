$(document).ready(function(){
// Estas dos líneas borrarán las frases de fecha y hora actual y tu última visita en todas las páginas.
  $('#main-content > p:contains("Fecha y hora actual")').remove();
  $('#main-content > p:contains("Tu última visita fue")').remove();
		
// Esta línea borrará el links de la barra de navegación que no usaremos
  $('a.mainmenu[href*="/calendar"]').parent().remove();
   $('a.mainmenu[href*="/images"]').parent().remove();
   $('a.mainmenu[href*="/faq"]').parent().remove();

// Esta línea le dará una clase al body cuando el que lo visita sea un invitado.
$('a.mainmenu[href*="/register"]').parents('body').addClass('bodyinvi');
	
// Reemplazar imagenes de botones
// vigilar subforos y temas	
$('a[href*="?watch=topic"]').attr('title', 'Vigilar tema').html('<em class="fas fa-eye"></em>');
$('a[href*="?unwatch=topic"]').attr('title', 'Dejar de vigilar tema').html('<em class="fas fa-eye-slash"></em>');
$('a[href*="?watch=forum"]').attr('title', 'Vigilar subforo').html('<em class="fas fa-eye"></em>');
$('a[href*="?unwatch=forum"]').attr('title', 'Dejar de vigilar subforo').html('<em class="fas fa-eye-slash"></em>');

// Edición de temas
$('a[href*="&mode=quote"]').attr('title', 'Citar mensaje').html('<em class="fas fa-quote-left"></em>');
$('a[href*="&mode=edit"]:not("p.copyright a")').attr('title', 'Editar mensaje').html('<em class="fas fa-cogs"></em>');
$('a[href*="&mode=delete"]').attr('title', 'Borrar mensaje').html('<em class="fas fa-times"></em>');
$('a[href*="?mode=ip"]').attr('title', 'Ver IP').html('<em class="fas fa-exclamation-triangle"></em>');

// Botones 	
$('img[src*="user_profile"]').parent().attr('title', 'Perfil de Usuario').html('<em class="fas fa-user"></em>');
$('img[src*="contact_pm"]').parent().attr('title', 'Mensaje Privado').html('<em class="fi fi-rr-envelope"></em>');
$('img[src*="https://2img.net/images2.imgbox.com/64/db/MjYGVDud_o.png"]').parent().attr('title', 'Expediente de Personaje').html('<em class="game-icon game-icon-bookmarklet"></em>');
$('img[src*="https://images2.imgbox.com/01/0a/Q5wtTsfJ_o.png"]').parent().attr('title', 'Hoja de personaje').html('<em class="game-icon game-icon-crossed-axes"></em>');
	
// Botones de Moderacion



	
// Mover cosas
$('.admpp').appendTo('.panela ');	// boton de la administración
$(".opp-mtopi").appendTo("#opp-ltop");	// ultimos temas en tablón de anuncios
$(".likospicos").appendTo(".prikos"); // pasar links de utilidad a tablón
$(".est-links").appendTo(".stalinky");
});

// Esta función borrará algunas partes de la toolbar que no necesitamos.
$(window).load(function () { 
  $('#fa_left, #fa_search, #fa_share').remove();   
	
//Contador de subforos
document.querySelectorAll('.oppfor').forEach((categoria) => {
  categoria.querySelectorAll('.fori').forEach((fila, indice) => {
    const numero = fila.querySelector('.numc');
    if (numero) {
      numero.textContent = indice + 1;
    }
  });
});
	
});
