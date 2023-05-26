const form1 = document.getElementById("form1");
const inputs = document.querySelectorAll("#form1     input");

const expReg = {
    descripcion: /^[a-zA-Z0-9ñÑ()\/.,]{5,1000}$/
}

const campos = {
    descripcion : false
}

const validarReporte = (e) => {
  switch (e.target.name) {
    case "Descripcion":
      if (expReg.descripcion.test(e.target.value) === true) {
        campos.descripcion = true;
      }
      if (!(expReg.descripcion.test(e.target.value) === true)) {
        campos.descripcion = false;
      }
      if (e.target.value === "") {
        campos.descripcion = false;
      }
      break;
  }
};

inputs.forEach((input) => {
    input.addEventListener('keyup', validarReporte);
    input.addEventListener('blur', validarReporte);
})

form1.addEventListener('submit', (e) => {
    if (campos.descripcion) {

    } else {
        e.preventDefault();
        swal({
            icon: "error",
            title: "Error",
            text: "La descripción no puede ser menor a cinco caractéres ni exceder mil caractéres"
          })
    }
});