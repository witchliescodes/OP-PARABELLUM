$(function(){

  $('#btn-creditos').on('click', function(e){
    e.preventDefault();
    $('#creditos-modal').addClass('show');
  });

  $('#cerrar-creditos').on('click', function(){
    $('#creditos-modal').removeClass('show');
  });

  $('#creditos-modal').on('click', function(e){
    if($(e.target).is('#creditos-modal')){
      $('#creditos-modal').removeClass('show');
    }
  });

  $('.tab-btn').on('click', function(){

    var tabID = $(this).data('tab');

    $('.tab-btn').removeClass('active');
    $(this).addClass('active');

    $('.tab-panel').removeClass('active');
    $('#' + tabID).addClass('active');

  });

});

document.addEventListener("DOMContentLoaded", function(){

  const tabs = document.querySelectorAll(".tab-btn");
  const panels = document.querySelectorAll(".tab-panel");

  tabs.forEach(btn => {
    btn.addEventListener("click", () => {

      const target = btn.getAttribute("data-tab");

      tabs.forEach(b => b.classList.remove("active"));
      panels.forEach(p => p.classList.remove("active"));

      btn.classList.add("active");
      document.getElementById(target).classList.add("active");

    });
  });

});
