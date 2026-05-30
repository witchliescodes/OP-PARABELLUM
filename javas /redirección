document.addEventListener("DOMContentLoaded", () => {

    function irAlPost() {

        const hash = window.location.hash;

        const match = hash.match(/^#(\d+)$/) ||
                      hash.match(/^#p(\d+)$/);

        if (!match) return;

        const id = match[1];

        if (hash === `#${id}`) {
            history.replaceState(
                null,
                "",
                `${location.pathname}${location.search}#p${id}`
            );
        }

        let intentos = 0;

        const buscar = () => {

            const objetivo =
                document.getElementById(`p${id}`) ||
                document.getElementById(`post-${id}`) ||
                document.querySelector(`a[name="${id}"]`);

            if (objetivo) {

                objetivo.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                setTimeout(() => {
                    objetivo.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }, 500);

                setTimeout(() => {
                    objetivo.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }, 1000);

                return;
            }

            intentos++;

            if (intentos < 30) {
                setTimeout(buscar, 300);
            }

        };

        buscar();

    }

    irAlPost();

    window.addEventListener(
        "hashchange",
        irAlPost
    );

});
