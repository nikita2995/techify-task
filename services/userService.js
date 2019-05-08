
/* ********************************* Import Node Modules ********************************* */
const Sequelize = require('sequelize');

/* ********************************* Import Local Modules ********************************* */
const {
  User, Zone, RPP, REC, Seller, Transaction, Buyer, db,
} = require('../dbconnection');
const { encryption } = require('../helpers');

/* ********************************* Variable Listing ********************************* */
const checkPassword = async (data) => {
  const password = data.oldPassword || data.password;
  const result = await User.findOne({
    attributes: ['userId', 'password'],
    where: {
      $or: [
        {
          email:
          {
            $eq: data.email,
          },
        },
        {
          userId:
          {
            $eq: data.id,
          },
        },
      ],
    },
  });
  if (result) {
    const validPassword = encryption.comparePassword(password, result);
    return validPassword;
  }
  throw new Error('User does not exist');
};

module.exports = {

  checkRole: async (id) => {
    const result = await User.findOne({ attributes: ['userId', 'role'], where: { userId: id } });
    return result;
  },

  login: async (data) => {
    const password = await checkPassword(data);
    if (password) {
      const result = await User.findOne({ where: { email: data.email } });
      return result;
    } else {
      throw new Error('Invalid password');
    }
  },

  getUserEmail: async (userId) => {
    const result = await User.findOne({ where: { userId } });
    return result;
  },

  getUserDetails: async (userId) => {
    const details = await User.findOne({ where: { userId } });
    return details;
  },

  updateProfile: async (id, data) => {
    const result = await User.update(data,
      { where: { userId: id } });
    return result;
  },

  getUsers: async () => {
    const details = await User.findAll({
      attributes: ['userId', 'email'],
      where: { role: "editor" }
    });
    return details;
  }
};
