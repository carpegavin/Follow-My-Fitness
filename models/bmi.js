module.exports = function(sequelize, DataTypes) {
    let BMI = sequelize.define("Bmi", {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
              isEmail: true
            }
          },
        bmi: {
            type: DataTypes.DECIMAL,
            allowNull:false,
        },
        height: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        weight: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW
        }
    });
    return BMI;
  };