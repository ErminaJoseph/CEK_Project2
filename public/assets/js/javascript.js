$(document).ready(function() {



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
            // var exceptionsArray=
        var dietType = $("#diet_type").val();
        var health1 = $("#health_type1").val();
        var health2 = $("#health_type2").val();
        var health3 = $("#health_type3").val();
        var health4 = $("#health_type4").val();
        var health5 = $("#health_type5").val();
        var health6 = $("#health_type6").val();
        var query = "https://api.edamam.com/search?q=" + main_Ingredient + "&app_id=cae2ccda&app_key=d907c995bb581b76c6e4492ff1c9bb4e&to=10";
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
        if (exceptions.length > 0) {
            for (var i = 0; i < exceptions.length; i++) {
                query += "&excluded=" + exceptions[i];
            }
        }

        console.log(query);



        $.get(query).
        then(function(response) {
            console.log(response);
        })
    });
});