


document.addEventListener('DOMContentLoaded', function() {
        // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
        // // The Firebase SDK is initialized and available here!
        //
        // firebase.auth().onAuthStateChanged(user => { });
        // firebase.database().ref('/path/to/ref').on('value', snapshot => { });
        // firebase.messaging().requestPermission().then(() => { });
        // firebase.storage().ref('/path/to/ref').getDownloadURL().then(() => { });
        //
        // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC2bu2RX1dRs_PjFXqmbrFfCvTdcIAQ29w",
    authDomain: "project1-22a93.firebaseapp.com",
    databaseURL: "https://project1-22a93.firebaseio.com",
    projectId: "project1-22a93",
    storageBucket: "project1-22a93.appspot.com",
    messagingSenderId: "789161509104"
  };
  firebase.initializeApp(config);
  var database = firebase.database();

  // Initial Values
  var name = "";
  var email = "";
  var mobile = "";
  var password = "";
  var authenticated = false;

//Registration
  $(document).on("click", "#addusertoDB", function() {
    
        event.preventDefault();
        
        var name = $("#name-input").val().trim();
        var email = $("#email-input").val().trim();
        var mobile = $("#mobile-input").val().trim();
        var password = $("#password-input").val().trim();
    
        //to DB
        database.ref().push({
            name: name,
            email: email,
            mobile: mobile,
            password: password,
            authenticated: false
          });

          
          
        });
        // Cancel Registration
        $(document).on("click", "#cancel", function() {
          
              event.preventDefault();
              $("#name-input").val("");
              $("#email-input").val("");
              $("#mobile-input").val("");
              $("#password-input").val("");
        })


//Login to authenticate
database.ref().on("child_added", function(childSnapshot) {

  $(document).on("click", "#login", function() {

  var loginEmail = $("#login-email-input").val().trim();
  var loginPwd = $("#login-pwd-input").val().trim();

  if(loginEmail=== childSnapshot.val().email && loginPwd=== childSnapshot.val().password){
    $('#loginRegLink').hide();
    $('#loggedAs').html('Logged In as: '+ childSnapshot.val().name);
    $('#login').attr('data-dismiss','modal');
    $('#logout').html('Log Out');

    database.ref().push({
      
      authenticated: true
    });

    //Show News Feed Link: TODO

  }

  })

})

//Logout
$(document).on("click", "#logout", function(snapshot) {
  $('#loginRegLink').attr("style", "display: block")
  $('#logout').text("");
  $('#loggedAs').text("");

})





//Option Links
    $(".emergency-link").on("click", function() {
     var queryEmergency = "https://ohana-api-demo.herokuapp.com/api/search?keyword=emergency";
     
      $.ajax({
        url: queryEmergency,
        method: "GET"
      })
      .done(function(response) {
        console.log(response);
        
        var feedDiv = $('<div>')
          
          for (var i = 1; i < response.length; i++) {
            //get Name of Org
            var orgP = $('<h3>').text(response[i].organization.name);

            //get description
            var descP = $('<p>').text(response[i].organization.description);


            ///get address
            var address= response[i].address;
           
            var address1 = address.address_1;
            var city = address.city;
            var zip = address.postal_code;
            var state = address.state_province;

            var addP = $('<p>').text("Address: "+ address1+ ", "+ city + ","+ state+ " "+ zip);
           
           // get coordinates
           var latP= $('<p>').text("lattitude: "+ response[i].latitude);
            var longP= $('<p>').text("longitude: "+ response[i].longitude)

            //get phone number
            
            var phoneP=$('<p>').text("Contact#: "+ "Unavailable");

            response[i].phones.forEach(function(e) {
                if(e.number_type==="voice")
                {
                    phoneP=$('<p>').text("Contact#: "+ e.number);
                }
            
            });
            feedDiv.append(orgP);
            feedDiv.append(descP);
            feedDiv.append(addP);
            feedDiv.append(phoneP);
            // feedDiv.append(latP);
            // feedDiv.append(longP);
            feedDiv.append("---------------------------")

            $("#showResult").html(feedDiv);

        }

      
      });
    });


    $(".food-link").on("click", function() {
     var queryFood = "https://ohana-api-demo.herokuapp.com/api/search?keyword=food";
    
      $.ajax({
        url: queryFood,
        method: "GET"
      })

      
      .done(function(response) {

        console.log(response);
        
       
        var feedDiv = $('<div>')
          
          for (var i = 0; i < response.length; i++) {
            //get Name of Org
            var orgP = $('<h3>').text(response[i].organization.name);

            //get description
            var descP = $('<p>').text(response[i].organization.description);


            ///get address
            var address= response[i].address;
           
            var address1 = address.address_1;
            var city = address.city;
            var zip = address.postal_code;
            var state = address.state_province;

            var addP = $('<p>').text("Address: "+ address1+ ", "+ city + ","+ state+ " "+ zip);
           
           // get coordinates
           var latP= $('<p>').text("lattitude: "+ response[i].latitude);
            var longP= $('<p>').text("longitude: "+ response[i].longitude)

            //get phone number
            
            var phoneP=$('<p>').text("Contact#: "+ "Unavailable");

            response[i].phones.forEach(function(e) {
                if(e.number_type==="voice")
                {
                    phoneP=$('<p>').text("Contact#: "+ e.number);
                }
            
            });

            
            feedDiv.append(orgP);
            feedDiv.append(descP);
            feedDiv.append(addP);
            feedDiv.append(phoneP);
            feedDiv.append(latP);
            feedDiv.append(longP);
            feedDiv.append("---------------------------")

            $("#showResult").html(feedDiv);

        }

      
      });
    });


    $(".transit-link").on("click", function() {
     var queryTransit = "https://ohana-api-demo.herokuapp.com/api/search?keyword=transit";
    
      $.ajax({
        url: queryTransit,
        method: "GET"
      })

      
      .done(function(response) {

        console.log(response);
        
       
        var feedDiv = $('<div>')
          
          for (var i = 0; i < response.length; i++) {
            //get Name of Org
            var orgP = $('<h3>').text(response[i].organization.name);

            //get description
            var descP = $('<p>').text(response[i].organization.description);


            ///get address
            var address= response[i].address;
           
            var address1 = address.address_1;
            var city = address.city;
            var zip = address.postal_code;
            var state = address.state_province;

            var addP = $('<p>').text("Address: "+ address1+ ", "+ city + ","+ state+ " "+ zip);
           
           // get coordinates
           var latP= $('<p>').text("lattitude: "+ response[i].latitude);
            var longP= $('<p>').text("longitude: "+ response[i].longitude)

            //get phone number
            
            var phoneP=$('<p>').text("Contact#: "+ "Unavailable");

            response[i].phones.forEach(function(e) {
                if(e.number_type==="voice")
                {
                    phoneP=$('<p>').text("Contact#: "+ e.number);
                }
            
            });

            
            feedDiv.append(orgP);
            feedDiv.append(descP);
            feedDiv.append(addP);
            feedDiv.append(phoneP);
            feedDiv.append(latP);
            feedDiv.append(longP);
            feedDiv.append("---------------------------")

            $("#showResult").html(feedDiv);

        }

      
      });
    });

    $(".care-link").on("click", function() {
     var queryCare = "https://ohana-api-demo.herokuapp.com/api/search?keyword=care";
    
      $.ajax({
        url: queryCare,
        method: "GET"
      })

      
      .done(function(response) {

        console.log(response);
        
       
        var feedDiv = $('<div>')
          
          for (var i = 0; i < response.length; i++) {
            //get Name of Org
            var orgP = $('<h3>').text(response[i].organization.name);

            //get description
            var descP = $('<p>').text(response[i].organization.description);


            ///get address
            var address= response[i].address;
           
            var address1 = address.address_1;
            var city = address.city;
            var zip = address.postal_code;
            var state = address.state_province;

            var addP = $('<p>').text("Address: "+ address1+ ", "+ city + ","+ state+ " "+ zip);
           
           // get coordinates
           var latP= $('<p>').text("lattitude: "+ response[i].latitude);
            var longP= $('<p>').text("longitude: "+ response[i].longitude)

            //get phone number
            
            var phoneP=$('<p>').text("Contact#: "+ "Unavailable");

            response[i].phones.forEach(function(e) {
                if(e.number_type==="voice")
                {
                    phoneP=$('<p>').text("Contact#: "+ e.number);
                }
            
            });

            
            feedDiv.append(orgP);
            feedDiv.append(descP);
            feedDiv.append(addP);
            feedDiv.append(phoneP);
            feedDiv.append(latP);
            feedDiv.append(longP);
            feedDiv.append("---------------------------")

            $("#showResult").html(feedDiv);

        }

      
      });
    });
    $(".work-link").on("click", function() {
     var queryWork = "https://ohana-api-demo.herokuapp.com/api/search?keyword=work";
    
      $.ajax({
        url: queryWork,
        method: "GET"
      })

      
      .done(function(response) {

        console.log(response);
        
       
        var feedDiv = $('<div>')
          
          for (var i = 0; i < response.length; i++) {
            //get Name of Org
            var orgP = $('<h3>').text(response[i].organization.name);

            //get description
            var descP = $('<p>').text(response[i].organization.description);


            ///get address
            var address= response[i].address;
           
            var address1 = address.address_1;
            var city = address.city;
            var zip = address.postal_code;
            var state = address.state_province;

            var addP = $('<p>').text("Address: "+ address1+ ", "+ city + ","+ state+ " "+ zip);
           
           // get coordinates
           var latP= $('<p>').text("lattitude: "+ response[i].latitude);
            var longP= $('<p>').text("longitude: "+ response[i].longitude)

            //get phone number
            
            var phoneP=$('<p>').text("Contact#: "+ "Unavailable");

            response[i].phones.forEach(function(e) {
                if(e.number_type==="voice")
                {
                    phoneP=$('<p>').text("Contact#: "+ e.number);
                }
            
            });

            
            feedDiv.append(orgP);
            feedDiv.append(descP);
            feedDiv.append(addP);
            feedDiv.append(phoneP);
            feedDiv.append(latP);
            feedDiv.append(longP);
            feedDiv.append("---------------------------")

            $("#showResult").html(feedDiv);

        }

      
      });
    });


    $(".housing-link").on("click", function() {
        var queryFood = "https://ohana-api-demo.herokuapp.com/api/search?keyword=housing";
       
         $.ajax({
           url: queryFood,
           method: "GET"
         })
   
         
         .done(function(response) {
   
           console.log(response);
           
          
           var feedDiv = $('<div>')
             
             for (var i = 0; i < response.length; i++) {
               //get Name of Org
               var orgP = $('<h3>').text(response[i].organization.name);
   
               //get description
               var descP = $('<p>').text(response[i].organization.description);
   
   
               ///get address
               var address= response[i].address;
              
               var address1 = address.address_1;
               var city = address.city;
               var zip = address.postal_code;
               var state = address.state_province;
   
               var addP = $('<p>').text("Address: "+ address1+ ", "+ city + ","+ state+ " "+ zip);
              
              // get coordinates
              var latP= $('<p>').text("lattitude: "+ response[i].latitude);
               var longP= $('<p>').text("longitude: "+ response[i].longitude)
   
               //get phone number
               
               var phoneP=$('<p>').text("Contact#: "+ "Unavailable");
   
               response[i].phones.forEach(function(e) {
                   if(e.number_type==="voice")
                   {
                       phoneP=$('<p>').text("Contact#: "+ e.number);
                   }
               
               });
   
               
               feedDiv.append(orgP);
               feedDiv.append(descP);
               feedDiv.append(addP);
               feedDiv.append(phoneP);
               feedDiv.append(latP);
               feedDiv.append(longP);
               feedDiv.append("---------------------------")
   
               $("#showResult").html(feedDiv);
   
           }
   
         
         });
       });
   
      try {
          let app = firebase.app();
          let features = ['auth', 'database', 'messaging', 'storage'].filter(feature => typeof app[feature] === 'function');
          document.getElementById('load').innerHTML = `Firebase SDK loaded with ${features.join(', ')}`;
        } catch (e) {
          console.error(e);
          document.getElementById('load').innerHTML = 'Error loading the Firebase SDK, check the console.';
        }
      });