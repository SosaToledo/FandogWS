/**
     * Handles the sign in button press.
     */
     function sendPasswordReset() {
      var email = document.getElementById('email').value;
      // [START sendpasswordemail]
      firebase.auth().sendPasswordResetEmail(email).then(function() {
        // Password Reset Email Sent!
        // [START_EXCLUDE]
        alert('Te enviamos un correo para actualizar tu clave. Revisa los correos no deseados.');
        // [END_EXCLUDE]
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/invalid-email') {
          alert("Escribe un correo valido");
        } else if (errorCode == 'auth/user-not-found') {
          alert('No encontramos ese usuario');
        }
        console.log(error);
        // [END_EXCLUDE]
      });
      // [END sendpasswordemail];
    }
    function toggleSignIn() {
      if (firebase.auth().currentUser) {
        firebase.auth().signOut();
      } else {
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        // if (email.length < 4) {
        //   alert('Ingrese un correo mas largo.');
        //   return;
        // }
        // if ( !email.includes("@") ){
        //   alert("Ingrese un correo valido");
        //   return;
        // }
        // if ( !email.includes(".com") ){
        //   alert("Ingrese un correo valido");
        //   return;
        // }
        // if (password.length < 4) {
        //   alert('Ingrese su password mas largo.');
        //   return;
        // }
        // Sign in with email and pass.
        // [START authwithemail]
        firebase.auth().signInWithEmailAndPassword(email, password)
          .then(function(user){
            location.href ="panel.html";
          })
          .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // [START_EXCLUDE]
            if (errorCode === 'auth/wrong-password') {
              alert('Password equivocado.');
            } else {
              alert('Error');
              console.log(error);
            }
            console.log(error);
            document.getElementById('btnLogin').disabled = false;
            // [END_EXCLUDE]
          });
        // [END authwithemail]
      }
      document.getElementById('btnLogin').disabled = true;
    }
    /**
     * Handles the sign up button press.
     */

    /**
     * initApp handles setting up UI event listeners and registering Firebase auth listeners:
     *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
     *    out, and that is where we update the UI.
     */
    function initApp() {
      // Listening for auth state changes.
      // [START authstatelistener]

      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
                  } else {
          // User is signed out.
        }
        // [START_EXCLUDE silent]
        document.getElementById('btnLogin').disabled = false;
        // [END_EXCLUDE]
      });
      // [END authstatelistener]
      document.getElementById('btnLogin').addEventListener('click', toggleSignIn, false);
      document.getElementById('btnReset').addEventListener('click',sendPasswordReset, false);
    }
    window.onload = function() {
      initApp();
    };
