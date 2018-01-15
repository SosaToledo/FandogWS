window.onload=iniciar;
var reffandog;
var tablaVendedores;
var diferencia;
var datos;
var suma =0;
var sal =0;
var gas =0;
var pan =0;
var vendedor;
var objeto;
var ventas = 0;
var vtaLSosa = 0;
var vtaFToledo = 0;


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
      // console.log(user);
    }
  });
  reffandog=firebase.database().ref().child('fandog');
  reffandog.on('value', function sumar(snap) {
      snap.forEach(function recorrer(childSnap) {
        sal += parseInt(childSnap.val().salVta);
        gas += parseInt(childSnap.val().gasVta);
        pan += parseInt(childSnap.val().panVta);
        ventas += parseInt(childSnap.val().ventasTotales);
      })
      suma = sal+gas+pan;
      cargarInformes(suma, ventas);
    });
  reffandog.on("value", function cargarEmpleado(snap) {
    snap.forEach(function recorrer(snapChild) {
      objeto = snapChild.val();
      vendedor = snapChild.val().vendedor;
      switch (vendedor) {
        case "luciano sosa":
          vtaLSosa += parseInt(objeto.ventasTotales);
          break;
        case "Frank Toledo":
          vtaFToledo += parseInt(objeto.ventasTotales);
          break;
      }
    })
    cargarEmpleados(vtaLSosa, vtaFToledo);
  });
}
function signOut(){
  if (firebase.auth().currentUser) {
  firebase.auth().signOut();
  }
}
function cargarInformes(suma, venta){
  // diferencia.innerText = snap.caja;
  vTotales.innerText = venta;
  vUnidad.innerText = suma;

}

function cargarEmpleados(vtaLSosa, vtaFToledo) {
  var ls = document.getElementById("ventasLucianoSosa");
  var cls = document.getElementById("comLucianoSosa");
  ls.innerText ="$ "+ vtaLSosa;
  var comLS = vtaLSosa * 0.1;
  cls.innerText = "$ "+ comLS;

  var ft = document.getElementById("ventasFrankToledo");
  ft.innerText = "$ "+ vtaFToledo;
}
