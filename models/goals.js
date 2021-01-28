module.exports = function(sequelize, DataTypes) {
    let Goals = sequelize.define("Goals", {
      goalSetByUser: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [5, 50]
        }
      },
      completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      // createdAt: {
      //   type: DataTypes.DATE,
      //   allowNull: false,
      //   defaultValue: DataTypes.NOW
      // }

    });

    // sets Goals as FK to User table
    Goals.associate = function(models) {
      Goals.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
    };
    return Goals;
  };
  