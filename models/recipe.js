module.exports = function(sequelize, DataTypes) {
    var Recipe = sequelize.define("Recipe", {
        // Giving the Author model a name of type STRING
        name: {
            type: DataTypes.STRING
        },
        url: {
            type: DataTypes.STRING
        }
    });
    Recipe.associate = function(models) {
        // We're saying that a Post should belong to an Author
        // A Post can't be created without an Author due to the foreign key constraint
        Recipe.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Recipe;
};