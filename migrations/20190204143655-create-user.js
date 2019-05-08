module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: Sequelize.STRING,
      unique:true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: true
    },
    role: {
      type: Sequelize.STRING,
    },
    createdAt: { 
      type: Sequelize.DATE
    },
    updatedAt: { 
      type: Sequelize.DATE
    },
    name: { 
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.STRING
    },
    contactNumber: {
      type: Sequelize.STRING
    }
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Users'),
};
