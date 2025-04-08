document.addEventListener("DOMContentLoaded", () => {
  cargarComponente("header", "banner.html");
  cargarComponente("footer", "footer.html");
});

function cargarComponente(id, archivo) {
  fetch(archivo)
    .then(res => res.text())
    .then(html => {
      document.getElementById(id).innerHTML = html;
    })
    .catch(err => console.error(`Error al cargar ${archivo}:`, err));
}
