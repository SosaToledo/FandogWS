window.onload=iniciar;
var refvendedores;
var tablaVendedores;

function iniciar() {
  document.getElementById("btnLogout").addEventListener('click',signOut,false);
  tablaVendedores = document.getElementById("tablaVendedores");
  firebase.auth().onAuthStateChanged(function(user){
    if (user == null ){
      location.href ="login.html";
    }else {
      if (!user.email.localeCompare("frank_Toledo_009@hotmail.com")) {
        alert("no tenes permisos para ver esto");
        location.href ="login.html";
      }
      console.log(user);
    }
  });
  refvendedores=firebase.database().ref().child("vendedores");
  llenarTabla();

}
function signOut(){
  if (firebase.auth().currentUser) {
  firebase.auth().signOut();
  }
}
function llenarTabla(){
  refvendedores.on("value",function(snap){
    var datos=snap.val();
    var filas='';
    for(var clave in datos){
      filas+= "<tr>" +
              "<td>" + datos[clave].nombre + "</td>" +
              "<td>" + datos[clave].apellido + "</td>" +
              "<td>" + datos[clave].categoria + "</td>" +
              "</tr>";
    }
    tablaVendedores.innerHTML = filas;
  });
}
