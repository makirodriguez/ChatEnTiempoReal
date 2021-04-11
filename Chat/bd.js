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

//Variables
var nombre = location.search.substr(1).split("=")[1];
var database = firebase.database().ref().child('chat');
//console.log(nombre);

  
// Carga de chats
/* var chatUl2 = document.getElementById('chatUl2');
  firebase.database().ref('chat').on('value', function(snapshot){
    var html = '';
    snapshot.forEach(function(e){
      console.log(e.key);
      var element = e.val();
      var desc = element.descripcion;
      var fec = element.fecha;
      html +='<a id="'+e.key+'" href="chat.html?var='+e.key+'&var2='+nombre+'"><li class="list-group-item sepChat"><div class="sep"><i class="fas fa-user-circle"></i><div class="nombre">'+desc+'</div></div><div class="fecha"> '+fec+'</div></li></a>';
    });
    chatUl2.innerHTML = html;
  });*/
var desc;
 var chatUl2 = document.getElementById('chatUl2');
 firebase.database().ref('usuario/'+nombre).on('value', function(snapshot){
  var html = '';
  snapshot.forEach(function(e){
    //console.log(e);
    //console.log(e.key);
  firebase.database().ref('chat/'+e.key).on('value', function(snapshot){
    //console.log(snapshot);

      var element = snapshot.val();
      
      var snap = Object.assign(snapshot.val(), {key: snapshot.key});
      //console.log(snap);
      //console.log(descArray);
      descArray.push(snap);
      desc = element.descripcion; 
     
      if (desc.startsWith("Viaje")){

      } else if(desc.split("-")[0] == nombre){
        desc = desc.split("-")[1];
      } else if(desc.split("-")[1] == nombre){
        desc = desc.split("-")[0];
      } else{
      }
      var fec = element.fecha;
      html +='<a id="'+e.key+'" href="chat.html?var='+e.key+'&var2='+nombre+'"><li class="list-group-item sepChat"><div class="sep"><i class="fas fa-user-circle"></i><div class="nombre">'+desc+'</div></div><div class="fecha"> '+fec+'</div></li></a>';

    chatUl2.innerHTML = html;
  });
  });
});

var descArray=[];

var filtrar = ()=>{
  var texto = formulario.value.toLowerCase();
  var html = '';
  chatUl2.innerHTML = '';
  for(let i of descArray){
    let descMinuscula=i.descripcion.toLowerCase();
    if(descMinuscula.indexOf(texto) !== -1){
      if (i.descripcion.startsWith("Viaje")){
      } else if(i.descripcion.split("-")[0] == nombre){
        i.descripcion = i.descripcion.split("-")[1];
      } else if(i.descripcion.split("-")[1] == nombre){
        i.descripcion = i.descripcion.split("-")[0];
      } else{
      }
      html +='<a id="'+i.key+'" href="chat.html?var='+i.key+'&var2='+nombre+'"><li class="list-group-item sepChat"><div class="sep"><i class="fas fa-user-circle"></i><div class="nombre">'+i.descripcion+'</div></div><div class="fecha"> '+i.fecha+'</div></li></a>';
      chatUl2.innerHTML = html;
   
    }
    if(chatUl2.innerHTML === ''){
      chatUl2.innerHTML += '<li class="list-group-item sepChat"><div class="sep"><div class="nombre">No se encontro el chat</div>'
    }
  }
}



boton.addEventListener('click', filtrar);
formulario.addEventListener('keyup', filtrar);

filtrar();

function showHide(){
  var inactivos = document.getElementById("esconder");
  if(document.querySelector('.chkTest').checked){
    document.getElementById("esconder").style.display="inline";
  }else{
    document.getElementById("esconder").style.display="none";
  }
  
}
