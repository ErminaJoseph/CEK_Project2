// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
var bcrypt = require("bcryptjs");
module.exports = function(app) {

    // Using the passport.authenticate middleware with our local strategy.
    // If the user has valid login credentials, send them to the members page.
    // Otherwise the user will be sent an error
    app.post("/api/login", passport.authenticate("local"), function(req, res) {
        res.json(req.user);
    });

    app.post("/api/signup", function(req, res) {
        // console.log('logging out req body:', req.body);
        db.User.create({
                email: req.body.email,
                password: req.body.password,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                address: req.body.address,
                addressTwo: req.body.addressTwo,
                city: req.body.city,
                state: req.body.state,
                zipCode: req.body.zipCode
            })
            .then(function(response) {

                // res.end();
                return res.json(response);
            })
            .catch(function(err) {
                console.log('error:', err);
                return res.status(401).json(err);
            });
    });
    // Route for logging user out

    // Route for getting some data about our user to be used client side
    // app.get("/api/user_data", function(req, res) {
    //     if (!req.user) {
    //         // The user is not logged in, send back an empty object
    //         res.json({});
    //     } else {
    //         // Otherwise send back the user's email and id
    //         // Sending back a password, even a hashed password, isn't a good idea
    //         res.json({
    //             email: req.user.email,
    //             id: req.user.id
    //         });
    //     }


    // });
    app.get("/api/total/:id", function(req, res) {
        // console.log(req.params.id);
        db.User.findAll({ where: { id: req.params.id } }).then(function(response) {

            return res.json(response);

        })
    });



    app.put("/api/update", function(req, res) {
        console.log('logging out body:', req.body)

        if (req.body.firstName.length > 0) {
            db.User.update({
                firstName: req.body.firstName
            }, {
                where: { id: req.body.id }
            }).then(function(response) {
                console.log("first name updated");
                return res.json(response);
            })
        }
        if (req.body.lastName.length > 0) {
            db.User.update({
                lastName: req.body.lastName
            }, {
                where: { id: req.body.id }
            }).then(function(response) {
                console.log("last name updated");
                return res.json(response);
            })
        }
        if (req.body.email.length > 0) {
            db.User.update({
                email: req.body.email
            }, {
                where: { id: req.body.id }
            }).then(function(response) {
                console.log("email updated");
                return res.json(response);
            })
        }
        if (req.body.password.length > 0) {
            var password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10), null);
            db.User.update({
                password: password
            }, {
                where: { id: req.body.id }
            }).then(function(response) {
                console.log("password updated");
                return res.json(response);
            })
        }
        if (req.body.address.length > 0) {
            db.User.update({
                address: req.body.address
            }, {
                where: { id: req.body.id }
            }).then(function(response) {
                console.log("address updated");
                return res.json(response);
            })
        }
        if (req.body.city.length > 0) {
            db.User.update({
                city: req.body.city
            }, {
                where: { id: req.body.id }
            }).then(function(response) {
                console.log("city updated");
                return res.json(response);
            })
        }
        if (req.body.state.length > 0) {
            db.User.update({
                state: req.body.state
            }, {
                where: { id: req.body.id }
            }).then(function(response) {
                console.log("state updated");
                return res.json(response);
            })
        }
        if (req.body.zipCode.length > 0) {
            db.User.update({
                zipCode: req.body.zipCode
            }, {
                where: { id: req.body.id }
            }).then(function(response) {
                console.log("zip code updated");
                return res.json(response);
            })
        }

    });

    app.post("/api/recipe", function(req, res) {

        db.Recipe.create(req.body).then(function(recipe) {
            res.json(recipe);
        });
    });

    app.get("/api/recipes/:id", function(req, res) {
        // Here we add an "include" property to our options in our findAll query
        // We set the value to an array of the models we want to include in a left outer join
        // In this case, just db.Post
        var id = req.params.id;
        db.User.findAll({
            where: { id: id },
            include: [db.Recipe]
        }).then(function(response) {
            res.json(response);
        });
    });
    // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
    // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
    // otherwise send back an error
};