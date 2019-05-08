

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        userId: 1,
        email: 'admin@techify.com',
        password: '$2a$10$lc7Tu7KrCcE18HI1xFPHu./X40J41GrWq/nptPa6QhnQIMjfrYQue',
        role: 'admin',
        createdAt : new Date(),
        updatedAt: new Date(),
        name: 'Techify Admin'
      },
      {
        userId: 2,
        email: 'user1@techify.com',
        password: '$2a$10$lc7Tu7KrCcE18HI1xFPHu./X40J41GrWq/nptPa6QhnQIMjfrYQue',
        role: 'editor',
        createdAt : new Date(),
        updatedAt: new Date(),
        name: 'Techify User1'
      },
      {
        userId: 3,
        email: 'user2@techify.com',
        password: '$2a$10$lc7Tu7KrCcE18HI1xFPHu./X40J41GrWq/nptPa6QhnQIMjfrYQue',
        role: 'editor',
        createdAt : new Date(),
        updatedAt: new Date(),
        name: 'Techify User2'
      },
      {
        userId: 4,
        email: 'user3@techify.com',
        password: '$2a$10$lc7Tu7KrCcE18HI1xFPHu./X40J41GrWq/nptPa6QhnQIMjfrYQue',
        role: 'editor',
        createdAt : new Date(),
        updatedAt: new Date(),
        name: 'Techify User3'
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
