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
    // var url = "https://cors-anywhere.herokuapp.com/https://api.edamam.com/api/nutrition-details?app_id=46695af9&app_key=6ceecfa6600afaf9f82a26f5d7527c9a";
    //'https://cors-anywhere.herokuapp.com/https://chompthis.com/api/v2/ingredient/search.php?api_key=16BcfkRpvTCxc1JzD&find=eggs'
    $("#user_search").on("click", function(event) {
        event.preventDefault();
        var main_Ingredient = $("#main_ingredient").val().trim();
        var dietType = $("#diet_type").val();
        var health = $("#health_type").val();
        var query = "https://api.edamam.com/search?q=" + main_Ingredient + "&app_id=cae2ccda&app_key=d907c995bb581b76c6e4492ff1c9bb4e&to=10";
        if (dietType !== null) {
            query += "&diet=" + dietType.trim();
        }
        if (health !== null) {
            query += "&health=" + health;
        }

        // console.log(main_Ingredient);
        // console.log(dietType);
        // console.log(query + "&cuisinetype=latino");


        $.get(query).
        then(function(response) {
            console.log(response);
        })
    });
});