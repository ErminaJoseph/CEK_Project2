$(document).ready(function() {
    var id = JSON.parse(localStorage.getItem("id"));
    $.get("/api/recipes/" + id, function(data) {
        console.log(data[0].Recipes.length);
        var purchase = $("<div>");
        var recipes = $("<ul>");
        recipes.text("Your Purchases");
        purchase.addClass("purchase");

        $("#profile-name").html("Name: " + data[0].firstName + " " + data[0].lastName);
        $("#profile-email").html("Email: " + data[0].email);
        $("#profile-street-address").html("Address: " + data[0].address);
        $("#profile-city").html("City: " + data[0].city);
        $("#profile-state").html("State: " + data[0].state + " Zipcode: " + data[0].zipCode);
        purchase.append(recipes);
        for (var i = 0; i < data[0].Recipes.length; i++) {
            console.log(data[0].Recipes[i]);
            var recipe = $("<li>");
            var url = $("<a>");
            recipe.text("Recipe name: " + data[0].Recipes[i].name);
            url.text("Link to the Recipe");
            url.attr({
                href: data[0].Recipes[i].url,
                target: "_blank"
            });
            recipes.append(recipe, url);

        }
        $("#userInfo").append(purchase);

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

        $.ajax({
            method: "PUT",
            url: "/api/update",
            data: updateUser
        }).done(function(data) {
            location.reload();
            purchase.empty();
        }).fail(function(error) {
            console.error(error);
        });

    });
});