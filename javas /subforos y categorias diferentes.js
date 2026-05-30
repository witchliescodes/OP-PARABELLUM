document.addEventListener("DOMContentLoaded", () => {

  const elementos = document.querySelectorAll('.titlecate h2 p');

  elementos.forEach(p => {

    const titleCate = p.closest('.titlecate');
    if (!titleCate) return;


    const text = p.textContent.trim().toLowerCase();
    if (!text) return;

    const slug = text.replace(/[^a-z0-9]+/g, '').slice(0, 4);
    if (!slug) return;


    if (!titleCate.classList.contains(slug)) {
      titleCate.classList.add(slug);
    }


    const oppfor = titleCate.parentElement?.querySelector('.oppfor');
    if (oppfor && !oppfor.classList.contains(slug)) {
      oppfor.classList.add(slug);
    }

  });

});
