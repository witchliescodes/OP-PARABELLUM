$(function () {

    const groupsData = {

        "Administradores": {
            icon: "game-icon-laurel-crown",
            className: "admin"
        },

        "Moderadores": {
            icon: "game-icon-police-badge",
            className: "mod"
        },

        "Moderadores Jr.": {
            icon: "game-icon-police-badge",
            className: "modjr"
        },

        "Narradores": {
            icon: "game-icon-paper-windmill",
            className: "narrador"
        },

        "Narradores Jr.": {
            icon: "game-icon-paper-windmill",
            className: "narradorjr"
        },

        "Piratas": {
            icon: "game-icon-crowned-skull",
            className: "pirata"
        },

        "Gobierno Mundial": {
            icon: "game-icon-crown",
            className: "gobierno"
        },

        "Civiles": {
            icon: "game-icon-bookmarklet",
            className: "civil"
        },

        "Baroque Works": {
            icon: "game-icon-cowled",
            className: "baroque"
        },

        "Marina": {
            icon: "game-icon-ship-wheel",
            className: "marina"
        },

        "Armada Revolucionaria": {
            icon: "game-icon-revolt",
            className: "armada"
        }

    };



    const $container = $(".op-grups");

    if (!$container.length) return;



    const $links = $container.find("a[href*='/g']");

    if (!$links.length) return;



    const $groupsWrapper = $('<div class="groups-wrapper"></div>');



    $links.each(function () {

        const $link = $(this);


        const groupName = $link.text()
            .replace(/\s+/g, " ")
            .trim();



        const data = groupsData[groupName];

        if (!data) return;


        const href = $link.attr("href");


        const $newGroup = $(`
            <a href="${href}"
               class="rpg-group ${data.className}">

                <span class="rpg-group-icon">
                    <i class="game-icon ${data.icon}"></i>
                </span>

                <span class="rpg-group-name">
                    ${groupName}
                </span>

            </a>
        `);


        $groupsWrapper.append($newGroup);

    });


    const headerHTML = $container.find(".congroup")[0]?.outerHTML || "";

    $container.html(headerHTML);


    $container.append($groupsWrapper);

});
