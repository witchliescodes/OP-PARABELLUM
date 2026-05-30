document.addEventListener('DOMContentLoaded', () => {

    const labels =
    document.querySelectorAll('.filabels label');

    const contenidos = [
        '.contefisico',
        '.contepsic',
        '.contehis',
        '.conteext'
    ];


    contenidos.forEach((clase, index) => {

        const caja =
        document.querySelector(clase);

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

                document.querySelector(clase)
                .style.display = 'none';

            });

            document.querySelector(
                contenidos[index]
            ).style.display = 'block';

        });

    });

});
