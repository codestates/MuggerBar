'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class recipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.recipe.belongsTo(models.user, {foreignKey: "user_id"})
      models.recipe.hasMany(models.comment, {foreignKey: "recipe_id"})
      models.recipe.hasMany(models.like, {foreignKey: "recipe_id"})
    }
  };
  recipe.init({
    user_id: DataTypes.INTEGER,
    recipe_title: DataTypes.STRING,
    recipe_subtitle: DataTypes.STRING,
    recipe_photo: DataTypes.BLOB,
    recipe_content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'recipe',
  });
  return recipe;
};