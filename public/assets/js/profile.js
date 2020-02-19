$(document).ready(function() {
    var id = JSON.parse(localStorage.getItem("id"));
    $.get("/api/total/" + id, function(data) {
        console.log(data);
        $("#profile-name").html("Name: " + data[0].firstName + " " + data[0].lastName);
        $("#profile-email").html("Email: " + data[0].email);
        $("#profile-street-address").html("Address: " + data[0].address);
        $("#profile-city").html("City: " + data[0].city);
        $("#profile-state").html("State: " + data[0].state + " Zipcode: " + data[0].zipCode);

    })

    $("#update-user").on("click", function(event) {
        event.preventDefault();
        var updateUser = {
            id: id,
            email: $("#inputEmailNew").val().trim(),
            password: $("#inputPasswordNew").val().trim(),
            firstName: $("#inputFirstName").val().trim(),
            lastName: $("#inputLastName").val().trim(),
            address: $("#inputAddress").val().trim(),
            addressTwo: $("#inputAddress2").val().trim(),
            city: $("#inputCity").val().trim(),
            state: $("#inputState").val().trim(),
            zipCode: $("#inputZip").val().trim()
        };
        console.log(updateUser);
        $.ajax({
            method: "PUT",
            url: "/api/update",
            data: updateUser
        }).then(function(data) {
            console.log(data);
            location.reload();

        });

    });
});