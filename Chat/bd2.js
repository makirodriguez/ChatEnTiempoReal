 // Conexion con la base de datos
  var firebaseConfig = {
    apiKey: "AIzaSyD9TOys164rLgbRdX2mBJVJtothKkiPaFU",
    authDomain: "subiquetellevo-e2a11.firebaseapp.com",
    databaseURL: "https://subiquetellevo-e2a11-default-rtdb.firebaseio.com",
    projectId: "subiquetellevo-e2a11",
    storageBucket: "subiquetellevo-e2a11.appspot.com",
    messagingSenderId: "438510746012",
    appId: "1:438510746012:web:f186a2e9cc9b2171047059"
  };

  // Inicializo el Firebase
  firebase.initializeApp(firebaseConfig);
  var database = firebase.database().ref().child('chat');

  // Variables
  var nombre = location.search.substr(1).split("=")[2];
  var txtMensaje = document.getElementById('mensaje');
  var btnEnviar = document.getElementById('btnEnviar');
  var chatUl = document.getElementById('chatUl');
  var c = location.search.substr(1).split("=")[1];
  var chatID = c.split("&")[0];

  //Volver atras
  var flecha = document.getElementById('flechita');
  flecha.addEventListener("click", function(){
  window.location="index.html?var="+nombre;
  });

  //Enter
  txtMensaje.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("btnEnviar").click();
  }
  });

  // Carga de un mensaje a la Base de datos
  btnEnviar.addEventListener("click", function(){
    var mensaje = txtMensaje.value;
    var fe = new Date();
    var h = fe.getHours()
    var m = fe.getMinutes()
    if (h<10){
      h = '0'+h
    }
    if (m<10){
      m = '0'+m
    }

    var hora = h+':'+m

    firebase.database().ref('chat/'+chatID).push({
      nombreUsuario: nombre,
      mensaje: mensaje,
      hora: hora
    });

    txtMensaje.value= '';
  });

  // Select de mensajes del chat seleccionado
  firebase.database().ref('chat/'+chatID).on('value', function(snapshot){
    var html = '';
    var chatNombre = document.getElementById('nombreC');
    var desc = snapshot.val().descripcion;
      if (desc.startsWith("Viaje")){
      } else if(desc.split("-")[0] == nombre){
        desc = desc.split("-")[1];
      } else if(desc.split("-")[1] == nombre){
        desc = desc.split("-")[0];
      } else{
      }
      //console.log(chatI);
    chatNombre.innerHTML = desc;
    snapshot.forEach(function(e){
      console.log(e.key);
      if (e.key == "descripcion" || e.key == "fecha" || e.key == "participantes"){

      } else{
      var element = e.val();
      var nombreC = element.nombreUsuario;
      var mensaje = element.mensaje;
      var hora = element.hora;
      html +='<li class="chat-bubble'
      if (element.nombreUsuario == nombre) {
        html+=' propio'
      }else{
        html+=' ajeno'
      }
      html += '"><div class="msgInfo"><b>'+nombreC+": </b>"+mensaje+'</div> <div class="hora">'+hora+'</div></li>';
    }
    });

    chatUl.innerHTML = html;
  });

  //MAS
  var flecha = document.getElementById('circulito');
  flecha.addEventListener("click", function(){
  window.location="integrantes.html?var="+chatID+'&var2='+nombre;
  });


