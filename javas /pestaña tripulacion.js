document.addEventListener(
'DOMContentLoaded',
() => {

    const tablas =
    document.querySelectorAll('.wrap-tripu');

    tablas.forEach(tabla => {

        const labels =
        tabla.querySelectorAll('.conlabstrip label');

        const contenidos = [
            '.pestcon',
            '.pestintrg',
            '.pestbar',
            '.pestbot'
        ];


        contenidos.forEach((clase, index) => {

            const caja =
            tabla.querySelector(clase);

            if(index !== 0){

                caja.style.display = 'none';

            }

        });


        labels[0].classList.add('active');


        labels.forEach((label, index) => {

            label.addEventListener('click', () => {

                labels.forEach(l =>
                    l.classList.remove('active')
                );

                label.classList.add('active');


                contenidos.forEach(clase => {

                    tabla.querySelector(clase)
                    .style.display = 'none';

                });


                tabla.querySelector(
                    contenidos[index]
                ).style.display = 'block';

            });

        });

    });

});
