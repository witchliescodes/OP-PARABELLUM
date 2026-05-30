$(function(){

    const $onlineBlock = $(".op-aest");

    if(!$onlineBlock.length) return;


    if($onlineBlock.hasClass("stats-ready")) return;

    $onlineBlock.addClass("stats-ready");


    const text = $(".online-data").text();

    if(!text.length) return;


    const numbers = text.match(/\d+/g) || [];


    const online = numbers[0] || "0";

    const hidden = numbers[1] || "0";

    const guests = numbers[2] || "0";


    $(".online-count").append(`
        <span class="stat-number">
            ${online}
        </span>
    `);

    $(".hidden-count").append(`
        <span class="stat-number">
            ${hidden}
        </span>
    `);

    $(".guest-count").append(`
        <span class="stat-number">
            ${guests}
        </span>
    `);

});
