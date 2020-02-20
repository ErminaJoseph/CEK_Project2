$(document).ready(function() {
    var total = 0
    var totalDiv = $("<div>");
    var recipeArray = [];

    $("#form-results").hide();
    $("#user_search").on("click", function(event) {
        event.preventDefault();

        $("#form-results").show();

        var main_Ingredient = $("#main_ingredient").val().trim();
        var exceptions = $("#exceptions").val().trim().split(", ")
        var dietType = $("#diet_type").val();
        var health1 = $("#health_type1").val();
        var health2 = $("#health_type2").val();
        var health3 = $("#health_type3").val();
        var health4 = $("#health_type4").val();
        var health5 = $("#health_type5").val();
        var health6 = $("#health_type6").val();
        var query = "https://cors-anywhere.herokuapp.com/https://api.edamam.com/search?q=" + main_Ingredient + "&app_id=cae2ccda&app_key=d907c995bb581b76c6e4492ff1c9bb4e&to=5";
        if (dietType !== null) {
            query += "&diet=" + dietType.trim();
        }
        if ($("#health_type1").prop('checked')) {
            query += "&health=" + health1;
        }
        if ($("#health_type2").prop('checked')) {
            query += "&health=" + health2;
        }
        if ($("#health_type3").prop('checked')) {
            query += "&health=" + health3;
        }
        if ($("#health_type4").prop('checked')) {
            query += "&health=" + health4;
        }
        if ($("#health_type5").prop('checked')) {
            query += "&health=" + health5;
        }
        if ($("#health_type6").prop('checked')) {
            query += "&health=" + health6;
        }
        if (exceptions.length > 1) {
            for (var i = 0; i < exceptions.length; i++) {
                query += "&excluded=" + exceptions[i];
            }
        }
        $.get(query).
        then(function(response) {

            $(".storage").empty();
            var button = $("<button>");
            var buttonDiv = $("<div>");
            var totalButton = $("<button>");
            totalButton.attr({
                id: "totalButton",
                "data-toggle": "modal",
                href: "#sale",
                role: "button"
            });
            totalButton.addClass("btn");
            totalButton.text("Purchase These Recipes");
            totalDiv.addClass("totalDiv");
            buttonDiv.addClass("buttonDiv");
            button.attr("id", "reset");
            button.addClass("btn");
            button.text("Search Again");
            buttonDiv.append(button, totalButton);
            for (var i = 0; i < response.hits.length; i++) {
                var recipeObject = {};
                recipeObject.name = response.hits[i].recipe.label
                recipeObject.recipe = response.hits[i].recipe.url
                recipeArray.push(recipeObject);
                var healthList = $("<ol>");
                var ingredientList = $("<ol>");
                var recipe = $("<div>");
                var title = $("<h3>");
                var image = $("<img>");
                var url = $("<a>");
                var miniDiv = $("<div>");
                var listDiv = $("<div>");
                var cost = $("<p>");
                var removeButton = $("<button>");
                removeButton.addClass("remove");
                removeButton.text("Remove This Recipe");
                if (response.hits[i].recipe.ingredientLines.length <= 5) {
                    total += 20;
                    cost.text("Cost of this recipe 20 dollars");
                    recipe.attr("cost", 20);
                    miniDiv.append(cost);
                }
                if (response.hits[i].recipe.ingredientLines.length > 5 && response.hits[i].recipe.ingredientLines.length < 10) {
                    total += 40;
                    cost.text("Cost of this recipe 40 dollars");
                    recipe.attr("cost", 40);
                    miniDiv.append(cost);
                }
                if (response.hits[i].recipe.ingredientLines.length >= 10) {
                    total += 60;
                    cost.text("Cost of this recipe 60 dollars");
                    recipe.attr("cost", 60);
                    miniDiv.append(cost);
                }
                listDiv.attr("id", "listDiv");
                miniDiv.attr("id", "miniDiv");
                healthList.html("<b> Health Benefits: </b>");
                title.text(response.hits[i].recipe.label);
                url.html("Link to the Recipe <br> <br>");
                url.attr({
                    href: response.hits[i].recipe.url,
                    target: "_blank"
                });
                ingredientList.html("<b> The Ingredients: </b>");
                miniDiv.append(url);
                listDiv.append(healthList, ingredientList);
                recipe.addClass("recipe");
                recipe.attr("id", i);
                image.attr("src", response.hits[i].recipe.image);
                recipe.prepend(title, image, miniDiv, listDiv, removeButton);
                if (response.hits[i].recipe.dietLabels[i] !== undefined) {
                    for (var k = 0; k < response.hits[i].recipe.dietLabels.length; k++) {
                        var diet = $("<p>");
                        diet.html("<b> Diet Type: </b>" + response.hits[i].recipe.dietLabels[k]);
                        miniDiv.prepend("<br>", diet);
                    }
                }
                for (var j = 0; j < response.hits[i].recipe.healthLabels.length; j++) {
                    var health = $("<li>");
                    health.text(response.hits[i].recipe.healthLabels[j]);
                    healthList.append(health);
                }
                for (var n = 0; n < response.hits[i].recipe.ingredientLines.length; n++) {
                    var count = n + 1;
                    var ingredient = $("<li>");
                    ingredient.text(count + ": " + response.hits[i].recipe.ingredientLines[n]);
                    ingredientList.append(ingredient);
                }
                $(".storage").append(recipe);
            }
            totalDiv.text("Your total is " + total + " dollars");
            $(".storage").append(totalDiv, buttonDiv);
        })
    });
    $(".storage").on("click", "#reset", function(event) {
        event.preventDefault();
        location.reload();
        $(this).remove();
    });
    $(".storage").on("click", "#totalButton", function(add_to) {
        add_to.preventDefault();
        var id = JSON.parse(localStorage.getItem("id"));
        var purchaseDiv = $("<div>");
        $.get("/api/total/" + id, function(data) {
            // console.log(data);
            // console.log(data[0].firstName);
            // console.log(data[0].lastName);
            // console.log(data[0].email);
            purchaseDiv.text("Thanks " + data[0].firstName + " " + data[0].lastName + " for your purchase your total is " + total + " dollars. We will email you a confermation number at " + data[0].email);
            $("#data").append(purchaseDiv);
        })


    });
    $(".storage").on("click", ".recipe", ".remove", function(event) {
        var cost = $(this).attr("cost");
        recipeArray.splice(this.id, 1);
        total -= cost;
        totalDiv.html("Your total is " + total + " dollars");
        event.preventDefault();
        $(this).remove();
    });
    $(".modal").on("hidden.bs.modal", function() {
        $(".modal-content").empty();
    });
});