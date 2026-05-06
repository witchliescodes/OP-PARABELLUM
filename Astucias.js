$(function () {

  // =========================
  // Limpiar cosas que no ocupamos
  // =========================

  $('#main-content > p:contains("Fecha y hora actual")').remove();
  $('#main-content > p:contains("Tu última visita fue")').remove();

  $('a.mainmenu[href*="/calendar"]').parent().remove();
  $('a.mainmenu[href*="/images"]').parent().remove();
  $('a.mainmenu[href*="/faq"]').parent().remove();

  // Invitado detectado por existencia del botón register
  if ($('a.mainmenu[href*="/register"]').length) {
    $('body').addClass('bodyinvi');
  }

  // =========================
  // visto o no visto en temas
  // =========================

  $('a[href*="?watch=topic"]').html('<em class="fas fa-eye"></em>').attr('title', 'Vigilar tema');
  $('a[href*="?unwatch=topic"]').html('<em class="fas fa-eye-slash"></em>').attr('title', 'Dejar de vigilar tema');
  $('a[href*="?watch=forum"]').html('<em class="fas fa-eye"></em>').attr('title', 'Vigilar subforo');
  $('a[href*="?unwatch=forum"]').html('<em class="fas fa-eye-slash"></em>').attr('title', 'Dejar de vigilar subforo');

  // =========================
  // Iconos del perfil, posts, topic list con tooltip
  // =========================

const btns = [
  {
    selector: 'a[href*="&mode=quote"]',
    icon: '<i class="fi fi-rr-square-quote"></i>',
    title: 'Citar mensaje',
    isLink: true
  },
  {
    selector: 'a[href*="&mode=edit"]',
    icon: '<i class="fi fi-rr-edit"></i>',
    title: 'Editar mensaje',
    isLink: true
  },
  {
    selector: 'a[href*="&mode=delete"]',
    icon: '<i class="fi fi-rr-trash-xmark"></i>',
    title: 'Borrar mensaje',
    isLink: true
  },	
  {
    selector: 'a[href*="?mode=ip"]',
    icon: '<i class="fi fi-rr-ip-address"></i>',
    title: 'Ver IP',
    isLink: true
  },	
  {
    selector: 'img[src*="user_profile"]',
    icon: '<i class="fas fa-user"></i>',
    title: 'Perfil del personaje'
  },
  {
    selector: 'img[src*="contact_pm"]',
    icon: '<i class="game-icon game-icon-envelope"></i>',
    title: 'Mensaje Privado'
  },
  {
    selector: 'img[src*="MjYGVDud_o.png"]',
    icon: '<i class="game-icon game-icon-bookmarklet"></i>',
    title: 'Expediente de Personaje'
  },
  {
    selector: 'img[src*="Q5wtTsfJ_o.png"]',
    icon: '<i class="game-icon game-icon-crossed-axes"></i>',
    title: 'Hoja de personaje'
  }
];

btns.forEach(b => {

  const el = b.isLink
    ? $(b.selector)
    : $(b.selector).parent();

  el.attr({
      title: b.title,
      'data-bs-toggle': 'tooltip',
      'data-bs-custom-class': 'custom-tooltip'
    })
    .html(b.icon);

});

  if (window.bootstrap) {
    document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => {
      new bootstrap.Tooltip(el);
    });
  }

  // =========================
  // MOVER COSAS EN EL DOM
  // =========================

  $('.admpp').appendTo('.panela');
  $(".opp-mtopi").appendTo("#opp-ltop");
  $(".likospicos").appendTo(".prikos");
  $(".est-links").appendTo(".stalinky");

});

// =========================
// Contador de subforos y borrado final
// =========================

$(window).on('load', function () {

  $('#fa_left, #fa_search, #fa_share').remove();

  // Contador de subforos optimizado
  document.querySelectorAll('.oppfor').forEach(categoria => {

    const filas = categoria.querySelectorAll('.fori');

    filas.forEach((fila, index) => {
      const num = fila.querySelector('.numc');
      if (num) num.textContent = index + 1;
    });

  });

});
