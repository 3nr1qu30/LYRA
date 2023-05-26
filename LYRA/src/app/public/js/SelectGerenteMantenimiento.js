function obtenerIdSeleccionadoAbierto(event) {
    var selectElement1 = event.target; // Obtiene el elemento <select> que activó el evento
    var selectedId = selectElement1.id; // Obtiene el id del <select> seleccionado

    var id =selectedId;
    // Obtener el elemento select
    var selectElement1 = document.getElementById(id);

    // Obtener el valor seleccionado
    var selectedValue = selectElement1.value;


    var selectElement = document.getElementById("Asignar " +id);

  // Eliminar opciones existentes
  selectElement.innerHTML = "";
  // Agregar las nuevas opciones al elemento select
   if(selectedValue === '4'){
    let opcionEliminar = document.getElementById("eliminar");
    if(opcionEliminar !== null){
    opcionEliminar.remove();
    }
    for(let i=0; i<IngenirosMantenimiento.length; i++) {
        var option1 = document.createElement("option");
        option1.value = IngenirosMantenimiento[i].nombre_usuario;
        option1.textContent = IngenirosMantenimiento[i].nombre_usuario;
        selectElement.appendChild(option1);
    }
    for(let i=0; i<GerenteSop.length; i++) {
        var option1 = document.createElement("option");
        option1.value = GerenteSop[i].nombre_usuario;
        option1.textContent = GerenteSop[i].nombre_usuario;
        selectElement.appendChild(option1);
    }
  }else if(selectedValue === '6'){
    let opcionEliminar = document.getElementById("eliminar");
    if(opcionEliminar !== null){
    opcionEliminar.remove();
    }
    for(let i=0; i<GerenteSop.length; i++) {
        var option1 = document.createElement("option");
        option1.value = GerenteSop[i].nombre_usuario;
        option1.textContent = GerenteSop[i].nombre_usuario;
        selectElement.appendChild(option1);
    }
  }

}