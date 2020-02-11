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
        username: $("#inputUsername").val().trim(),
        password: $("#inputPassword").val().trim()
    };

    console.log(loginCredentials);
});

$("#submit-new-user").on("click", function(event) {
    
    event.preventDefault();

    var newUser = {
        newUsername: $("#inputUsernameNew").val().trim(),
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

    $("#inputUsernameNew").empty();
    $("#inputPasswordNew").empty();
    $("#inputFirstName").empty();
    $("#inputLastName").empty();
    $("#inputAddress").empty();
    $("#inputAddress2").empty();
    $("#inputCity").empty();
    $("#inputState").val("");
    $("#inputZip").empty();
});
