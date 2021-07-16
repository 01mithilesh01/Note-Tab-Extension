// Your web app's firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyA9c2ADGjKSEu-PLkLEUmw-_yZbFyizN54",
    authDomain: "note-tab-extension.firebaseapp.com",
    projectId: "note-tab-extension",
    storageBucket: "note-tab-extension.appspot.com",
    messagingSenderId: "931371243542",
    appId: "1:931371243542:web:0f7cbefcd3e8b7a369fd37"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  console.log(firebase);

  chrome.runtime.onMessage.addListener(function(msg, sender, response){

      if(msg.command == 'fetchNotes'){
          // process the request
          firebase.database().ref('/notes').once('value').then(function(snapshot){
              response({type: "result", status: "success", data: snapshot.val(), request: msg});
          });
      }

      return true;
  });