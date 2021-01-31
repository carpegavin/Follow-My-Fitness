module.exports = function(sequelize, DataTypes) {
    let Workout = sequelize.define("Workout", {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              isEmail: true
            }
          },
        workout_type: {
              type: DataTypes.STRING,
              allowNull: false
          },
        sets: {
              type: DataTypes.STRING,
              allowNull:true
          },
        reps: {
            type: DataTypes.STRING,
            allowNull:true
        },
        distance: {
            type: DataTypes.STRING,
            allowNull:true
        },
        weight_lifted: {
            type: DataTypes.STRING,
            allowNull: true
        },
        exercise_name: {
            type: DataTypes.STRING,
            allowNull:false
        },
        time_workout: {
            type: DataTypes.STRING,
            allowNull:true
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
          }
    });
    return Workout;
  };