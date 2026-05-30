document.addEventListener(
'DOMContentLoaded',
() => {

    const tablas =
    document.querySelectorAll('.wrap-admin');

    tablas.forEach(tabla => {

        const boton =
        tabla.querySelector('.sta-lab label');

        boton.addEventListener('click', () => {

            tabla.classList.toggle('active');

        });

    });

});
