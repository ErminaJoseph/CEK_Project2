var email;
var password;
var newemail;
var newPassword;
var firstName;
var lastName;
var address;
var addressTwo;
var city;
var state;
var zipCode;


$("#add-success").hide();

$("#login-submit").on("click", function(event) {
    
    event.preventDefault();

    var loginCredentials = {
        email: $("#inputUsername").val().trim(),
        password: $("#inputPassword").val().trim()
    };

    if (!userData.email || !userData.password) {
        return;
      }
  
      // If we have an email and password we run the loginUser function and clear the form
      loginUser(userData.email, userData.password);
      emailInput.val("");
      passwordInput.val("");
    });
  
    // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
    function loginUser(email, password) {
      $.post("/api/login", {
        email: email,
        password: password
      })
        .then(function() {
          window.location.replace("/members");
          // If there's an error, log the error
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  
});
    
    console.log(loginCredentials);
});

$("#submit-new-user").on("click", function(event) {
    
    event.preventDefault();

    var newUser = {
        newEmail: $("#inputEmailnameNew").val().trim(),
        newPassword: $("#inputPasswordNew").val().trim()
        // firstName: $("#inputFirstName").val().trim(),
        // lastName: $("#inputLastName").val().trim(),
        // address: $("#inputAddress").val().trim(),
        // addressTwo: $("#inputAddress2").val().trim(),
        // city: $("#inputCity").val().trim(),
        // state: $("#inputState").val().trim(),
        // zipCode: $("#inputZip").val().trim()

        if (!userData.email || !userData.password) {
            return;
          }
          // If we have an email and password, run the signUpUser function
          signUpUser(userData.email, userData.password);
          emailInput.val("");
          passwordInput.val("");
        });
      
        // Does a post to the signup route. If successful, we are redirected to the members page
        // Otherwise we log any errors
        function signUpUser(email, password) {
          $.post("/api/signup", {
            email: email,
            password: password
          })
            .then(function(data) {
              window.location.replace("/members");
              // If there's an error, handle it by throwing up a bootstrap alert
            })
            .catch(handleLoginErr);
        }
      
        function handleLoginErr(err) {
          $("#alert .msg").text(err.responseJSON);
          $("#alert").fadeIn(500);
        }
      });
    };

    console.log(newUser);

    $("#add-success").show();

    $("#inputnameNew").empty();
    $("#inputPasswordNew").empty();
    // $("#inputFirstName").empty();
    // $("#inputLastName").empty();
    // $("#inputAddress").empty();
    // $("#inputAddress2").empty();
    // $("#inputCity").empty();
    // $("#inputState").val("");
    // $("#inputZip").empty();
});
