$(document).ready(function() {
    var total = 0
    var totalDiv = $("<div>");


    // var stuff = {
    //     title: "Fresh Ham Roasted With Rye Bread and Dried Fruit Stuffing",
    //     prep: "1. Have your butcher bone and butterfly the ham and score the fat in a diamond pattern. ...",
    //     yield: "About 15 servings",
    //     ingr: [
    //         "1 fresh ham, about 18 pounds, prepared by your butcher (See Step 1)",
    //         "7 cloves garlic, minced",
    //         "1 tablespoon caraway seeds, crushed",
    //         "4 teaspoons salt",
    //         "Freshly ground pepper to taste",
    //         "1 teaspoon olive oil",
    //         "1 medium onion, peeled and chopped",
    //         "3 cups sourdough rye bread, cut into 1/2-inch cubes",
    //         "1 1/4 cups coarsely chopped pitted prunes",
    //         "1 1/4 cups coarsely chopped dried apricots",
    //         "1 large tart apple, peeled, cored and cut into 1/2-inch cubes",
    //         "2 teaspoons chopped fresh rosemary",
    //         "1 egg, lightly beaten",
    //         "1 cup chicken broth, homemade or low-sodium canned"
    //     ]
    // }

    $("#user_search").on("click", function(event) {
        event.preventDefault();
        var main_Ingredient = $("#main_ingredient").val().trim();
        var exceptions = $("#exceptions").val().trim().split(", ")
        var dietType = $("#diet_type").val();
        var health1 = $("#health_type1").val();
        var health2 = $("#health_type2").val();
        var health3 = $("#health_type3").val();
        var health4 = $("#health_type4").val();
        var health5 = $("#health_type5").val();
        var health6 = $("#health_type6").val();
        var query = "https://api.edamam.com/search?q=" + main_Ingredient + "&app_id=cae2ccda&app_key=d907c995bb581b76c6e4492ff1c9bb4e&to=5";
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
            console.log(response);
            var button = $("<button>");
            var buttonDiv = $("<div>");
            var totalButton = $("<button>");
            totalButton.attr({
                id: "totalButton",
                "data-toggle": "modal",
                "data-target": "#purchase"
            });
            totalButton.addClass("btn btn-primary my-1");
            totalButton.text("Purchase These Recipes");
            totalDiv.addClass("totalDiv");
            buttonDiv.addClass("buttonDiv");
            button.attr("id", "reset");
            button.addClass("btn btn-primary");
            button.text("Search Again");
            buttonDiv.append(button, totalButton);


            for (var i = 0; i < response.hits.length; i++) {
                var healthList = $("<ol>");
                var ingredientList = $("<ol>");
                var recipe = $("<div>");
                var title = $("<h4>");
                var image = $("<img>");
                var url = $("<a>");
                var miniDiv = $("<div>");
                var listDiv = $("<div>");
                var cost = $("<p>");
                var removeButton = $("<button>");

                removeButton.attr("id", i);
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

                healthList.text("Health Benefits:");
                title.text(response.hits[i].recipe.label);
                url.text("Link to the Recipe");
                url.attr({
                    href: response.hits[i].recipe.url,
                    target: "_blank"
                });
                ingredientList.text("The Ingredients");
                miniDiv.append(url);
                listDiv.append(healthList, ingredientList);
                recipe.addClass("recipe");
                recipe.attr("id", "div" + i);
                image.attr("src", response.hits[i].recipe.image);
                recipe.prepend(title, image, miniDiv, listDiv, removeButton);
                if (response.hits[i].recipe.dietLabels[i] !== undefined) {

                    for (var k = 0; k < response.hits[i].recipe.dietLabels.length; k++) {

                        var diet = $("<p>");
                        diet.text("Diet type: " + response.hits[i].recipe.dietLabels[k]);
                        miniDiv.prepend(diet);
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
            console.log(total)
            totalDiv.text("Your total is " + total + " dollars");
            $(".storage").append(totalDiv, buttonDiv);


        })
    });
    $(".storage").on("click", "#reset", function(event) {
        event.preventDefault();
        location.reload();
        $(this).remove();
    });
    $("body").on("click", "#totalButton", function(add_to) {
        $($(this).data("#purchase")).modal("show");
        add_to.preventDefault();
        var purchaseDiv = $("<div>");
        purchaseDiv.html("Thanks for your purchase your total is" + total)
        console.log("test");
        $("#data").append(purchaseDiv);

    });
    $(".storage").on("click", ".recipe", ".remove", function(event) {
        var cost = $(this).attr("cost");
        total -= cost;
        totalDiv.text("Your total is " + total + " dollars");
        event.preventDefault();
        $(this).remove();
    });
});