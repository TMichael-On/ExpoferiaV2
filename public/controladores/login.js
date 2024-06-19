import Utilidades from "../peticiones/utilidades.js";

const utilidadesObj = new Utilidades();

$("#mensajeError").hide();
$('#loginButton').click(async function () {

  const username = $('#username_login').val();
  const password = $('#password_login').val();

  const data = {
    correo: username,
    contrasena: password
  };

  try {
    const jsonData = await utilidadesObj.fetchResultGuardar('login', data);
    if (jsonData.message != 'success') {
      $("#mensajeError").text('Ingrese sus credenciales');
      $("#mensajeError").show();
    }
  } catch (error) {
    console.error('Error al obtener los permisos: ', error);
  }

});

$("#mensajeError_registrar").hide();
$('#registrarButton').click(async function () {

  const nombre = $('#c-usuario-nombre').val();
  const apellido = $('#c-usuario-apellido').val();
  const correo = $('#c-usuario-correo').val();
  const password = $('#c-usuario-contrasena');
  const password_2 = $('#c-usuario-contrasena-2');

  if (password.val() == password_2.val()) {

    const usuario = {
      nombre: nombre,
      apellido: apellido,
      correo: correo,
      contrasena: password.val(),
    };

    try {
      const jsonData = await utilidadesObj.fetchResultGuardar('register', usuario);
      if (jsonData.message != 'success') {
        $("#mensajeError_registrar").text(jsonData.message);
        $("#mensajeError_registrar").show();
      }
    } catch (error) {
      console.error('Error al obtener los permisos: ', error);
    }
  } else {
    $("#mensajeError_registrar").text('Las contraseñas no coinciden');
    $("#mensajeError_registrar").show();
  }

});