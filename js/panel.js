window.onload=iniciar;
var reffandog;
var tablaVendedores;
var diferencia;
var datos;
var suma =0;
var vendedor;
var objeto;
var sal =0;
var gas =0;
var pan =0;
var ventas = 0;
var vtaLSosa = 0;
var vtaFToledo = 0;
var difLSosa = 0;
var vtaCThinco =0;


function iniciar() {
  document.getElementById("btnLogout").addEventListener('click',signOut,false);
  diferencia = document.getElementById('diferencia');
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
      cargarInformes();
      cargarTabla();
      sal =0;
      gas =0;
      pan =0;
    });
  reffandog.on("value", function cargarEmpleado(snap) {
    snap.forEach(function recorrer(snapChild) {
      objeto = snapChild.val();
      vendedor = snapChild.val().vendedor;
      switch (vendedor) {
        case "luciano sosa":
          vtaLSosa += parseInt(objeto.ventasTotales);
          difLSosa += parseInt(objeto.difCaja);
          break;
        case "Frank Toledo":
          vtaFToledo += parseInt(objeto.ventasTotales);
          break;
        case "Contacto Thinco":
          vtaCThinco += parseInt(objeto.ventasTotales);
          break;
      }
    })
    cargarEmpleados();
    // vtaLSosa =0;
    // vtaFToledo=0;
    // difCaja=0;
    // vtaCThinco=0;
  });
}
function signOut(){
  if (firebase.auth().currentUser) {
  firebase.auth().signOut();
  }
}
function cargarInformes(){
  // diferencia.innerText = snap.caja;
  vTotales.innerText = "Ventas Totales: $"+ventas;
  // ventas = 0;
  // suma = 0;

}

function cargarEmpleados() {
  // Luciano Sosa
  // --ventas
  document.getElementById("ventasLucianoSosa").innerText ="$ "+ vtaLSosa;
  // --comision
  var comLS = vtaLSosa * 0.1;
  document.getElementById("comLucianoSosa").innerText = "$ "+ comLS;
  // --diferencia
  document.getElementById("difLucianoSosa").innerText = "$ "+difLSosa;
  // --------------------
  // Frank Toledo
  var ft = document.getElementById("ventasFrankToledo");
  var comFT = vtaFToledo *0.1;
  document.getElementById('comFrankToledo').innerText = "$ "+comFT;
  ft.innerText = "$ "+ vtaFToledo;
  // ---------------
  // Thinco
  var ct = document.getElementById("ventasThinco");
  var comT = vtaCThinco *0.1;
  document.getElementById('comThinco').innerText = "$ "+comT;
  ct.innerText = "$ "+vtaCThinco;
  vtaCThinco = 0;
  vtaFToledo = 0;
  vtaLSosa = 0;
  difLSosa = 0;
}
function cargarTabla() {
  // carga de ventas en unidades
  document.getElementById('uniSal').innerText = sal;
  document.getElementById('uniPan').innerText = pan;
  document.getElementById('uniGas').innerText = gas;
  // carga de ventas en dinero
  var tdSal = document.getElementById('cantSal');
  sal *=50;
  tdSal.innerText="$ "+sal;
  var tdGas = document.getElementById('cantGas');
  gas*=30
  tdGas.innerText="$ "+ gas;
}
