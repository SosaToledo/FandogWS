window.onload=iniciar;
var reffandog;
var tablaVendedores;
var diferencia;

function iniciar() {
  document.getElementById("btnLogout").addEventListener('click',signOut,false);
  diferencia = document.getElementById('diferencia');
  tablaVendedores = document.getElementById("tablaVendedores");
  firebase.auth().onAuthStateChanged(function(user){
    if (user == null ){
      location.href ="login.html";
    }else {
      // if (!user.email.localeCompare("frank_Toledo_009@hotmail.com")) {
      //   alert("no tenes permisos para ver esto");
      //   location.href ="login.html";
      // }
      console.log(user);
    }
  });
  reffandog=firebase.database().ref().child('fandog').child('id');
  reffandog.on('value', snap =>
    cargarInformes(snap.val())
  );

}
function signOut(){
  if (firebase.auth().currentUser) {
  firebase.auth().signOut();
  }
}
function cargarInformes(snap){
  diferencia.innerText = snap.caja;
  vTotales.innerText = snap.s_ventas;
  vUnidad.innerText = snap.s_vendidos;

}
