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



      if(msg.command == 'deleteNote')
      {
          var noteId = msg.data.id;
          if(noteId != '')
          {
              try
              {
                var deleteNote = firebase.database().ref('/notes/'+noteId).remove();  
                response({type: "result", status: "success", id: noteId, request: msg});
              }
              catch(e)
              {
                console.log("error", e);
                response({type: "result", status: "error", data: e, request: msg});
              }
          }
      }
      if(msg.command == 'postNote')
      {
        var title = msg.data.title;
        var body = msg.data.body;
        var icon = msg.data.icon;
        var noteId = msg.data.id;
        console.log("title", title);
        try
        {
            if(noteId != 'AUTO GENERATE')
            {
                var newNote = firebase.database().ref('/notes/'+noteId).update({
                    title: title,
                    icon: icon,
                    body: body
                });
                response({type: "result", status: "success", id: noteId, request: msg});
            }
            else
            {
                var newPostKey = firebase.database().ref().child('notes').push().key;
                var newNote = firebase.database().ref('/notes/'+newPostKey).set({
                    title: title,
                    icon: icon,
                    body: body

                });
                console.log('new note id', newPostKey);
                response({type: "result", status: "success", id:newPostKey, request: msg});
                
            }
        }
        catch(e)
        {
            console.log('error', e);
            response({type: "result", status: "error", data: e, request: msg});

        }
      }


      return true;
  });






