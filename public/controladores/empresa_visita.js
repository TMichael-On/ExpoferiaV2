import Utilidades from "../peticiones/utilidades.js";

const objUtilidades = new Utilidades();

let json_data;
let dataEmpresaVisita = {
  headings: ["Nombre", "Contacto"],
};

var opciones = {
  searchable: true,
  data: dataEmpresaVisita,
  columns: [
    {
      select: 2,
    },
  ],
};

$(document).ready(function () {
  var table; //comentario1
  if (simpleDatatables) {
    table = new simpleDatatables.DataTable("#tablaVisita", opciones);
  }

  (async () => {
    const idEmpresa = 24;
    let ruta = "visita/list/" + idEmpresa;
    const jsonData = await objUtilidades.fetchResultListar(ruta);

    if (jsonData.message == "success") {
      json_data = { ...jsonData };
      table.insert(jsonData.rows);
    } else {
      Swal.fire({
        title: "Error",
        text: "Algo salio mal al cargar la información",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  })();

});
