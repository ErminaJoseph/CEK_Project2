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
var loginCredentials;

$("#welcome").text("Welcome " + firstName + "!");

$("#add-success").hide();

$("#login-submit").on("click", function (event) {

  event.preventDefault();

  var loginCredentials = {
    email: $("#inputEmailname").val().trim(),
    password: $("#inputPassword").val().trim()
  };

  if (!loginCredentials.email || !loginCredentialspassword) {
    return;
  }
  

  // // If we have an email and password we run the loginUser function and clear the form
  // loginUser(loginCredentials.email, loginCredentials.password);
  // emailInput.val("");
  // passwordInput.val("");
});

// loginUser does a post to our "api/login" route and if successful, redirects us the the members page
function loginUser(email, password, ) {
  $.post("/api/login", {
    email: email,
    password: password
  })
    .then(function () {
      window.location.replace("/members");
      // If there's an error, log the error
    })
    .catch(function (err) {
      console.log(err);
    });
}



// console.log(loginCredentials);


$("#submit-new-user").on("click", function (event) {

  event.preventDefault();

  var newUser = {
    newEmail: $("#inputEmailNew").val().trim(),
    newPassword: $("#inputPasswordNew").val().trim(),
    firstName: $("#inputFirstName").val().trim(),
    lastName: $("#inputLastName").val().trim(),
    address: $("#inputAddress").val().trim(),
    addressTwo: $("#inputAddress2").val().trim(),
    city: $("#inputCity").val().trim(),
    state: $("#inputState").val().trim(),
    zipCode: $("#inputZip").val().trim()
  };

  console.log(newUser.newEmail)

  if (!newUser.newEmail || !newUser.newPassword || !newUser.firstName || !newUser.lastName || !newUser.address || !newUser.addressTwo || !newUser.city || !newUser.state || !newUser.zipCode) {
    return;
  }

  console.log('logging out new user;', newUser);

  // If we have an email and password, run the signUpUser function
  signUpUser(newUser.newEmail, newUser.newPassword, newUser.firstName, newUser.lastName, newUser.address, newUser.addressTwo, newUser.city, newUser.state, newUser.zipCode);
  // emailInput.val("");
  // passwordInput.val("");

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password, firstName, lastName, address, addressTwo, city, state, zipCode) {
    $.post("/api/signup", {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      address: address,
      addressTwo: addressTwo,
      city: city,
      state: state,
      zipCode: zipCode
    })
      .done(function (data) {
        // window.location.replace("/members");
        console.log(data);
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .fail(function (err) {
        console.log(err);
      });
  }
  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }



  $("#add-success").show();

  $("#inputEmailNew").val("");
  $("#inputPasswordNew").val("");
  $("#inputFirstName").val("");
  $("#inputLastName").val("");
  $("#inputAddress").val("");
  $("#inputAddress2").val("");
  $("#inputCity").val("");
  $("#inputState").val("");
  $("#inputZip").val("");

  console.log(newUser);


});

