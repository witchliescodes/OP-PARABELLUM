$(function () {

    const processed = new WeakSet();

    function initCodeboxes(context = document) {

        const codeboxes = context.querySelectorAll('dl.codebox');

        codeboxes.forEach(box => {

            if (processed.has(box)) return;

            const dt = box.querySelector('dt');
            const code = box.querySelector('code');

            if (!dt || !code) return;

            processed.add(box);

            const btn = document.createElement('button');

            btn.className = 'copy-code-btn';
            btn.type = 'button';
            btn.setAttribute('aria-label', 'Copiar código');

            btn.textContent = 'Copiar';

            dt.appendChild(btn);

            btn.addEventListener('click', async () => {

                try {

                    const text = code.innerText.trim();

                    await navigator.clipboard.writeText(text);

                    btn.classList.add('copied');

                    btn.textContent = '¡Copiado!';

                    clearTimeout(btn._copyTimeout);

                    btn._copyTimeout = setTimeout(() => {

                        btn.classList.remove('copied');

                        btn.textContent = 'Copiar';

                    }, 2000);

                } catch (err) {

                    console.error('Error al copiar código:', err);

                }

            });

        });

    }

    initCodeboxes();


    const observer = new MutationObserver((mutations) => {

        for (const mutation of mutations) {

            mutation.addedNodes.forEach(node => {

                if (!(node instanceof HTMLElement)) return;

                initCodeboxes(node);

            });

        }

    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

});
