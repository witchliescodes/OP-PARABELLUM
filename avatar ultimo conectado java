$(document).ready(function(){
  console.log("inicio");

  var newestperfil = $('.newestext a').attr('href');
  console.log("perfil:", newestperfil);

  if (!newestperfil) return;

  $.get(newestperfil, function(data) {
    console.log("perfil cargado");

    var avatar = $(data).find('.perfilavatar img').first();

    console.log("avatar encontrado:", avatar.length);

    if (avatar.length) {
      $('#avaulti').html(avatar);
    } else {
      console.log("no encontró avatar ????");
    }
  });
});
