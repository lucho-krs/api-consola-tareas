require("colors");
const Tarea = require("./tarea");

class Tareas {
  _listado = {};

  get listadoArr() {
    const listado = [];
    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key];
      listado.push(tarea);
    });

    return listado;
  }

  constructor() {
    this._listado = {};
  }

  borrarTarea(id = "") {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }

  cargarTareas(tareas = []) {
    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }

  crearTarea(desc = "") {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  listadoCompleto() {
    console.log();
    let i = 0;
    for (let key in this._listado) {
      console.log(
        `${++i}.`.green,
        this._listado[key].desc,
        " :: ",
        this._listado[key].completadoEn != null
          ? `${"Completado"}`.green
          : `${"Pendiente"}`.red
      );
    }
  }

  listarPendientesCompletadas(completados = true) {
    let i = 0;
    for (let key in this._listado) {
      const fechaCompletado = this._listado[key].completadoEn;
      if (fechaCompletado != null && completados === true) {
        console.log(
          `${++i}.`.green,
          this._listado[key].desc,
          " :: ",
          `${fechaCompletado}`.green
        );
      } else if (fechaCompletado === null && completados === false) {
        console.log(
          `${++i}.`.green,
          this._listado[key].desc,
          " :: ",
          `${"Pendiente"}`.red
        );
      }
    }
  }

  toggleCompletadas(ids = []) {
    ids.forEach((id) => {
      const tarea = this._listado[id];
      if (!tarea.completadoEn) {
        tarea.completadoEn = new Date().toISOString();
      }
    });

    this.listadoArr.forEach((tarea) => {
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completadoEn = null;
      }
    });
  }
}

module.exports = Tareas;
