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
  console.log(chatID);

  //Volver atras
  var flecha = document.getElementById('flechita2');
  flecha.addEventListener("click", function(){
  window.location="chat.html?var="+chatID+'&var2='+nombre;
  });


  // Select de mensajes del chat seleccionado
  firebase.database().ref('chat/'+chatID+'/participantes').on('value', function(snapshot){
    var html = '';
    console.log(snapshot.val());

    snapshot.forEach(function(e){
      console.log(e.key);
      if (e.key == nombre){
      html += '<li class="list-group-item sepChat"><div class="sep"><i class="fas fa-user-circle"></i><div class="nombre">'+e.key+'</div></div><div class="fecha"> </div></li>';

      } else{


      html += '<li class="list-group-item sepChat"><div class="sep"><i class="fas fa-user-circle"></i><div class="nombre">'+e.key+'</div></div><div class="fecha"> <i id="'+e.key+'" class="fas fa-plus-circle" onclick="nuevoChat(this);"></i></div></li>';

    }
    });

    chatUl.innerHTML = html;
  });

  //Nuevo Chat

  function nuevoChat(a){
    //console.log(a.id);
    
    var cumple = false; 

     firebase.database().ref('usuario/'+nombre).on('value', function(snapshot){
      snapshot.forEach(function(e){
    firebase.database().ref('chat/'+e.key).on('value', function(snapshot){

      var element = snapshot.val();
      var desc = element.descripcion;
      console.log(desc == nombre+'-'+a.id || desc == a.id+'-'+nombre);
      if (desc == nombre+'-'+a.id || desc == a.id+'-'+nombre){
        cumple = true;
      }
      });
      });

    });



     

   if (cumple){
      firebase.database().ref('usuario/'+nombre).on('value', function(snapshot){
      snapshot.forEach(function(e){
      firebase.database().ref('chat/'+e.key).on('value', function(snapshot){

      var element = snapshot.val();
      var desc = element.descripcion;
      if (desc == nombre+'-'+a.id || desc == a.id+'-'+nombre){
        window.location="chat.html?var="+e.key+'&var2='+nombre;
      } else{
      }
  });
  });
  });
    } else{
      var fechaActual = new Date();
      var dia = fechaActual.getDate();
      var mes = fechaActual.getMonth()+1;
      if (fechaActual.getDate()<10){
        dia = '0'+fechaActual.getDate();
      }
      if (mes<10){
        mes = '0'+fechaActual.getMonth();
      }
      var anio = fechaActual.getFullYear();
      fechaActual = dia+'/'+mes+'/'+anio
    firebase.database().ref('chat').push({
      descripcion: nombre+'-'+a.id,
      fecha: fechaActual
    });


      
      firebase.database().ref('chat').on('value', function(snapshot){
      snapshot.forEach(function(e){
      var element = e.val();
      var desc = element.descripcion;
      console.log(desc);
      console.log(e.key);
      var key = e.key;
      if (desc == nombre+'-'+a.id || desc == a.id+'-'+nombre){

        var updates = {};
        updates['usuario/'+nombre+'/'+e.key] = true;
        firebase.database().ref().update(updates);
        updates = {};
        updates['usuario/'+a.id+'/'+e.key] = true;
        firebase.database().ref().update(updates);

        window.location="chat.html?var="+e.key+'&var2='+nombre;
      } else{
      }
  });
  });

  }
  }