require('dotenv').config()
const express = require("express")
const router = express.Router();
const { Sequelize, Model, DataTypes } = require("sequelize");

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

const User = sequelize.define('user', {
  // Model attributes are defined here
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING
    // allowNull defaults to true
  }
}, {
  // Other model options go here
});

const jane = User.build({ firstName: "Jane", lastName: "Johnson" });
jane.save();
console.log('Jane was saved to the database!');

// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true

router.get("/", (req, res) => {
  try {
  sequelize.authenticate();
  res.send('Connection has been established successfully.');
} catch (error) {
  res.send('Unable to connect to the database:', error);
}
})




module.exports = router
