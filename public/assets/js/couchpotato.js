$(document).ready(function() {

    var id = JSON.parse(localStorage.getItem("id"));

    $.get("/api/total/" + id, function(data) {
        console.log(data);
        $("#welcome").html("Welcome " + data[0].firstName + "!");
    });
    $("#logout").on("click", function(event) {
        event.preventDefault();

        localStorage.clear();
        $(location).attr('href', '/index.html')
    })


    $("#add-success").hide();
    $("#login-submit").on("click", function(event) {
        event.preventDefault();
        var loginCredentials = {
            email: $("#inputEmail").val().trim(),
            password: $("#inputPassword").val().trim()
        };
        if (!loginCredentials.email || !loginCredentials.password) {
            return;
        } else {

            $.post("/api/login/", loginCredentials, function(data) {
                console.log(data.id);
                localStorage.setItem("id", data.id);
            })
        }

    });
    // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
    // function loginUser(email, password, ) {
    //     $.post("/api/login", {
    //             email: email,
    //             password: password
    //         })
    //         .done(function() {
    //             window.location.replace("/members");
    //             // If there's an error, log the error
    //         })
    //         .fail(function(err) {
    //             console.log(err);
    //         });
    // }
    // console.log(loginCredentials);
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
        // console.log(newUser)
        // if (!newUser.newEmail || !newUser.newPassword || !newUser.firstName || !newUser.lastName || !newUser.address || !newUser.addressTwo || !newUser.city || !newUser.state || !newUser.zipCode) {
        //     return;
        // }
        // console.log('logging out new user;', newUser);
        // If we have an email and password, run the signUpUser function
        signUpUser(newUser.newEmail, newUser.newPassword, newUser.firstName, newUser.lastName, newUser.address, newUser.addressTwo, newUser.city, newUser.state, newUser.zipCode);
        // emailInput.val("");
        // passwordInput.val("");
        // Does a post to the signup route. If successful, we are redirected to the members page
        // Otherwise we log any errors
        function signUpUser(email, password, firstName, lastName, address, addressTwo, city, state, zipCode) {
            // console.log("test");
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
                .done(function(data) {
                    localStorage.clear();


                    localStorage.setItem("id", data.id);
                    $(location).attr('href', '/form.html')

                })
                .fail(function(err) {
                    console.log(err);
                });
        }

        function handleLoginErr(err) {
            $("#alert .msg").text(err.responseJSON);
            $("#alert").fadeIn(500);
        }


        console.log(newUser);



    });
});