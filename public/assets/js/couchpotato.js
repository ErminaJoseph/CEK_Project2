var username;
var password;
var newUsername;
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
        email: $("#inputEmail").val().trim(),
        password: $("#inputPassword").val().trim()
    };

    console.log(loginCredentials);
});

$("#submit-new-user").on("click", function(event) {
    
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

    console.log(newUser);

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
});

$(".navbar-toggler").on("click", function (e) {
    
});
