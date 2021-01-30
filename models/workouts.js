module.exports = function(sequelize, DataTypes) {
    let Workout = sequelize.define("Workout", {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
              isEmail: true
            }
          },
        workout_type: {
              type: DataTypes.STRING,
              allowNull: false
          },
        sets: {
              type: DataTypes.INTEGER,
              allowNull:true
          },
        reps: {
            type: DataTypes.INTEGER,
            allowNull:true
        },
        distance: {
            type: DataTypes.INTEGER,
            allowNull:true
        },
        date: {
            type: DataTypes.DATEONLY ,
            allowNull: false
        },
        weight_lifted: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        exercise_name: {
            type: DataTypes.STRING,
            allowNull:false
        },
        time_workout: {
            type: DataTypes.INTEGER,
            allowNull:true
        },
        // createdAt: {
        //     type: DataTypes.DATE,
        //     allowNull: false,
        //     defaultValue: DataTypes.NOW
        //   }
    });

    Workout.associate = function(models) {
        Workout.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          }
        });
      };
    return Workout;
  };