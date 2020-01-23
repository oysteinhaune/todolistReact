require('dotenv').config()
const express = require("express")
const router = express.Router();
const { Sequelize, Model, DataTypes } = require("sequelize");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

const Item = sequelize.define('item', {
  // Model attributes are defined here
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  // Other model options go here
});

const getDefaultItems = () => {
  const makeFood = new Item({
    name: "Make food"
  })
  const eatFood = new Item({
    name: "Eat food"
  })
  const dishes = new Item({
    name: "Do dishes"
  })

  const items = [makeFood, eatFood, dishes]
  return items
}

router.get("/", function(req, res) {
  const day = date.getDate();
  // Getting the items from the database
  // find multiple entries
  sequelize
  .authenticate()
  .then(() => {
    Item.findAll().then(items => {
      // items will be an array of all Project instances
      if(items.length === 0) {
        insertDefaultObjects(res)
      } else {
        res.send({
          listTitle: "Personal",
          newListItems: items,
          date: day
        });
      }
    })
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
});

module.exports = router
