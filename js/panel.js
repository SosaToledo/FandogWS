window.onload=iniciar;
var reffandog;
var tablaVendedores;
var diferencia;
var datos;
var suma =0;

function iniciar() {
  document.getElementById("btnLogout").addEventListener('click',signOut,false);
  diferencia = document.getElementById('diferencia');
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
  reffandog=firebase.database().ref().child('fandog');
  reffandog.once('value')
    .then(function sumar(snap) {
      snap.forEach(function recorrer(childSnap) {
        suma += childSnap.val().caja;
      })
      cargarInformes(suma);
    });
}
function signOut(){
  if (firebase.auth().currentUser) {
  firebase.auth().signOut();
  }
}
function cargarInformes(suma){
  // diferencia.innerText = snap.caja;
  vTotales.innerText = suma;
  // vUnidad.innerText = snap.s_vendidos;

}
