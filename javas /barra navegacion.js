document.addEventListener("DOMContentLoaded", () => {

  // =====================================
  // ELEMENTOS
  // =====================================

  const nav =
  document.querySelector(
    ".parahead navbar"
  );

  if(!nav) return;

  const header =
  document.querySelector(
    ".parahead"
  );

  const pathname =
  document.querySelector(
    ".pathname-box"
  );

  // =====================================
  // PLACEHOLDER
  // =====================================

  const placeholder =
  document.createElement("div");

  placeholder.className =
  "nav-placeholder";

  placeholder.style.display =
  "none";

  nav.parentNode.insertBefore(
    placeholder,
    nav
  );

  // =====================================
  // POSICIÓN ORIGINAL
  // =====================================

  const navTop =
  nav.offsetTop;

  let isFixed = false;

  // =====================================
  // UPDATE NAV
  // =====================================

  function updateNav(){

    const shouldFix =
    window.scrollY >= navTop;

    // Evitar recalcular innecesariamente
    if(shouldFix === isFixed){

      return;

    }

    isFixed = shouldFix;

    // =====================================
    // CLASES
    // =====================================

    nav.classList.toggle(
      "scroll-fixed",
      shouldFix
    );

    header?.classList.toggle(
      "nav-fixed",
      shouldFix
    );

    pathname?.classList.toggle(
      "path-visible",
      shouldFix
    );

    // =====================================
    // PLACEHOLDER
    // =====================================

    if(shouldFix){

      placeholder.style.display =
      "block";

      placeholder.style.height =
      nav.offsetHeight + "px";

    }

    else{

      placeholder.style.display =
      "none";

      placeholder.style.height =
      "0";

    }

  }

  // =====================================
  // EVENTS
  // =====================================

  window.addEventListener(
    "scroll",
    updateNav,
    { passive:true }
  );

  window.addEventListener(
    "resize",
    updateNav
  );

  // =====================================
  // INIT
  // =====================================

  updateNav();

});
