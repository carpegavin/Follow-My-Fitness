module.exports = function(sequelize, DataTypes) {
    var Goals = sequelize.define("Goal", {
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
  
    });
    return Goal;
  };
  