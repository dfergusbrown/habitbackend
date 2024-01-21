const { Sequelize } = require("sequelize");
const getUserModel = require("./getUserModel");

const sequelize = new Sequelize("postgres://localhost:5432/habittrackerDB", {
  username: "dfergusbrown",
  password: "bluejuic66",
});

const models = {
  User: getUserModel(sequelize, Sequelize),
};

Object.keys(models).forEach((key) => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

module.exports = {
  sequelize,
  models,
};
