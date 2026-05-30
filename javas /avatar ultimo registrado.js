$(function () {

  const newestLink = $('.newestext a').attr('href');
  if (!newestLink) return;

  $.get(newestLink)
    .done(function (data) {

      const $html = $(data);

      const $avatar =
        $html.find('.perfilavatar img').first().clone() ||
        $html.find('img[alt*="avatar"]').first().clone() ||
        $html.find('.avatar img').first().clone();

      if ($avatar && $avatar.length) {
        $('#avaulti').empty().append($avatar);
      } else {
        console.warn("No se encontró avatar en el perfil.");
      }

    })
    .fail(function () {
      console.warn("Error cargando el perfil del último usuario.");
    });

});
