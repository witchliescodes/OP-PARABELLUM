document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("modo-oscuro");
  const root = document.documentElement;
  const STORAGE_KEY = "tema";

  let tema = localStorage.getItem(STORAGE_KEY) || "claro";

  const aplicarTema = (nuevoTema) => {
    root.classList.remove("claro", "oscuro");
    root.classList.add(nuevoTema);
    tema = nuevoTema;
  };

  btn?.addEventListener("click", () => {
    aplicarTema(tema === "oscuro" ? "claro" : "oscuro");
    localStorage.setItem(STORAGE_KEY, tema);
  });
});
