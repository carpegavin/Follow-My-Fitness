module.exports = function(sequelize, DataTypes) {
    let Goal = sequelize.define("Goal", {
      goalSetByUser: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 50]
        }
      },
      completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      
        validate: {
          isEmail: true
        }
      }

    });

    // sets Goals as FK to User table
    // Goals.associate = function(models) {
    //   Goals.belongsTo(models.User, {
    //     foreignKey: {
    //       allowNull: false
    //     }
    //   });
    // };
    return Goal;
  };
  