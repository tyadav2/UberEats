module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'city', { type: Sequelize.STRING, allowNull: true });
    await queryInterface.addColumn('Users', 'state', { type: Sequelize.STRING, allowNull: true });
    await queryInterface.addColumn('Users', 'country', { type: Sequelize.STRING, allowNull: true });
    await queryInterface.addColumn('Users', 'phoneNumber', { type: Sequelize.STRING, allowNull: true });
    await queryInterface.addColumn('Users', 'dob', { type: Sequelize.DATEONLY, allowNull: true });
    await queryInterface.addColumn('Users', 'profilePic', { type: Sequelize.STRING, allowNull: true });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'city');
    await queryInterface.removeColumn('Users', 'state');
    await queryInterface.removeColumn('Users', 'country');
    await queryInterface.removeColumn('Users', 'phoneNumber');
    await queryInterface.removeColumn('Users', 'dob');
    await queryInterface.removeColumn('Users', 'profilePic');
  }
};
